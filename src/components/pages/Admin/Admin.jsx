import s from './Admin.module.scss';
import {useSelector} from "react-redux";
import {selectIsOtherDataLoading, selectRegistrationRequested} from "../../../store/reducers/dataReducer";
import {RotatingLines} from "react-loader-spinner";

const Admin = () => {

  const requestedExperts = useSelector(selectRegistrationRequested)
  const isOtherDataLoading = useSelector(selectIsOtherDataLoading)

  if (isOtherDataLoading) return <div style={{'textAlign': 'center', 'padding': 50}}><RotatingLines
    strokeColor="#4481c3"/></div>

  return (
    <div className="container">
      <h2 className={s.title}>Experts not approved yet</h2>
      <div className={s.wrapper}>
        <span className={s.name}><strong>Name</strong></span>
        <span className={s.address}><strong>Address</strong></span>
      </div>
      <ul>
        { requestedExperts &&
          requestedExperts.map((expert) =>
            <li className={s.wrapper}>
              <span className={s.name}>{expert._name}</span>
              <span className={s.address}>{expert._expertAddress}</span>
            </li>)
        }
      </ul>
    </div>
  );
};

export default Admin;
