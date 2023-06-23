import s from './ExpertDonations.module.scss'
import cn from 'classnames';
import DonateButton from "../DonateButton/DonateButton";

const ExpertDonations = ({classname, donations, bonus}) => {
  return (
    <div className={cn(s.expertDonations, classname)}>
      <div className={s.expertDonationsDonates}>
        <div className={s.expertDonationsValue}>${donations}</div>
        <div>Donations</div>
      </div>
      <div>
        <div className={s.expertDonationsValue}>{bonus}</div>
        <div>QF Bonus</div>
      </div>
    </div>
  );
};

export default ExpertDonations;
