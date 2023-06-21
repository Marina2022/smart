import s from './ConnectBtns.module.scss';

const ApproveConnectBtn = ({onVerifyClick}) => {
  return (
    <button
      className={s.connectBtn}
      onClick={onVerifyClick}  // тут будет онКлик кнопки Register
    >Verify</button>
  );
};

export default ApproveConnectBtn;
