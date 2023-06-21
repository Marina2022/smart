import s from './VerifyWallet.module.scss'
import ApproveConnectBtn from "../../../smartContractComponents/ApproveConnectBtn";
import closeBtn from "../../../../assets/closeConnect.svg";
import {setConnectIsShown, setWalletType} from "../../../../store/reducers/dataReducer";
import {useEffect} from "react";

const onClose = () => {
//  dispatch(setConnectIsShown(false));
}
const onKeydown = (e) => {
  if (e.key === 'Escape')
    onClose();
}

const VerifyWallet = ({onVerifyClick}) => {

  // useEffect(() => {
  //   document.addEventListener('keydown', onKeydown)
  //   return () => document.removeEventListener('keydown', onKeydown)
  // }, [])

  return (
    <div>
      <div className="overlay" onClick={onClose}></div>
      <div className={s.connectModal}>

        {/*<button className={s.closeBtn} onClick={onClose} ><img src={closeBtn} alt="close button"/></button>*/}

        <div className={s.step3_4}>
          <div className={s.walletTitle}>Verify your wallet</div>
          <div className={s.buttonWrapper}>
            <ApproveConnectBtn onVerifyClick={onVerifyClick}/>
          </div>
        </div>
      </div>
    </div>

  );
};

export default VerifyWallet;
