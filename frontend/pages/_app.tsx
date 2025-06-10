// pages/_app.tsx

import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'

import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import { sepolia } from 'wagmi/chains' // ✅ Make sure this is imported

const { chains, provider } = configureChains(
  [sepolia],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Decentralized Social Media',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
