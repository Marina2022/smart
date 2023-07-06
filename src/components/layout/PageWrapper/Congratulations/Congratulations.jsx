import s from './Congratulations.module.scss'
import closeBtn from "../../../../assets/closeConnect.svg";
import {resetCurrentExpertData} from "../../../../store/reducers/dataReducer";
import {useDispatch} from "react-redux";

const Congratulations = ({showCongratsModal}) => {

  const dispatch = useDispatch()

  const onClose = () => {
    showCongratsModal(false);
    dispatch(resetCurrentExpertData())
    window.location.reload()
  }

  return (
    <div>
      <div className="overlay" onClick={onClose}></div>
      <div className={s.connectModal}>
        <button className={s.closeBtn}
                onClick={onClose}
        ><img src={closeBtn} alt="close button"/></button>

        <div className={s.step3_4}>
          <div className={s.walletTitle}>Congratulation!</div>
            <p className={s.walletText}>You successfully verified your wallet</p>
          <div className={s.buttonWrapper}>
            <button className={s.button} onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Congratulations;
