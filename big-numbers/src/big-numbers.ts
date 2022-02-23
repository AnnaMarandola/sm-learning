import { CustomOperation } from './custom-number.types'

export type BigNumber = string

const fromString = (s: string): BigNumber => s

const add = (n1: BigNumber, n2: BigNumber): BigNumber => {
  let sum = ''

  if (n2.length > n1.length) {
    const temp = n2
    n2 = n1
    n1 = temp
  }

  let carryToNextDecimal = 0
  let n1Digit
  let n2Digit
  let tempSum
  let digitSum

  for (let i = 0; i < n1.length; i++) {
    n1Digit = parseInt(n1.charAt(n1.length - 1 - i))
    n2Digit = parseInt(n2.charAt(n2.length - 1 - i))
    n2Digit = n2Digit || 0
    tempSum = (carryToNextDecimal + n1Digit + n2Digit).toString()
    digitSum = tempSum.charAt(tempSum.length - 1)
    carryToNextDecimal = parseInt(tempSum.substring(0, tempSum.length - 1))
    carryToNextDecimal = carryToNextDecimal || 0
    if (i === n1.length - 1) {
      sum = tempSum + sum
    } else {
      sum = digitSum + sum
    }
  }
  return sum
}

const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => {
  const product = Array(n1.length + n2.length).fill(0)

  for (let n1DigitId = n1.length; n1DigitId--;) {
    let carry = 0
    for (let n2DigitId = n2.length; n2DigitId--;) {
      const resultId = 1 + n1DigitId + n2DigitId
      const tempResult =
        product[resultId] +
        carry +
        Number(n1[n1DigitId]) * Number(n2[n2DigitId])
      carry = Math.floor(tempResult / 10)
      product[resultId] = tempResult % 10
    }
    product[n1DigitId] += carry
  }
  return product.join('').replace(/^0*(\d)/, '$1')
}

const toString = (n: BigNumber) => n

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
