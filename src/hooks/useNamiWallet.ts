import { useState, useCallback } from 'react';
import { Buffer } from 'buffer';
import * as Serialization from '@emurgo/cardano-serialization-lib-asmjs/';

declare const window: any;

// Activated Wallet response object
type NamiWallet = {
  address: string;
  balance: string;
};

// Nami Wallet enabling attempt object
type EnableAttempt = {
  handleSuccess(wallet: NamiWallet): void;
  handleError(error: string): void;
};

function HexToBuffer(string: string): Buffer {
  return Buffer.from(string, 'hex');
}

async function NamiWalletEnabled({
  handleSuccess,
  handleError,
}: EnableAttempt): Promise<void> {
  let nami = window.cardano;
  try {
    await nami.enable();
    const wallet = {
      address: Serialization.Address.from_bytes(
        HexToBuffer((await nami.getUsedAddresses())[0])
      ).to_bech32(),
      balance: await nami.getBalance(),
    };
    handleSuccess(wallet);
  } catch (error: any) {
    handleError(error.message);
  }
}

export default function useNamiWallet() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [wallet, setWallet] = useState<NamiWallet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccess = useCallback(
    (walletResponse: NamiWallet) => {
      if (error) {
        setError('');
      }
      setWallet(walletResponse);
      setEnabled(true);
      setLoading(false);
    },
    [error]
  );

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setLoading(false);
  }, []);

  const handleEnable = useCallback(() => {
    if (!enabled && !wallet && !loading) {
      NamiWalletEnabled({ handleSuccess, handleError });
    }
  }, [enabled, wallet, loading, handleSuccess, handleError]);

  return {
    enabled,
    error,
    wallet,
    loading,
    handleEnable,
  };
}
