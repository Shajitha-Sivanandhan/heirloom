// import { createConfig, http } from 'wagmi';
// import { localhost } from 'wagmi/chains';
// import { metaMask } from 'wagmi/connectors';

// export const config = createConfig({
//   chains: [localhost],
//   connectors: [metaMask()],
//   transports: {
//     [localhost.id]: http('http://127.0.0.1:8545'),
//   },
// });

import { createConfig, http } from 'wagmi'
import { localhost } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [localhost],
  connector: [injected({ target: 'metaMask' })],
  transports: {
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
})
