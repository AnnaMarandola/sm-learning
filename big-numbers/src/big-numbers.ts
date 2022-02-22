import { CustomOperation } from './custom-number.types'

export type BigNumber = string

const fromString = (s: string): BigNumber => s

const add = (n1: BigNumber, n2: BigNumber): BigNumber => {
  const sum = (Number(n1) + Number(n2)).toString()
  return sum
}

const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => {
  const product = Array(n1.length + n2.length).fill(0)

  for (let n1DigitId = n1.length; n1DigitId--;) {
    let carry = 0
    for (let n2DigitId = n2.length; n2DigitId--;) {
      product[1 + n1DigitId + n2DigitId] += carry + Number(n1[n1DigitId]) * Number(n2[n2DigitId])
      carry = Math.floor(product[1 + n1DigitId + n2DigitId] / 10)
      product[1 + n1DigitId + n2DigitId] = product[1 + n1DigitId + n2DigitId] % 10
    }
    product[n1DigitId] += carry
  }
  return product.join('').replace(/^0*(\d)/, '$1')
}

const toString = (n: BigNumber) => n.toString()

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
