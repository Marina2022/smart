import About from "./About/About";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchExperts,
  fetchOtherData,
  selectCurrentExpertId, selectExpertJustRegisteredIsShown,
  selectIsLoading,
  selectIsOtherDataLoading,
  selectIsUserRegistered,
  selectJustCompletedExpertRegistration,
  selectRole,
  selectWallet,
  setRoundData,
} from "../../../store/reducers/dataReducer";
import {RotatingLines} from 'react-loader-spinner';
import ExpertList from "./ExpertList/ExpertList";
import {useEffect} from "react";
import CreateExpertBlock from "./CreateExpertBlock/CreateExpertBlock";
import {Link} from "react-router-dom";
import s from "../../layout/Header/header.module.scss";
import ExpertCongratulate from "./ExpertCongratulate/ExpertCongratulate";

const MainPage = () => {

  const dispatch = useDispatch()

  const wallet = useSelector(selectWallet)
  let walletAddress = null
  if (wallet) walletAddress = wallet.number


  useEffect(() => {
    dispatch(fetchExperts())
  }, [walletAddress])


  const isMainPageLoading = useSelector(selectIsLoading);
  const isOtherDataLoading = useSelector(selectIsOtherDataLoading);

  const role = useSelector(selectRole);
  const isRegistered = useSelector(selectIsUserRegistered)
  const isConnected = useSelector(selectWallet)


  if (isMainPageLoading || isOtherDataLoading) return <div style={{'textAlign': 'center', 'padding': 50}}><RotatingLines
    strokeColor="#4481c3"/></div>

  return (
    <>
      <ExpertCongratulate />
      <About/>
      {role !== 'expert' && isRegistered && isConnected && <CreateExpertBlock/>}
      <ExpertList/>
    </>
  )
}

export default MainPage;
