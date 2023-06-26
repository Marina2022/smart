import s from './CreateExpertBlock.module.scss';
import {Link} from "react-router-dom";

const CreateExpertBlock = () => {
  return (
    <div className={s.createExpertBlock}>
      <div>
        Are you an <b>expert</b>?
      </div>
      <div>
        Create your profile now
      </div>
      <Link to="/edit" className={s.joinBtn}>Join now</Link>
    </div>
  )
};

export default CreateExpertBlock;
