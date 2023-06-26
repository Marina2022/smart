import s from './ConnectBtns.module.scss';
import {useSelector} from "react-redux";
import {selectDonateInputValue} from "../../store/reducers/dataReducer";
import {useContractWrite, useWaitForTransaction} from "wagmi";
import {CONTRACT_ADDRESS, MainContract_abi} from "../../consts";
import {useState} from "react";

const ConfirmPaymentBtn = ({step, setStep, expertId, setIsExpertVoted}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const donateInputValue = useSelector(selectDonateInputValue)

  const {
    data: DonateData,
    isLoading: isLoadDonate,
    isSuccess: isSuccessDonate,
    write: donateInUsdt
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MainContract_abi,
    functionName: 'donateInUSDT',
    args: [expertId, donateInputValue * 10 ** 18],
    // onSuccess(data) {

    //   // Это надо в useWaitForTransaction перенести, чтобы происходило это все, когда транзакция уже пройдет
    //   // отсюда
    //   setStep(3)
    //   setIsExpertVoted(true)
    //   setIsSubmitting(false)
    //   // досюда

    // },
    // onError(error) {
    //   console.log('error=',error)
    //   setIsSubmitting(false)
    //   alert(error)
    // }
  })
  const waitForDonate = useWaitForTransaction({
    hash: DonateData?.hash,
    onSuccess(data) {

      // Это надо в useWaitForTransaction перенести, чтобы происходило это все, когда транзакция уже пройдет
      // отсюда
      setStep(3)
      setIsExpertVoted(true)
      setIsSubmitting(false)
      // досюда

    },
    onError(error) {
      console.log('error=',error)
      setIsSubmitting(false)
      alert(error)
    }
  })

  const onConfirmPaymentClick = () => {   // обработчик клика по кнопке Confirm
    donateInUsdt()
    setIsSubmitting(true)
  }

  return (
    <button className={s.connectBtn} disabled={step === 1 || isSubmitting} onClick={onConfirmPaymentClick}>
      {isSubmitting ? 'Wait...' : 'Confirm'}</button>
  );
};

export default ConfirmPaymentBtn;
