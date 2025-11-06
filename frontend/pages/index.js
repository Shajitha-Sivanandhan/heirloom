import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect, connectors, error, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  // Run only on client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoid SSR mismatch

  // Find MetaMask (injected) connector dynamically
  const metaMaskConnector = connectors.find(
    (c) => c.id === 'injected' || c.name.toLowerCase().includes('metamask')
  )

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">HeirLoom DApp</h1>

      {!isConnected ? (
        <button
          onClick={() => {
            console.log('🪙 Connect button clicked!')
            if (metaMaskConnector) {
              connect({ connector: metaMaskConnector })
            } else {
              alert('MetaMask not found! Please install or enable it.')
            }
          }}
          disabled={isPending}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isPending ? 'Connecting…' : 'Connect MetaMask'}
        </button>
      ) : (
        <div className="space-y-4 text-center">
          <p className="font-semibold">
            Connected Wallet:
            <br />
            <span className="text-indigo-600">{address}</span>
          </p>
          <button
            onClick={() => {
              console.log('🔌 Disconnected!')
              disconnect()
            }}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
          >
            Disconnect
          </button>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-medium">⚠️ {error.message}</p>
      )}
    </main>
  )
}
