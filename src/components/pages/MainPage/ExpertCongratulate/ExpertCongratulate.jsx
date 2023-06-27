import s from './ExpertCongratulate.module.scss'
import closeBtn from "../../../../assets/closeConnect.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectExpertJustRegisteredIsShown, setJustRegisteredIsShown} from "../../../../store/reducers/dataReducer";

const ExpertCongratulations = () => {

  const dispatch = useDispatch()
  const expertJustRegisteredIsShown = useSelector(selectExpertJustRegisteredIsShown)

  const onClose = () => {
    dispatch(setJustRegisteredIsShown(false))
  }

  return (
    expertJustRegisteredIsShown && <div>
      <div className="overlay" onClick={onClose}></div>
      <div className={s.connectModal}>
        <button className={s.closeBtn}
                onClick={onClose}
        ><img src={closeBtn} alt="close button"/></button>

        <div className={s.step3_4}>
          <div className={s.walletTitle}>Congratulation!</div>
          <p className={s.walletText}>You successfully registered as expert, thank you!</p>
          <div className={s.buttonWrapper}>
            <button className={s.button} onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertCongratulations;
