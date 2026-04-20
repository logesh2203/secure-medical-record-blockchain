import React, { useEffect, useState } from "react";
import { formatChainMessage, isGanacheChainId, isMetaMaskInstalled, onChainChanged, refreshChainId } from "../utils/metamask";

const MetaMaskBanner = () => {
  const [chainId, setChainId] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};

    const run = async () => {
      if (!isMetaMaskInstalled()) {
        setChainId(null);
        setChecked(true);
        return;
      }
      const id = await refreshChainId();
      setChainId(id);
      setChecked(true);
    };

    run();
    unsubscribe = onChainChanged(() => {
      refreshChainId().then(setChainId);
    });

    return unsubscribe;
  }, []);

  if (!checked) return null;

  if (!isMetaMaskInstalled()) {
    return (
      <div className="banner banner-warn" role="status">
        MetaMask is not installed. Install the extension to connect a Ganache account.
      </div>
    );
  }

  if (chainId == null) {
    return (
      <div className="banner banner-warn" role="status">
        Could not read network. Unlock MetaMask and use Ganache (chain ID 1337 or 5777).
      </div>
    );
  }

  if (!isGanacheChainId(chainId)) {
    return (
      <div className="banner banner-warn" role="status">
        Wrong network — switch MetaMask to <strong>Ganache</strong> (chain ID <strong>1337</strong> or <strong>5777</strong>).{" "}
        {formatChainMessage(chainId)}
      </div>
    );
  }

  return (
    <div className="banner banner-ok" role="status">
      Ganache network OK. {formatChainMessage(chainId)}
    </div>
  );
};

export default MetaMaskBanner;
