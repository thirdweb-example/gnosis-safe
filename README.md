# Gnosis Safe Wallet Connection

This project demonstrates how to use [Gnosis Safe](https://gnosis-safe.io/) with thirdweb using the [useGnosis](https://docs.thirdweb.com/react/react.usegnosis) hook from the [thirdweb React SDK](https://docs.thirdweb.com/react).

Magic Link enables users to connect to your dApp using **email**, **phone number**, or **social login**.

**Check out the Demo here**: https://gnosis-safe.thirdweb-example.com

## Using This Repo

Create a copy of this repo using the [CLI](https://portal.thirdweb.com/cli)

```bash
npx thirdweb create --template gnosis-safe
```

Create your own Gnosis safe wallet: https://app.safe.global/welcome

Configure the network you want to use in the `activeChainId` variable in [\_app.tsx](./pages/_app.tsx) (we use Goerli in this example)

```jsx
// In this example, we only want to connect to Goerli gnosis safe wallets
activeChain={"goerli"}
```

Set the `safeChainId` variable in the `useState` hook in the [Home Page](./pages/index.tsx) to the same network you set in the previous step.

```jsx
// Default chainId to Goerli in this example (customize this to your needs)
safeChainId: ChainId.Goerli,
```

## How it works

First, we set up the `GnosisSafeConnector` in the `_app.tsx` file, and provide it as a `walletConnector` option.

```jsx
function MyApp({ Component, pageProps }: AppProps) {
  const gnosisSafeConnector = new GnosisSafeConnector({});

  return (
    <ThirdwebProvider walletConnectors={[gnosisSafeConnector]}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
```

This allows us to use the `useGnosis` hook throughout the app.

Before the user can connect thier Gnosis wallet, we need to:

1. Connect a personal wallet (required to make transactions with)
2. Switch to the correct network

### Connect personal wallet

Grab the connected wallet address:

```jsx
// View the connected personal wallet address (if connected)
const address = useAddress();
```

If there is no connected wallet, connect one:

```jsx
// First, user must connect a personal wallet.
{
  !address && <ConnectWallet />;
}
```

### Switch to correct network

Check the network the user is connected to:

```jsx
// Ensure user is on the correct network as specified in ThirdwebProvider
const needsSwitchNetwork = useNetworkMismatch();
const [, switchNetwork] = useNetwork();
```

If the user is not connected to the correct network, switch to the correct network:

```jsx
// Ensure user is on the correct network as specified in ThirdwebProvider
{
  needsSwitchNetwork && (
    <button
      onClick={() => {
        switchNetwork?.(ChainId.Goerli);
      }}
    >
      Switch Network
    </button>
  );
}
```

### Connect Gnosis Safe

Finally, we can connect the Gnosis Safe wallet:

```jsx
//  "Submit" the form to request Safe wallet connection
<button
  onClick={() => {
    connectWithGnosis({
      safeAddress: formState.safeAddress,
      safeChainId: formState.safeChainId,
    });
  }}
>
  Connect to Safe
</button>
```

### Get Safe Info

Once the user has connected their Gnosis Safe wallet, we can get the Safe info:

```jsx
// Detect if the Gnosis connector is connected
const [connector] = useConnect();
const activeConnector = connector.data.connector;
const gnosisConnector = connector.data.connectors.find(
  (c) => c.id === "gnosis"
);
const isGnosisConnectorConnected = activeConnector?.id === gnosisConnector?.id;
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
