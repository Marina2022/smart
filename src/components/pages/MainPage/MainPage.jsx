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
import {api} from "../../../index";
import {APIRoutes} from "../../../consts";
import {logDOM} from "@testing-library/react";

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

  const onGavaClick = async () => {
    const sendData = {
      expertId: 1688588271,  // id мое
      info: {
        name: 'Marina',
        position: 'Marinova',
        experience: "test experience",
        learnDescription: 'test',
        telegram: '',
        instagram: '',
        twitter: '',
        webSite: '',
        address: '0x4cE1F872FC453C0C7f23eD43D1279f426F45Fa42'.toLowerCase()
      }
    }
    api.post(APIRoutes.sendExpert, sendData, {

      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
      }
    }).then(resp => console.log(resp))
  }

  return (
    <div>

      {/*<button onClick={onGavaClick}>Отправь Акутагаву</button>*/}

       <MobileModal/>
      <ExpertCongratulate/>
      <About/>
      {role !== 'expert' && isRegistered && isConnected && <CreateExpertBlock/>}
      <ExpertList/>
    </div>
  )
}

export default MainPage;
