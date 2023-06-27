import s from "./About.module.scss";
import icon1 from '../../../../assets/about-icon1.svg';
import icon2 from '../../../../assets/about-icon2.svg';
import icon3 from '../../../../assets/about-icon3.svg';
import {PRIZE_FUND} from "../../../../consts";
import {useSelector} from "react-redux";
import {selectExperts, selectRegisteredUsers} from "../../../../store/reducers/dataReducer";

const About = () => {

  const experts = useSelector(selectExperts);
  const verifiedUsers = useSelector(selectRegisteredUsers)

  let contributors = 0  // сумма контрибуторов
  let sumOfDonates = 0
    //
    // experts.forEach((oneExpert)=>{
    //   contributors += oneExpert.events.donates.length  //
    //   const donatesSum = oneExpert.events.donates.reduce((sum, elem) => {
    //     return sum + +(elem._revardsAmount/10**18).toFixed(2)
    //   }, 0)
    //   sumOfDonates += donatesSum
    // })


  return (
    <div className="container">
      <h1 className={s.mainTitle}>Quadratic funding #1 for experts</h1>
      <p className={s.aboutText}>We help experts attract donations and first learners for future training courses!</p>
      <ul className={s.aboutFeatures}>
        <li className={s.aboutFeaturesItem}>
          {/*<div className={s.featureValue}>${(sumOfDonates).toLocaleString('en')}</div>*/}
          <div className={s.featureValue}>{(experts? experts.length : null)}</div>
          <div className={s.featureName}>
            {/*<img className={s.featureImage} src={icon1} alt="feature icon"/>*/}
            <img className={s.featureImage} src={icon2} alt="feature icon"/>
            {/*<span>Donations</span>*/}
            <span>Experts</span>
          </div>
        </li>
        <li className={s.aboutFeaturesItem}>
          {/*<div className={s.featureValue}>{contributors}</div>*/}
          <div className={s.featureValue}>{verifiedUsers ? verifiedUsers.length: null}</div>
          <div className={s.featureName}>
            <img className={s.featureImage} src={icon2} alt="feature icon"/>
            {/*<span>Contributors</span>*/}
            <span>Verified users</span>
          </div>
        </li>
        <li className={s.aboutFeaturesItem}>
          <div className={s.featureValue}>{PRIZE_FUND}.000 $EDU3</div>
          <div className={s.featureName}>
            <img className={s.featureImage} src={icon3} alt="feature icon"/>
            <span>Prizepool</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default About;
