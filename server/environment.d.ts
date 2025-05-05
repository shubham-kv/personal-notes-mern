export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGO_URI: string;
      TEST_MONGO_URI: string;

      CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      CLERK_SIGN_IN_URL: string;
    }
  }
}
