import 'dotenv/config';
import fs from 'fs/promises';
import express from 'express';

import { createServer, ViteDevServer } from 'vite';
import compression from 'compression';
import sirv from 'sirv';
import morgan from 'morgan';
import { clerkMiddleware, requireAuth } from '@clerk/express'

import { logger } from './logger';
import { notesRouter } from './routes';
import { httpErrorHandler, zodErrorHandler } from './middlewares';
import { apiPrefix } from '@shared/constants';

const isProdEnv = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';
const signInUrl = process.env.CLERK_SIGN_IN_URL;

export async function createApp(): Promise<express.Express> {
  const app = express();
  const morganStream: morgan.StreamOptions = {
    write(str) {
      logger.info(str.trim());
    },
  };

  // Add Vite or respective production middlewares
  let vite: ViteDevServer | undefined;
  app.disable('x-powered-by');
  app.use(clerkMiddleware());
  app.use(express.json());

  if (!isProdEnv) {
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    });
    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));
  }

  app.use(morgan('tiny', { stream: morganStream }));
  app.use(`${apiPrefix}/notes`, notesRouter);

  // Server side auth middlewares for client pages
  app.get('/', requireAuth({ signInUrl }), (_, res) => res.redirect('/n'));
  app.use('/n', requireAuth({ signInUrl }));

  // Serve HTML
  app.use(async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');
      let template: string;

      /** @type {import('../src/entry-server').render} */
      let render;

      if (!isProdEnv) {
        // Always read fresh template in development
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite!.transformIndexHtml(url, template);
        render = (await vite!.ssrLoadModule('/src/entry-server')).render;
      } else {
        // Cached production assets
        template = await fs.readFile('./dist/client/index.html', 'utf-8');
        render = (await import('../dist/server/entry-server' as any)).render;
      }

      const rendered = await render(url);

      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e: any) {
      vite?.ssrFixStacktrace(e as Error);
      logger.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.use(zodErrorHandler);
  app.use(httpErrorHandler);

  return app;
}
