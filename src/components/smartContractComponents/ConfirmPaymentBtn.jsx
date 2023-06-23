import s from './ConnectBtns.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectDonateInputValue} from "../../store/reducers/dataReducer";
import {useContractWrite} from "wagmi";
import {CONTRACT_ADDRESS, MainContract_abi} from "../../consts";
import {useState} from "react";

const ConfirmPaymentBtn = ({step, setStep, expertId, setIsExpertVoted}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const donateInputValue = useSelector(selectDonateInputValue)
  const dispatch = useDispatch()

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
    onSuccess(data) {
      // Это надо в useWaitForTransaction положить, когда транзакция пройдет:
      // отсюда
      setStep(3)
      setIsExpertVoted(true)
      setIsSubmitting(false)
      window.location.reload()
      // досюда

    },
    onError(error) {
      console.log('error=',error)
      setIsSubmitting(false)
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
