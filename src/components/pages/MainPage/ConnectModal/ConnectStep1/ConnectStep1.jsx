import s from './ConnectStep1.module.scss'
import metamaskIcon from "../../../../../assets/metamask.svg";
import trustwalletIcon from "../../../../../assets/trustwallet.svg";
import walletConnectIcon from "../../../../../assets/walletConnect.svg";
import braveIcon from "../../../../../assets/brave.svg";
import {useDispatch} from "react-redux";
import {setWalletType} from "../../../../../store/reducers/dataReducer";

const ConnectStep1 = ({setStep}) => {

  const dispatch = useDispatch();

  return (
    <div className={s.step1}>
      <h2 className={s.title}>Connect your wallet</h2>
      <ul className={s.walletsList}>
        <li className={s.walletItem}
            onClick={() => {
              setStep(2);
              dispatch(setWalletType('MetaMask'))
            }}
        >
          <span className={s.walletName}>MetaMask</span>
          <img src={metamaskIcon} alt="metamask icon"/>
        </li>

        <li className={s.walletItem}
            onClick={() => {
              setStep(2);
              dispatch(setWalletType('TrustWallet'))
            }}
        >
          <span className={s.walletName}>TrustWallet</span>
          <img src={trustwalletIcon} alt="trustwallet icon"/>
        </li>

        <li className={s.walletItem}
            onClick={() => {
              setStep(2);
              dispatch(setWalletType('WalletConnect'))
            }}
        >
          <span className={s.walletName}>WalletConnect</span>
          <img src={walletConnectIcon} alt="WalletConnect icon"/>
        </li>

        <li className={s.walletItem}
            onClick={() => {
              setStep(2);
              dispatch(setWalletType('Brave'))
            }}
        >
          <span className={s.walletName}>Brave</span>
          <img src={braveIcon} alt="brave icon"/>
        </li>
      </ul>
    </div>
  );
};

export default ConnectStep1;
