import Header from "../Header/Header";
import MainPage from "../../pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import EditExpertProfile from "../../pages/EditExpertProfile/EditExpertProfile";
import ExpertProfile from "../../pages/ExpertProfile/ExpertProfile";
import UserProfile from "../../pages/UserProfile/UserProfile";
import {polygonMumbai, polygon} from 'wagmi/chains';
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSwitchNetwork
} from "wagmi";
import {useWaitForTransaction,} from 'wagmi'
import {useEffect, useState} from "react";
import {
  selectConnectIsShown, selectIsUserRegistered,
  setConnectIsShown,
  setIsUserRegistered,
  setWallet
} from "../../../store/reducers/dataReducer";
import {ethers} from "ethers";
import {useDispatch, useSelector} from "react-redux";
import {CONTRACT_ADDRESS, MainContract_abi, USDT_ADDRESS, USDT_abi} from "../../../consts";
import VerifyWallet from "./VerifyWallet/VerifyWallet";
import Congratulations from "./Congratulations/Congratulations";
import Admin from "../../pages/Admin/Admin";


const PageWrapper = () => {

  /**
  *   const switchToPolygon = useSwitchNetwork({
        chainId: polygon.id
      })
  *         <button
            onClick={() => switchToPolygon?}
            >
  */
  const [congratModalIsShown, showCongratsModal] = useState(false)
  const {address, isConnected} = useAccount()

  const {data: nativeBalance, isError, isLoading} = useBalance({
    address: address,
  })

  const connectModalIsShown = useSelector(selectConnectIsShown)
  const dispatch = useDispatch()

  const {switchNetwork} = useSwitchNetwork()

  const {config: registerConfig, error: errRegister} = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MainContract_abi,
    functionName: 'register',
  });

  const {data: regData, write: register} = useContractWrite(registerConfig)
  const waitForTransaction = useWaitForTransaction({
    hash: regData?.hash,
    onSuccess(data) {
      dispatch(setIsUserRegistered(true)) //кнопочка исчезает
      showCongratsModal(true)  // появляется модалка с поздравлениями
    },
    onError(error) {
      console.log('Error', error)
    },
  })

  const isUserRegisteredFromRedux = useSelector(selectIsUserRegistered) // берем из редакса значение - зареган или нет

  const {isRegistered} = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: MainContract_abi,
    functionName: 'isUserRegistered',
    args: [address],
    onError(error) {
      console.log('Ошибка', error)
    },
    onSuccess(data) {
      dispatch(setIsUserRegistered(data))
    },
  })

  const {data: usdtBalance} = useContractRead({
    address: USDT_ADDRESS,
    abi: USDT_abi,
    functionName: 'balanceOf',
    args: [address],
    onError(error) {
      console.log('Ошибка', error)
    },
    onSuccess(data) {
      console.log('Usdt balance:', data)
    },
  })

  useEffect(() => {
      console.log('isConnected', isConnected)
      if (isConnected) {
        if (switchNetwork) switchNetwork(80001)
        if (isRegistered) isRegistered()  // вызываем функцию (если хук useContractRead успел отработать и функция есть)

        if (typeof nativeBalance !== "undefined" && typeof usdtBalance !== "undefined") {  // почему-то ошибка вылетает иногда, что data - undefined.

          dispatch(setWallet({
            number: address,
            balance: ethers.formatUnits(nativeBalance.value, nativeBalance.decimals).slice(0, -15),
            USDT_balance: ethers.formatUnits(usdtBalance, 18)//.slice(0, -11),
          }))
        }
        if (connectModalIsShown) {
          dispatch(setConnectIsShown(false));
        }
      }

    }, [isConnected, nativeBalance]
  )

  return (
    <>
      {/*Вместо кнопки показываем модалку:*/}
      {!isUserRegisteredFromRedux && isConnected &&
        <VerifyWallet onVerifyClick={() => register()}/>
      }

      {
      congratModalIsShown && <Congratulations  showCongratsModal={showCongratsModal}/>
      }

      <Header/>
      <Routes>
        <Route path={'/'} element={<MainPage/>}/>
        <Route path={'/admin'} element={<Admin/>}/>
        <Route path={'/edit'} element={<EditExpertProfile/>}/>
        <Route path={'/expertProfile/:id'} element={<ExpertProfile/>}/>
        <Route path={'/profile'} element={<UserProfile/>}/>
        <Route path={'*'}
               element={<div style={{'textAlign': 'center', 'marginTop': 100}}>Страница не найдена</div>}/>
      </Routes>
    </>
  )
}

export default PageWrapper;
