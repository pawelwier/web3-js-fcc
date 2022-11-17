const ethers = require('ethers')
const fs = require('fs')

async function main() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545')
  const wallet = new ethers.Wallet('8a887d86c157921b3415420f6ff94267201aa6d2b7e4b3332ef9c0137286af5f', provider)
  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8')
  const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf-8')
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)

  console.log('Deploying...')

  const contract = await contractFactory.deploy()

  console.log(contract)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
  })