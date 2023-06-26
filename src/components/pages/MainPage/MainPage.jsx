import About from "./About/About";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchExperts,
  fetchOtherData, selectCurrentExpertId,
  selectIsLoading, selectIsOtherDataLoading, selectWallet,
  setRoundData,
} from "../../../store/reducers/dataReducer";
import {RotatingLines} from 'react-loader-spinner';
import ExpertList from "./ExpertList/ExpertList";
import {useEffect} from "react";


const MainPage = () => {

  const dispatch = useDispatch()

  const wallet = useSelector(selectWallet)
  let walletAddress = null
  if (wallet) walletAddress = wallet.number


  useEffect(()=>{
    dispatch(fetchExperts())
  }, [walletAddress])


  const isMainPageLoading = useSelector(selectIsLoading);
  const isOtherDataLoading = useSelector(selectIsOtherDataLoading);
  if (isMainPageLoading || isOtherDataLoading) return <div style={{'textAlign': 'center', 'padding': 50}}><RotatingLines
    strokeColor="#4481c3"/></div>

  return (
    <>
      <About/>
      <ExpertList/>
    </>
  )
}

export default MainPage;
