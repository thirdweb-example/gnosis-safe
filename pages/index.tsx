import type { NextPage } from "next";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useConnect,
  useDisconnect,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { useGnosis } from "@thirdweb-dev/react/evm/connectors/gnosis-safe";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  // Allow user to connect their Gnosis wallet
  const connectWithGnosis = useGnosis();

  // View the connected personal wallet address (if connected)
  const address = useAddress();

  // Allow user to disconnect from the dApp
  const disconnectWallet = useDisconnect();

  // Ensure user is on the correct network as specified in ThirdwebProvider
  const needsSwitchNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Store the state of the form in a useState hook
  const [formState, setFormState] = useState({
    // Smart contract address that the user enters
    safeAddress: "",
    // Default chainId to Goerli in this example (customize this to your needs)
    safeChainId: ChainId.Goerli,
  });

  // Detect if the Gnosis connector is connected
  const [connector] = useConnect();
  const activeConnector = connector.data.connector;
  const gnosisConnector = connector.data.connectors.find(
    (c) => c.id === "gnosis"
  );
  const isGnosisConnectorConnected =
    activeConnector?.id === gnosisConnector?.id;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>thirdweb + Gnosis Safe</h1>

        <p className={styles.description}>
          Allow user&rsquo;s to connect their{" "}
          <a href="" target="_blank" className={styles.link}>
            Gnosis Safe
          </a>{" "}
          wallet to your application.
        </p>

        <p className={styles.hint}>
          Note: this example is configured to the Goerli testnet.
        </p>

        <hr className={styles.divider} />

        {/* First, user must connect a personal wallet. */}
        {!address && <ConnectWallet />}

        {/* Ensure user is on the correct network as specified in ThirdwebProvider */}
        {needsSwitchNetwork && (
          <button
            className={styles.mainButton}
            onClick={() => {
              switchNetwork?.(ChainId.Goerli);
            }}
          >
            Switch Network
          </button>
        )}

        {/* Next, connect their Gnosis Safe wallet. */}
        {!needsSwitchNetwork && address && !isGnosisConnectorConnected && (
          <>
            <h2 style={{ fontSize: "1.3rem" }}>Connect Gnosis Safe Wallet</h2>
            <div className={styles.form}>
              {/* Allow user input for their Gnosis safe address */}
              <input
                id="safeAddress"
                type="text"
                placeholder="Gnosis Safe Address"
                className={styles.textInput}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    safeAddress: e.target.value,
                  })
                }
              />

              {/* "Submit" the form to request Safe wallet connection */}
              <button
                className={styles.mainButton}
                onClick={() => {
                  connectWithGnosis({
                    safeAddress: formState.safeAddress,
                    safeChainId: formState.safeChainId,
                  });
                }}
              >
                Connect to Safe
              </button>
            </div>
          </>
        )}

        {/* Finally, user is connected to both personal and Safe wallets. */}
        {address && isGnosisConnectorConnected && (
          <>
            <h2 style={{ fontSize: "1.3rem" }}>You&apos;re Connected! 👋</h2>{" "}
            <p>{address}</p>
            <button
              className={styles.mainButton}
              onClick={() => disconnectWallet()}
            >
              Disconnect Wallet
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
