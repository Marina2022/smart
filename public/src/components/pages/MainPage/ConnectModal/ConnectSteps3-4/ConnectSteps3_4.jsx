import s from './ConnectSteps3-4.module.scss'
import ApproveConnectBtn from "../../../../smartContractComponents/ApproveConnectBtn";
import ConfirmConnectBtn from "../../../../smartContractComponents/ConfirmConnectBtn";
import one from '../../../../../assets/progress/one.svg'
import oneChecked from '../../../../../assets/progress/one-checked.svg'
import twoInactive from '../../../../../assets/progress/two-inactive.svg'
import twoActive from '../../../../../assets/progress/two-active.svg'

const ConnectSteps3_4 = ({setStep, step}) => {
  return (
    <div className={s.step3_4}>
      <div className={s.walletTitle}>Approve your wallet</div>
      <div className={s.buttonWrapper}>
        <ApproveConnectBtn setStep={setStep} step={step}/>
        <ConfirmConnectBtn setStep={setStep} step={step}/>
      </div>
      <div className={s.progress}>
        <img src={step === 3 ? one : oneChecked} alt="step"/>
        <div className={s.line} style={{'background': step === 3 ? '#9CA3AF' : '#CB00DD'}}></div>
        <img src={step === 3 ? twoInactive : twoActive} alt="step"/>

      </div>
    </div>
  );
};

export default ConnectSteps3_4;
