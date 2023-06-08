import s from './ConnectBtns.module.scss';

const ApproveConnectBtn = ({step, setStep}) => {
  return (
    <button
      className={s.connectBtn} disabled={step === 4}
    onClick={()=>setStep(4)}
    >Approve</button>
  );
};

export default ApproveConnectBtn;
