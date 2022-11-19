import { ethers, run, network } from "hardhat";
import { SimpleStorage } from "../typechain-types";

async function main() {
  const { getContractFactory } = ethers
  const SimpleStorageFactory = await getContractFactory('SimpleStorage')

  console.log('Deploying ...')

  const simpleStorage: SimpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log('Deployed to: ', simpleStorage.address)

  console.log(network.config)
}

async function verify({ address, args }: { address: string, args: unknown }) {
  console.log('Verifying ...')
  try {
    await run('verify', {
      address,
      constructorArguments: args
    })
  } catch (e) {
    if ((e as Error).message.toLowerCase().includes('already verified')) {
      console.log('already verified')
    } else {
      console.log(e)
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
