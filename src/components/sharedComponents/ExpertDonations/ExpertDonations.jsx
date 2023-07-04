import s from './ExpertDonations.module.scss'
import cn from 'classnames';
import DonateButton from "../DonateButton/DonateButton";
import ClaimButton from "../../smartContractComponents/ClaimButton/ClaimButton";

const ExpertDonations = ({classname, donations, bonus, showClaimButton}) => {
  return (
    <div className={cn(s.mainWrapper, classname)}>
      <div className={cn(s.expertDonations)}>
        <div className={s.expertDonationsDonates}>
          <div className={s.expertDonationsValue}>${Math.trunc(donations)}</div>
          <div className={s.expertDonationsText}>Donations</div>
        </div>
        <div className={s.line}></div>
        <div>
          <div className={s.expertDonationsValue}>{bonus}</div>
          <div className={s.expertDonationsText}>QF Bonus</div>
        </div>
      </div>
      {/*{showClaimButton && <ClaimButton/>}*/}
    </div>
  );
};

export default ExpertDonations;
