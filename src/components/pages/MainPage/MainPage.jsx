import About from "./About/About";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchExperts,
  selectIsLoading,
  selectIsOtherDataLoading,
  selectIsUserRegistered,
  selectRole,
  selectWallet,
} from "../../../store/reducers/dataReducer";
import {RotatingLines} from 'react-loader-spinner';
import ExpertList from "./ExpertList/ExpertList";
import {useEffect} from "react";
import CreateExpertBlock from "./CreateExpertBlock/CreateExpertBlock";
import ExpertCongratulate from "./ExpertCongratulate/ExpertCongratulate";
import MobileModal from "./MobileModal/MobileModal";

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
    <div>
      <MobileModal/>
      <ExpertCongratulate/>
      <About/>
      {role !== 'expert' && isRegistered && isConnected && <CreateExpertBlock/>}
      <ExpertList/>
    </div>
  )
}

export default MainPage;
