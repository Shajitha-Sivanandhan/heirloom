// import '@/styles/globals.css';
// import { WagmiProvider } from 'wagmi';
// import { config } from '../lib/wagmiConfig';

// export default function App({ Component, pageProps }) {
//   return (
//     <WagmiProvider config={config}>
//       <Component {...pageProps} />
//     </WagmiProvider>
//   );
// }


import '@/styles/globals.css'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../lib/wagmiConfig'

// create one query client for the whole app
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <Component {...pageProps} />
      </WagmiProvider>
    </QueryClientProvider>
  )
}
