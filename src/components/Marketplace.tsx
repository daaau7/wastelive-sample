"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatEther } from "ethers";
import Image from "next/image";
import toast from "react-hot-toast";

const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS_ITEM as `0x${string}`;

const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "_itemId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "mintItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
    name: "itemPrices",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const ITEMS = [
  { id: 0, name: "ASSAULT RIFLE", image: "/items/assault.png" },
  { id: 1, name: "SNIPER RIFLE", image: "/items/sniper.png" },
  { id: 2, name: "SUBMACHINE GUN", image: "/items/smg.png" },
  { id: 3, name: "PISTOL", image: "/items/pistol.png" },
  { id: 4, name: "BOMB", image: "/items/bomb.png" },
];

const SOMNIA_TESTNET_CHAIN_ID = 50312;

function ItemCard({ item }: { item: typeof ITEMS[0] }) {
  const { isConnected, chain } = useAccount();
  const [activeToastId, setActiveToastId] = useState<string | undefined>();
  const [priceInEth, setPriceInEth] = useState<string | undefined>();

  const {
    data: hash,
    writeContractAsync,
    isPending: isSubmitting,
  } = useWriteContract();

  const {
    data: price,
    isLoading: isPriceLoading,
    refetch: refetchPrice,
  } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "itemPrices",
    args: [BigInt(item.id)],
  });

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });
  const isLoading = isSubmitting || isConfirming;

  useEffect(() => {
    if (price !== undefined) {
      try {
        setPriceInEth(formatEther(price as bigint));
      } catch (e) {
        console.error("Failed to format price:", e);
        setPriceInEth("N/A");
      }
    } else {
      setPriceInEth("N/A");
    }
  }, [price]);

  const handleMint = async () => {
    if (chain?.id !== SOMNIA_TESTNET_CHAIN_ID) {
      return toast.error("Please switch to Somnia Testnet.");
    }
    if (price === undefined || price === null || price === BigInt(0)) {
      return toast.error("The price of the item is not available");
    }
    const toastId = toast.loading("Please confirm in your wallet...");
    setActiveToastId(toastId);
    try {
      await writeContractAsync({
        abi,
        address: contractAddress,
        functionName: "mintItem",
        args: [BigInt(item.id), BigInt(1)],
        value: BigInt(price as bigint),
      });
      toast.loading("Currently minting...", { id: toastId });
    } catch (err: unknown) {
      const error = err as Error;
      if (error.message?.includes("User rejected the request")) {
        toast.dismiss(toastId);
      } else {
        toast.error(error.message || "An error occurred", { id: toastId });
      }
      setActiveToastId(undefined);
      console.error(error);
    }
  };

  useEffect(() => {
    if (hash && !isConfirming && !isSubmitting && activeToastId) {
      toast.success(`${item.name} successfully minted!`, { id: activeToastId });
      setActiveToastId(undefined);
      refetchPrice();
    }
  }, [
    hash,
    isConfirming,
    isSubmitting,
    activeToastId,
    item.name,
    refetchPrice,
  ]);

  const buttonDisabled =
    isLoading || !isConnected || price === undefined || price === BigInt(0);

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (isLoading) return isSubmitting ? "Confirming..." : "Processing...";
    if (isPriceLoading) return "Loading Price...";
    if (price === BigInt(0)) return "Not for Sale";
    return "MINT ITEM";
  };

  return (
    <div className="border-2 border-gray-400 bg-white/50 backdrop-blur-sm p-4 flex flex-col items-center text-center transition-all duration-300 hover:border-gray-600 hover:bg-gray-200/50 transform hover:scale-95">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <h3 className="text-xl h-12 font-pixel">{item.name}</h3>
      <p className="text-gray-700 text-lg my-2">
        {isPriceLoading ? "..." : priceInEth} STT
      </p>
      <button
        onClick={handleMint}
        disabled={buttonDisabled}
        className="mt-auto w-full border-2 border-gray-600 bg-gray-700 text-white px-4 py-2 font-bold uppercase tracking-wider transition-all duration-200 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400 disabled:cursor-not-allowed"
      >
        {getButtonText()}
      </button>
    </div>
  );
}

const MarketplaceSection = () => {
  return (
    <section className="container mx-auto p-4 md:p-8">
      <header className="text-center my-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white-400 tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.75)] font-pixel">
          WASTELIVE ITEMS
        </h1>
        <p className="text-stone-300 mt-2 text-lg">
          Mint your survivor. Own the wasteland.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {ITEMS.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MarketplaceSection;
