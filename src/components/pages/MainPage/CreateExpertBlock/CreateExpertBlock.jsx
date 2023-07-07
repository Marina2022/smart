import s from './CreateExpertBlock.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {resetCurrentExpertData} from "../../../../store/reducers/dataReducer";
import {useEffect} from "react";
import {useDispatch} from "react-redux";


const CreateExpertBlock = () => {
  const navigate = useNavigate()
  const onLinkClick = (e) => {
    navigate('/edit')
    window.location.reload()
    //if (window.innerWidth <= 992) e.preventDefault()
  }

  const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(resetCurrentExpertData())
  // }, [])

  return (
    <div className={s.createExpertBlock}>
      <div>
        Are you an <b>expert</b>?
      </div>
      <div>
        Create your profile now
      </div>
      <Link to="/edit" onClick={onLinkClick} className={s.joinBtn}>Join now</Link>
    </div>
  )
};

export default CreateExpertBlock;
