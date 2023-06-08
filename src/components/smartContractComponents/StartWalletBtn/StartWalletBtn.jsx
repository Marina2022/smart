import s from './StartWalletBtn.module.scss'
import {Web3Button} from '@web3modal/react'
import {useSelector} from "react-redux";
import {selectWalletType} from "../../../store/reducers/dataReducer";


const StartWalletBtn = ({setStep}) => {

  // Обработчик нажатия на кнопку Подключись - нужно все данные, которые придут во время подключения, сложить в редакс.. или они после нажатия кнопки Approve придут или  Confirm..

  const onStartBtnClick = () => {
    setStep(3);
  }

  let walletType = useSelector(selectWalletType)

  return (
    walletType === "WalletConnect" ?
      <div className={s.web3BtnWrapper}><Web3Button/></div> :
      <button onClick={onStartBtnClick} className={s.connectBtn}>Подключись!</button>
  )
}

export default StartWalletBtn;
