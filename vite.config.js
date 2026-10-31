import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-memories-backend',
      configureServer(server) {
        server.middlewares.use('/api/save-memories', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const memories = JSON.parse(body);
                const rootDir = import.meta.dirname || path.resolve();
                const imagesDir = path.resolve(rootDir, 'public/images');
                if (!fs.existsSync(imagesDir)) {
                  fs.mkdirSync(imagesDir, { recursive: true });
                }

                // Convert any base64 images into physical files in public/images/
                const updated = memories.map((mem, idx) => {
                  if (mem.image && mem.image.startsWith('data:image/')) {
                    const matches = mem.image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
                    if (matches) {
                      const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                      const base64Data = matches[2];
                      const filename = `bubly_mem_${Date.now()}_${idx}.${ext}`;
                      const filepath = path.join(imagesDir, filename);
                      fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
                      return { ...mem, image: `/images/${filename}` };
                    }
                  }
                  return mem;
                });

                // Write permanent memories.json
                const jsonPath = path.resolve(rootDir, 'src/data/memories.json');
                fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, memories: updated }));
              } catch (err) {
                console.error('Error saving memories:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            res.statusCode = 405;
            res.end();
          }
        });
      },
    },
  ],
});
