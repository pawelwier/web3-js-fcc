import { HardhatUserConfig } from "hardhat/config"
import '@nomiclabs/hardhat-etherscan'
import 'dotenv/config'
import "@nomicfoundation/hardhat-toolbox"
import './tasks/block-number'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import { ChainIds } from "./const/chainIds"
import '@typechain/hardhat'

const {
  GOERLI_RPC_URL, LOCALHOST_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY, COINMARKETCAP_KEY
} = process.env

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL || 'url',
      accounts: [PRIVATE_KEY || 'key'],
      chainId: ChainIds.GOERLI || 'chain-id'
    },
    localhost: {
      url: LOCALHOST_RPC_URL,
      chainId: ChainIds.HARDHAT || 'chain'
    }
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY || 'key'
  },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_KEY || 'key'
  }
}

export default config
