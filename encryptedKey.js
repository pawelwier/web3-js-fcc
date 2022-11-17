const ethers = require('ethers')
const fs = require('fs')
require('dotenv').config()

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
  const encrypted = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASS,
    process.env.PRIVATE_KEY
  )
  console.log(encrypted)
  fs.writeFileSync('./.encryptedKey.json', encrypted)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
  })