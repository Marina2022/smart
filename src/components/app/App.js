import PageWrapper from "../layout/PageWrapper/PageWrapper";

import './normalize.scss';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum'
import {Web3Modal} from '@web3modal/react'
import {configureChains, createConfig, useAccount, useBalance, WagmiConfig} from 'wagmi'
import {polygonMumbai} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import {PROJECT_ID} from "../../consts";
import {ToastContainer} from "react-toastify";

const chains = [polygonMumbai]
const projectId = PROJECT_ID; //вот это надо будет засунуть в .env файл

const {publicClient} = configureChains(chains, [w3mProvider({projectId})])

const { webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({projectId, version: 1, chains}),
  publicClient,
  webSocketPublicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div className="App">
          <ToastContainer/>
          <PageWrapper/>
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
    </>
  );
}

export default App;


