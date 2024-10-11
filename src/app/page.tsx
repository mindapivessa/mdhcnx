'use client';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { ONCHAINKIT_LINK } from 'src/links';
import MooDengSvg from 'src/svg/MooDengSvg';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import { mooDengAddress } from 'src/constants';
import Image from 'next/image';

export default function Page() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col w-full px-4">
      <section className="mt-6 mb-3 flex w-full flex-row items-center justify-between">
        <a
          href={ONCHAINKIT_LINK}
          title="onchainkit"
          target="_blank"
          rel="noreferrer"
        >
          <MooDengSvg />
        </a>
        <div className="flex items-center justify-end w-[200px]">
          {address ? (
            <TransactionWrapper address={mooDengAddress} amount={1} />
          ) : (
            <WalletWrapper
              className="rounded-lg w-[200px] bg-zinc-950 hover:bg-zinc-800"
              text="Donate 10 USDC"
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
      <Footer />
    </div>
  );
}
