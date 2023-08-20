import { getDefaultConfig } from 'connectkit'
import { mainnet,goerli} from 'wagmi/chains'
import { createConfig, configureChains} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'






const walletConnectProjectId = '26e658a73eb174ceb4da83497c278fed'


const { chains, publicClient} = configureChains([goerli], [publicProvider()])
 
export const config = createConfig({
  connectors: [
    new MetaMaskConnector({
      chains: [goerli],
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
      },
    }),
  ],
  publicClient,
  
})






 

