import s from './MobileModal.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
  selectIsMobileModalShown,
  setIsMobileModalShown,
  setJustRegisteredIsShown
} from "../../../../store/reducers/dataReducer";
import closeBtn from "../../../../assets/closeConnect.svg";

const MobileModal = () => {

  const isShown = useSelector(selectIsMobileModalShown)

  const dispatch = useDispatch()

  const onClose = () => {
    dispatch(setIsMobileModalShown(false))
  }

  return (
    isShown && <div>
      <div className="overlay" onClick={onClose}></div>
      <div className={s.mobileModal}>
        <button className={s.closeBtn}
                onClick={onClose}
        ><img src={closeBtn} alt="close button"/></button>
        <h3>Limited access</h3>
        <p>The main functionality of the platform is currently available only on the desktop version.</p>

      </div>
    </div>
  );
};

export default MobileModal;
