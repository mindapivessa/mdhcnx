'use client';
import { useState, useCallback } from 'react';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import FallingMooDengs from 'src/components/FallingMooDengs';
import MooDengSvg from 'src/svg/MooDengSvg';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import { mooDengAddress } from 'src/constants';
import Image from 'next/image';

export default function Page() {
  const { address } = useAccount();
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const handleTransactionSuccess = useCallback(() => {
    setTriggerAnimation(prev => !prev);
  }, []);

  const handleMooDengClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTriggerAnimation(prev => !prev);
  };

  return (
    <div className="flex flex-col w-full px-4">
      <FallingMooDengs trigger={triggerAnimation} />
      <section className="mt-6 mb-3 flex w-full flex-row items-center justify-between">
        <div 
          onClick={handleMooDengClick}
          className="cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-[-15deg]"
          title="Click for a surprise!"
        >
          <MooDengSvg />
        </div>
        <div className="flex items-center justify-end w-[200px]">
          {address ? (
            <TransactionWrapper 
              address={mooDengAddress} 
              amount={0.1} 
              onSuccess={handleTransactionSuccess} 
            />
          ) : (
            <WalletWrapper
              className="w-[200px] bg-zinc-950 hover:bg-zinc-800 font-mono rounded-none"
              text="Donate 0.1 USDC"
            />
          )}
        </div>
      </section>
      <main className="flex-grow flex justify-center items-center">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src="/hero-image.png"
            alt="Hero Image"
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
      </main>
      <main className="flex flex-col md:flex-row space-x-56 mt-4 mb-16">
        <div className="w-full md:w-[360px] space-y-4">
          <p className="text-zinc-950">
            OPEN DONATION FOR <a href={'https://reliefweb.int/report/viet-nam/one-month-super-typhoon-yagi-learning-loss-affecting-13-million-children-across-southeast-asia'} target="_blank" rel="noreferrer" className="underline">FLOOD-AFFECTED SCHOOLS IN NORTHERN THAILAND</a>.
          </p>
          <p className="text-zinc-950">
            USDC ACCEPTED.
          </p>
        </div>
        <div className="w-full md:w-[360px] space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-zinc-950 rounded-full flex items-center justify-center">
              <span className="text-gray-50 text-sm">1</span>
            </div>
            <p className="text-zinc-950 mt-1">
              YOUR DONATIONS WILL GO TO <a href={`https://basescan.org/address/${mooDengAddress}`} target="_blank" rel="noreferrer" className="underline">0XMOODENG.BASE.ETH</a>.
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-zinc-950 rounded-full flex items-center justify-center">
              <span className="text-gray-50 text-sm">2</span>
            </div>
            <div className="text-zinc-950 mt-1">
              <p className="mb-4">
                EVERY SUNDAY 9AM EST, DONATIONS WILL BE CONVERTED TO THB AND TRANSFERRED TO <a href={'https://www.instagram.com/satifound/?hl=en'} target="_blank" rel="noreferrer" className="underline">SATI FOUNDATION</a>.
              </p>
              <p>
                YOU CAN TRACK FUNDS <a href={`https://basescan.org/address/${mooDengAddress}`} target="_blank" rel="noreferrer" className="underline">HERE</a>.
              </p>
            </div>
          </div>
          <p className="text-zinc-950 pt-12">
            MADE BY <a href={'https://twitter.com/spicypaprika_'} target="_blank" rel="noreferrer" className="underline">PAPRIKA</a>. BUILT ON <a href={'https://www.base.org/'} target="_blank" rel="noreferrer" className="underline">BASE</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
