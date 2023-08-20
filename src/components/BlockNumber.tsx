'use client'

import { useBlockNumber } from 'wagmi'
import ERC20ABI from '../Abi/ABI.json'

export function BlockNumber() {
  const { data } = useBlockNumber({ watch: true })
  return <div>{data?.toString()}</div>
}
