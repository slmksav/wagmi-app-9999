import React from "react";
import { GearFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import { useConnect, useAccount, useDisconnect, useBalance } from "wagmi";
import { ConnectKitButton } from "connectkit";
import PulseLoader from "react-spinners/PulseLoader";
import {
  getPrice,
  runSwap,
} from "../swap/swap";
import ERC20ABI from '../../Abi/ABI.json'
const REACT_APP_INFURA_URL_TESTNET = "https://goerli.infura.io/v3/860dd47ce7aa40ed80f3761dcbdab9f0"

const chainId = 5

const web3Provider = new ethers.providers.JsonRpcProvider(REACT_APP_INFURA_URL_TESTNET)



const TradeConfig: React.FC = () => {

  const {address, isConnected } = useAccount()
  console.log(address,"jjjj")
  const [provider, setProvider] = useState<any>(undefined)
  const [signer, setSigner] = useState<undefined>(undefined)
  const [signerAddress, setSignerAddress] = useState<string | null >(null)

  const [slippageAmount, setSlippageAmount] = useState<number>(2)
  const [deadlineMinutes, setDeadlineMinutes] = useState<number>(10)
  const [showModal, setShowModal] = useState<undefined>(undefined)

  // const [inputAmount, setInputAmount] = useState(undefined)
  const [outputAmount, setOutputAmount] = useState<number | undefined>()
  const [transaction, setTransaction] = useState<undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [ratio, setRatio] = useState<undefined>(undefined)
  const [contractbase, setcontractbase] = useState<string | null >(null)
  const [contractto, setcontractto] = useState<string | null >(null)
  const [baseAmount, setbaseAmount] = useState<number | null >(null)
  const [toAmount, settoAmount] = useState<number | null >(null)
  const [basename, setbasename] = useState<string | null >(null)
  const [toName, settoName] = useState<string | null >(null)
  const [inputval, setinputval] = useState<any>()
  const name0 = 'Wrapped Ether'
  const symbol0 = 'WETH'
  const decimals0 = 18
  const address0 = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'

  const name1 = 'Uniswap Token'
  const symbol1 = 'UNI'
  const decimals1 = 18
  const address1 = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

  //@ts-ignore
  const getSigner = async provider => {
    const signer = provider.getSigner();
    setSigner(signer)
  }
  
  const connectWallet = async ()=>{
    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    await getSigner(provider)  
  } 
  
  useEffect(() => {
      

      if(isConnected){
        connectWallet()   
        // set balances 
        setcontractbase(address0)
        setcontractto(address1)

        if(contractto && contractbase){
          getWalletAddressbalance()  

        }
      }

  }, [isConnected])

  useEffect(() => {
    if(inputval){
    getSwapPrice(inputval)
  }

}, [inputval])

console.log(outputAmount, "reee")


  const getWalletAddressbalance = () => {
    new ethers.Contract(address0, ERC20ABI, web3Provider).balanceOf(address).then((res:any) => {
      setbaseAmount( Number(ethers.utils.formatEther(res)) )
    })

    new ethers.Contract(address1, ERC20ABI, web3Provider).balanceOf(address).then((res:any) => {
      settoAmount( Number(ethers.utils.formatEther(res)) )
    })
    
  }

  if (signer !== undefined) {
    getWalletAddressbalance()
  }

  

  const getSwapPrice = (inputAmount:number) => {
    
   

    getPrice(
      inputAmount,
      slippageAmount,
      Math.floor(Date.now()/1000 + (deadlineMinutes * 60)),
      //@ts-ignore
      address
    ).then(data => {
      //@ts-ignore
      setTransaction(data[0])
      //@ts-ignore
      setOutputAmount(data[1])
      console.log(data[1],"lllll")
      //@ts-ignore
      setRatio(data[2])
      
    })
  }

  
 
  
  const swap = () => {
    
    runSwap(transaction,signer)
    
  };
  
  return (
    <div>
      <br />
      <GearFill />

      <br />
      <div>
        <div className="w-full flex bg-blue-900 rounded">
          <div>
            <p>To pay</p>
            <br />
            <input
              placeholder="0"
              className="w-1/2 bg-transparent outline-none "
              onBlur={(e)=> setinputval(e.target.value) }
            />
          </div>

          <div>
            <p>WETH</p>
            <br />
            <p>Bal:{baseAmount?.toFixed(6)}</p>
          </div>
        </div>

        <br />

        <div className="w-full flex bg-blue-900 rounded">
          <div>
            <p>To Recieve</p>
            <br />
            {(!outputAmount && inputval) && <PulseLoader color="#36d7b7" />}
            <input
              
              className="w-1/2 bg-transparent outline-none "
              value={outputAmount}
            />
          </div>

          <div>
            <p>Uni</p>
            <br />
            <p>Bal:{toAmount?.toFixed(5)}</p>
          </div>
        </div>
      </div>
      <br />
      <button className=" w-1/2 bg-blue-900 rounded" onClick={swap}  >Trade</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default TradeConfig;
