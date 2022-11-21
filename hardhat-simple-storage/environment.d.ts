declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOCALHOST_RPC_URL: string
      ETHERSCAN_API_KEY: string
      PRIVATE_KEY: string
      GOERLI_RPC_URL: string
      COINMARKETCAP_KEY: string
    }
  }
}

export { }
