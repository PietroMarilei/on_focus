// environments/environment.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    environment: {
      production: boolean;
      apiDomain: string;
    };
  }
}
