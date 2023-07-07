import s from './UserProfileModal.module.scss'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {resetCurrentExpertData} from "../../../../store/reducers/dataReducer";
import {useDispatch} from "react-redux";

const UserProfileModal = ({isModalActive, setIsModalActive}) => {
  const navigate = useNavigate()

  const onKeydown = (e) => {
    if (e.key === 'Escape')
      setIsModalActive(false);
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])


  const dispatch = useDispatch()
  const onYesClick = () => {
    dispatch(resetCurrentExpertData())
    navigate('/edit')
    window.location.reload()
  }


  return (
    isModalActive && <div>
      <div className="overlayTransparent" onClick={() => setIsModalActive(false)}></div>
      <div className={s.modal}>
        <h3 className={s.title}>Are you sure you want to switch to expert?</h3>
        <p className={s.text}>It will not be possible to switch back to the student</p>
        <div className={s.buttonsWrapper}>
          {/*<button className={s.switchBtn} onClick={onYesClick}>Yes, switch</button>*/}
          <a href={'/edit'} className={s.switchBtn}>Yes, switch</a>
          <button className={s.noBtn} onClick={() => setIsModalActive(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
