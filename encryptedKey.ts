import { Wallet } from 'ethers'
import * as fs from 'fs-extra'
import 'dotenv/config'

async function main() {
  const wallet: Wallet = new Wallet(process.env.PRIVATE_KEY)
  const encrypted: string = await wallet.encrypt(
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