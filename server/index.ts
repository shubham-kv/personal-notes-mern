import 'dotenv/config';
import { createApp } from './app';
import { logger } from './logger';

(async function main() {
  const port = process.env.PORT || 5173;
  const app = await createApp();

  app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}/`);
  });
})();
