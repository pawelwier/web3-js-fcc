import { ethers, run, network } from "hardhat";
import { ChainIds } from "../const/chainIds";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";
import { VerifyArguments } from "../types/scriptTypes";

const main = async () => {
  const { getContractFactory } = ethers
  const SimpleStorageFactory: SimpleStorage__factory = (await getContractFactory('SimpleStorage')) as SimpleStorage__factory

  console.log('Deploying ...')

  const simpleStorage: SimpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log('Contract deployed to: ', simpleStorage.address)

  if (network.config.chainId === ChainIds.GOERLI && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify({
      address: simpleStorage.address,
      args: []
    })
  }

  const currentValue = await simpleStorage.retrieve()

  console.log('Current value: ', currentValue)

  const response = await simpleStorage.store(12)
  response.wait(1)

  const updatedValue = await simpleStorage.retrieve()

  console.log('Updated value: ', updatedValue)
}

const verify = async ({ address, args }: VerifyArguments) => {
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


// 09:52:16