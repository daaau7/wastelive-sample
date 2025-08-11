/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { wagmiAdapter, projectId } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { somniaTestnet } from '@/lib/networks'
import React, { type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'AppKit Example',
  description: 'AppKit Example',
  url: 'https://wastelive-sample.vercel.app/',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

const appkit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [somniaTestnet],
  metadata,
  features: { analytics: true }
})

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
