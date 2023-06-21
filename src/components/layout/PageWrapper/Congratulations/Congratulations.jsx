import s from './Congratulations.module.scss'
import closeBtn from "../../../../assets/closeConnect.svg";

const Congratulations = ({showCongratsModal}) => {
  const onClose = () => {
    showCongratsModal(false);
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
