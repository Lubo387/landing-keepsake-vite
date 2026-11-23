import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import path from 'path';

export default {
  base: '/landing-keepsake-vite/',
  plugins: [
    vituum({
      imports: {
        filenamePattern: {
          '+.css': [],
          '+.scss': [],
        },
      },
    }),
    pug({ root: './src' }),
    {
      name: 'rename-pug-to-html',
      enforce: 'post',
      generateBundle(_, bundle) {
        for (const file of Object.values(bundle)) {
          if (file.fileName && file.fileName.endsWith('.pug.html')) {
            file.fileName = file.fileName.replace('.pug.html', '.html');
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(import.meta.dirname, 'src/assets'),
    },
  },
};
