'use client';
import { useState, useEffect } from 'react';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address, ContractFunctionParameters } from 'viem';
import {
  BASE_SEPOLIA_CHAIN_ID,
  transferABI,
  usdcAddress,
} from '../constants';

type TransactionWrapperProps = {
  address: Address;
  amount: number;
  onSuccess: () => void;
};

export default function TransactionWrapper({ address, amount, onSuccess }: TransactionWrapperProps) {
  // Convert decimal amount to BigInt (USDC has 6 decimal places)
  const amountInSmallestUnit = BigInt(Math.floor(amount * 1_000_000));

  const contracts = [
    {
      address: usdcAddress,
      abi: transferABI,
      functionName: 'transfer',
      args: [address, amountInSmallestUnit],
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    onSuccess();
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton 
          className="font-mono w-[120px] md:w-[200px] text-xs md:text-base bg-zinc-950 hover:bg-zinc-800 font-mono rounded-none" 
          text="Donate 0.1 USDC"
        />
      </Transaction>
    </div>
  );
}
