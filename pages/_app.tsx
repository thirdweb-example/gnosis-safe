import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { GnosisSafeConnector } from "@thirdweb-dev/react/evm/connectors/gnosis-safe";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const gnosisSafeConnector = new GnosisSafeConnector({});

  return (
    <ThirdwebProvider
      // Configure the connectors you want to use, including your gnosisSafeConnector
      walletConnectors={[
        gnosisSafeConnector,
        "injected",
        "coinbase",
        "walletConnect",
      ]}
      // In this example, we only want to connect to Goerli gnosis safe wallets
      activeChain={"goerli"}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
