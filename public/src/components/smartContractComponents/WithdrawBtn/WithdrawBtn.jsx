import s from "./WithdrawBtn.module.scss";
import cn from "classnames";

const WithdrawBtn = ({disabled, classname}) => {
  return (
    <button className={cn(s.withDrawBtn, classname)} disabled={disabled}>Withdraw</button>
  );
};

export default WithdrawBtn;
