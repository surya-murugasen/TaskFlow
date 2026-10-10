import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-projects-api',
      configureServer(server) {
        server.middlewares.use('/api/projects', (req, res) => {
          const fs = require('fs');
          const projectsDir = path.resolve(__dirname, '..'); // Parent directory is 'Projects'
          try {
            const items = fs.readdirSync(projectsDir, { withFileTypes: true });
            const projects = items
              .filter((i: any) => i.isDirectory())
              .map((i: any) => {
                const stat = fs.statSync(path.join(projectsDir, i.name));
                return { name: i.name, modified: stat.mtime };
              });
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(projects));
          } catch(e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({error: e.message}));
          }
        });
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MyTasks',
        short_name: 'MyTasks',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: '/pwa-512x512.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
