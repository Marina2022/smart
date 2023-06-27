import s from './CreateExpertBlock.module.scss';
import {Link} from "react-router-dom";

const onLinkClick = (e) => {
  if (window.innerWidth <= 992) e.preventDefault()
}

const CreateExpertBlock = () => {
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
