import s from "./header.module.scss";
import logo from '../../../assets/logo.svg'
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  selectIsUserRegistered,
  selectRole,
  selectWallet,
  setConnectIsShown,
  setIsMobileModalShown
} from "../../../store/reducers/dataReducer";
import {useState} from "react";
import ConnectModal from "../../pages/MainPage/ConnectModal/ConnectModal";
import TopProfileModal from "./TopProfileModal/TopProfileModal";

const Header = () => {
  const wallet = useSelector(selectWallet);
  const [profileModalIsShown, setProfileModalIsShown] = useState(false);
  const dispatch = useDispatch();

  // const role = useSelector(selectRole);
  // const isRegistered = useSelector(selectIsUserRegistered)
  // const isConnected = useSelector(selectWallet)

  const onHeaderBtnClick = (e) => {
    if(window.innerWidth <= 992) {
      dispatch(setIsMobileModalShown(true))
      return
    }
    if (wallet) {
      setProfileModalIsShown(true);
    } else {
      dispatch(setConnectIsShown(true))
    }
  }

  let walletStringValue;
  if (wallet) {
    walletStringValue = wallet.number.slice(0, 4) + '...' + wallet.number.slice(-4);
  }

  const path = useLocation().pathname;
  const showMostOfHeader = path !== '/role' && path !== '/edit'

  return (
    <header className={s.mainHeader}>
      <div className="container">
        <div className={s.headerWrapper}>
          {showMostOfHeader && <Link to="/"><img src={logo} alt="logo"/></Link>}
          {showMostOfHeader && <div className={s.headerMenu}>
            <Link to="/" className={s.headerLink_active}>Donation</Link>
            <a href="https://docs.cyberbox.art/" className={s.headerLink}>About</a>
          </div>}

          {/*{*/}
          {/*  role !== 'expert' && isRegistered && showMostOfHeader && isConnected && <Link className={s.createExpertLink} to="/edit">Create an Expert</Link>*/}
          {/*}*/}

          {showMostOfHeader && <button className={s.headerConnectBtn}
                                       onClick={onHeaderBtnClick}
          >{
            !wallet ? `CONNECT` : `${walletStringValue}`}</button>}
        </div>
        {
          <TopProfileModal profileModalIsShown={profileModalIsShown} setProfileModalIsShown={setProfileModalIsShown}
                           classname={s.headerProfilePopup} walletNumber={walletStringValue}/>
        }
        <ConnectModal/>
      </div>
    </header>
  );
};

export default Header;
