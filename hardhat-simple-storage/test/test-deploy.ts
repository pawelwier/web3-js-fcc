import { ethers } from 'hardhat'
import { assert } from 'chai'
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types'

describe('SimpleStorage', function () {
  let simpleStorageFactory: SimpleStorage__factory, simpleStorage: SimpleStorage
  this.beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it('should show 0 as the initial favourite number', async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = '0'

    assert.equal(currentValue.toString(), expectedValue)
  })

  it('should update favourite number when calling store()', async function () {
    const response = await simpleStorage.store(4)
    await response.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    const expectedValue = '4'

    assert.equal(updatedValue.toString(), expectedValue)
  })

  it('should add new person and map their favourite number to name', async function () {
    const { getPersonsFavouriteNumber } = simpleStorage
    const response = await simpleStorage.addPerson('Kret', 13)
    await response.wait(1)
    const favouriteNumber = await (await getPersonsFavouriteNumber('Kret')).toString()

    assert.equal(favouriteNumber, '13')
  })
})