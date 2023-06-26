import s from './ConnectBtns.module.scss';
import {useSelector} from "react-redux";
import {selectDonateInputValue} from "../../store/reducers/dataReducer";
import {useContractWrite} from "wagmi";
import {CONTRACT_ADDRESS, USDT_abi, USDT_ADDRESS} from "../../consts";
import {toast} from "react-toastify";
import {useState} from "react";

const ApprovePaymentBtn = ({step, setStep, expertId}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const donateInputValue = useSelector(selectDonateInputValue)

  const {
    data: approveData,
    isLoading: isLoadApprove,
    isSuccess: isSuccessApprove,
    write: approveUsdt
  } = useContractWrite({
    address: USDT_ADDRESS,
    abi: USDT_abi,
    functionName: 'approve',
    args: [CONTRACT_ADDRESS, donateInputValue * 10 ** 18], // donateInputValue - сумма которую пользователь в инпут ввел
    onSuccess(data) {
      setStep(2)    // т.е. перейдет на след. шаг, если аппрув удался
      setIsSubmitting(false)
    },
    onError(error) {
      console.log(error)
      setIsSubmitting(false)
    }
  })

  const onApprovePayment = () => {  // обработчик клика на кнопку Approve
    if (donateInputValue === '' || Number(donateInputValue) < 1 ) {
      toast.warn('enter number greater than or equal to 1')
      return
    }
    approveUsdt()
    setIsSubmitting(true)
  }

  return (
    <button
      className={s.connectBtn} disabled={step === 2 || isSubmitting}
      onClick={onApprovePayment}
    >{isSubmitting ? 'Wait...' : 'Approve'}</button>
  );
};

export default ApprovePaymentBtn;
