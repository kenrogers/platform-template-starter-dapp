"use client";

import { ConnectWallet } from "@/components/ConnectWallet";
import { NetworkSelector } from "@/components/NetworkSelector";
import { ContractDemo } from "@/components/ContractDemo";
import { useCurrentAddress } from "@/hooks/useCurrentAddress";

export default function Home() {
  const currentAddress = useCurrentAddress();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Stacks Starter</h1>
            <div className="flex items-center gap-4">
              <NetworkSelector />
              <ConnectWallet />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Your Stacks App
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              This is a minimal starter template with all the essentials for building on Stacks.
              Connect your wallet to interact with the smart contract.
            </p>

            {/* Connection Status */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-2">Connection Status</h3>
              {currentAddress ? (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Connected as:
                  </p>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {currentAddress}
                  </code>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Not connected. Connect your wallet to get started.
                </p>
              )}
            </div>
          </section>

          {/* Contract Interaction Section */}
          {currentAddress && (
            <section>
              <h2 className="text-2xl font-bold mb-6">
                Smart Contract Interaction
              </h2>
              <ContractDemo />
            </section>
          )}

          {/* Getting Started Guide */}
          {!currentAddress && (
            <section className="bg-blue-50 dark:bg-blue-950 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <li>Connect your wallet using the button in the header</li>
                <li>Select your preferred network (Mainnet, Testnet, or Devnet)</li>
                <li>Interact with the smart contract functions</li>
                <li>Build your application on top of this foundation</li>
              </ol>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Built with Stacks, Next.js, and Tailwind CSS</p>
            <p className="mt-2">
              <a
                href="https://docs.stacks.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Stacks Documentation
              </a>
              {" • "}
              <a
                href="https://docs.hiro.so"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Hiro Documentation
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}