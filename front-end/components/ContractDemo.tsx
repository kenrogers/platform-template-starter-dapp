"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  fetchCallReadOnlyFunction, 
  uintCV,
  principalCV,
  cvToJSON
} from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
import { useNetwork } from "@/lib/use-network";
import { useCurrentAddress } from "@/hooks/useCurrentAddress";
import { CONTRACT_NAME, getContractAddress } from "@/constants/contracts";
import { useDevnetWallet } from "./DevnetWalletProvider";

export function ContractDemo() {
  const network = useNetwork();
  const currentAddress = useCurrentAddress();
  const { currentWallet } = useDevnetWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  const contractAddress = network ? getContractAddress(network) : "";

  // Query counter value
  const { data: counterData, refetch: refetchCounter } = useQuery({
    queryKey: ["counter", network, contractAddress],
    queryFn: async () => {
      const result = await fetchCallReadOnlyFunction({
        network,
        contractAddress,
        contractName: CONTRACT_NAME,
        functionName: "get-counter",
        functionArgs: [],
        senderAddress: currentAddress || "",
      });
      return cvToJSON(result).value;
    },
    enabled: !!currentAddress && !!network,
  });

  // Query message value
  const { data: messageData } = useQuery({
    queryKey: ["message", network, contractAddress],
    queryFn: async () => {
      const result = await fetchCallReadOnlyFunction({
        network,
        contractAddress,
        contractName: CONTRACT_NAME,
        functionName: "get-message",
        functionArgs: [],
        senderAddress: currentAddress || "",
      });
      return cvToJSON(result).value;
    },
    enabled: !!currentAddress && !!network,
  });

  // Query user score
  const { data: scoreData, refetch: refetchScore } = useQuery({
    queryKey: ["score", network, contractAddress, currentAddress],
    queryFn: async () => {
      const result = await fetchCallReadOnlyFunction({
        network,
        contractAddress,
        contractName: CONTRACT_NAME,
        functionName: "get-user-score",
        functionArgs: [principalCV(currentAddress || "")],
        senderAddress: currentAddress || "",
      });
      return cvToJSON(result).value;
    },
    enabled: !!currentAddress && !!network,
  });

  if (!network || !currentAddress) {
    return null;
  }

  const handleIncrement = async () => {
    setIsSubmitting(true);
    try {
      if (network === "devnet" && currentWallet) {
        // For devnet, we'll use a simplified approach
        // In a real app, you'd make a direct API call
        console.log("Devnet transaction would be sent here");
        setTimeout(() => {
          refetchCounter();
          setIsSubmitting(false);
        }, 1000);
      } else {
        await openContractCall({
          network,
          contractAddress,
          contractName: CONTRACT_NAME,
          functionName: "increment",
          functionArgs: [],
          onFinish: (data) => {
            setTxId(data.txId);
            setTimeout(() => {
              refetchCounter();
            }, 2000);
            setIsSubmitting(false);
          },
          onCancel: () => {
            setIsSubmitting(false);
          },
        });
      }
    } catch (error) {
      console.error("Error incrementing:", error);
      setIsSubmitting(false);
    }
  };

  const handleDecrement = async () => {
    setIsSubmitting(true);
    try {
      if (network === "devnet" && currentWallet) {
        console.log("Devnet transaction would be sent here");
        setTimeout(() => {
          refetchCounter();
          setIsSubmitting(false);
        }, 1000);
      } else {
        await openContractCall({
          network,
          contractAddress,
          contractName: CONTRACT_NAME,
          functionName: "decrement",
          functionArgs: [],
          onFinish: (data) => {
            setTxId(data.txId);
            setTimeout(() => {
              refetchCounter();
            }, 2000);
            setIsSubmitting(false);
          },
          onCancel: () => {
            setIsSubmitting(false);
          },
        });
      }
    } catch (error) {
      console.error("Error decrementing:", error);
      setIsSubmitting(false);
    }
  };

  const handleAddScore = async () => {
    setIsSubmitting(true);
    try {
      if (network === "devnet" && currentWallet) {
        console.log("Devnet transaction would be sent here");
        setTimeout(() => {
          refetchScore();
          setIsSubmitting(false);
        }, 1000);
      } else {
        await openContractCall({
          network,
          contractAddress,
          contractName: CONTRACT_NAME,
          functionName: "add-to-score",
          functionArgs: [uintCV(10)],
          onFinish: (data) => {
            setTxId(data.txId);
            setTimeout(() => {
              refetchScore();
            }, 2000);
            setIsSubmitting(false);
          },
          onCancel: () => {
            setIsSubmitting(false);
          },
        });
      }
    } catch (error) {
      console.error("Error adding score:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Counter Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Counter</h3>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl font-bold">{counterData?.value || 0}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleIncrement}
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Increment
          </button>
          <button
            onClick={handleDecrement}
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Decrement
          </button>
        </div>
      </div>

      {/* Message Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Message</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Current: &quot;{messageData?.value || "Loading..."}&quot;
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Only the contract owner can update the message
        </p>
      </div>

      {/* Score Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Your Score</h3>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-bold">{scoreData?.value || 0}</span>
          <span className="text-gray-500">points</span>
        </div>
        <button
          onClick={handleAddScore}
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add 10 Points
        </button>
      </div>

      {/* Transaction Status */}
      {txId && (
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Transaction submitted: {txId.slice(0, 8)}...
          </p>
          {network !== "devnet" && (
            <a
              href={`https://explorer.hiro.so/txid/${txId}${network === "testnet" ? "?chain=testnet" : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View in Explorer →
            </a>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Contract Info</h4>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span className="font-medium">Address:</span>{" "}
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {contractAddress}
            </code>
          </p>
          <p>
            <span className="font-medium">Name:</span>{" "}
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {CONTRACT_NAME}
            </code>
          </p>
          <p>
            <span className="font-medium">Network:</span> {network}
          </p>
        </div>
      </div>
    </div>
  );
}