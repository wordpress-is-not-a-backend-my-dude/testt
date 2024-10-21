import React, { useEffect } from 'react';
import styles from './DeBridgeMenu.module.css';

interface DeBridgeMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeBridgeMenu: React.FC<DeBridgeMenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = "https://app.debridge.finance/assets/scripts/widget.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // @ts-ignore
        window.deBridge.widget({
          "v":"1",
          "element":"debridgeWidget",
          "title":"Verity",
          "description":"",
          "width":"450",
          "height":"650",
          "r":null,
          "supportedChains":"{\"inputChains\":{\"1\":\"all\",\"10\":\"all\",\"56\":\"all\",\"100\":\"all\",\"137\":\"all\",\"1088\":\"all\",\"7171\":\"all\",\"8453\":\"all\",\"42161\":\"all\",\"43114\":\"all\",\"59144\":\"all\",\"7565164\":\"all\",\"245022934\":\"all\"},\"outputChains\":{\"1\":\"all\",\"10\":\"all\",\"56\":\"all\",\"100\":\"all\",\"137\":\"all\",\"1088\":\"all\",\"7171\":\"all\",\"8453\":\"all\",\"42161\":\"all\",\"43114\":\"all\",\"59144\":\"all\",\"7565164\":\"all\",\"245022934\":\"all\"}}",
          "inputChain":56,
          "outputChain":1,
          "inputCurrency":"",
          "outputCurrency":"",
          "address":"",
          "showSwapTransfer":true,
          "amount":"",
          "outputAmount":"",
          "isAmountFromNotModifiable":false,
          "isAmountToNotModifiable":false,
          "lang":"en",
          "mode":"deswap",
          "isEnableCalldata":false,
          "styles":"e30=",
          "theme":"dark",
          "isHideLogo":false,
          "logo":"https://cloud.artopia.dev/storage/verityicon.png",
          "disabledWallets":[],
          "disabledElements":[]
        });
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="w-[500px] h-[735px] bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <img src="https://cloud.artopia.dev/storage/bridge.png" alt="Bridge" width={34} height={34} />
            &nbsp;Bridgely
          </h3>
          <div className={`flex-grow ${styles.scrollableContent}`}>
            <div id="debridgeWidget" className="h-full rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeBridgeMenu;
