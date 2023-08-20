import { getDefaultConfig } from 'connectkit'
import { mainnet} from 'wagmi/chains'
import { createConfig, configureChains} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'



// import { WagmiConfig, createClient } from "wagmi";
// import { ConnectKitProvider, getDefaultClient } from 'connectkit';



const walletConnectProjectId = '26e658a73eb174ceb4da83497c278fed'

// export const config = createConfig(
//   getDefaultConfig({
//     autoConnect: true,
//     appName: 'My wagmi + ConnectKit App',
//     walletConnectProjectId,
//   })
// )
const { chains, publicClient} = configureChains([mainnet], [publicProvider()])
 
export const config = createConfig({
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
      },
    }),
  ],
  publicClient,
  
})



// const alchemyId = process.env.ALCHEMY_ID;

// const client = createClient(
//   getDefaultClient({
//     appName: "Your App Name",
//     alchemyId,
//     chains,
//   })
// );


 

