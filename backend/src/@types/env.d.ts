// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: number
    SECRET_WORD: string
    DATABASE_URL: string
  }
}
