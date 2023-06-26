import s from './ConnectBtns.module.scss';
import {useDispatch} from "react-redux";
import {setConnectIsShown, setWallet} from "../../store/reducers/dataReducer";
import {useNavigate} from "react-router-dom";

const ConfirmConnectBtn = ({step, setStep}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onConfirmClick = () => {
    dispatch(setWallet({
      number: '0x2o39u42sdfsd5646546fsdfdfhg3094u',
      balance: 1256,
      donated: 30
    }))
    dispatch(setConnectIsShown(false));
    navigate('role')
  }

  return (

    <button className={s.connectBtn} disabled={step === 3} onClick={onConfirmClick}>
      Confirm</button>
  );
};

export default ConfirmConnectBtn;
