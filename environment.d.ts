declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRIVATE_KEY: string
      RPC_URL: string
      PRIVATE_KEY_PASS: string
    }
  }
}

export { }
