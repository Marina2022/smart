import s from './ConnectBtns.module.scss';
import {useState} from "react";

const ApproveConnectBtn = ({onVerifyClick}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onBtnClick = ()=>{
    setIsSubmitting(true)
    onVerifyClick()
  }

  return (
    <button
      className={s.connectBtn}
      onClick={onBtnClick}  // тут будет онКлик кнопки Register
      disabled={isSubmitting}
    >{isSubmitting ? 'Wait...' : 'Verify'}</button>
  );
};

export default ApproveConnectBtn;
