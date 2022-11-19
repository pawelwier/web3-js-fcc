import { HardhatUserConfig } from "hardhat/config"
import '@nomiclabs/hardhat-etherscan'
import 'dotenv/config'
import "@nomicfoundation/hardhat-toolbox"

const { GOERLI_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  solidity: "0.8.17",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
}

export default config
