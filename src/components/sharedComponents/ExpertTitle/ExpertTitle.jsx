import React from 'react';
import s from './ExpertTitle.module.scss';
import tg from '../../../assets/social-tg.svg';
import twitter from '../../../assets/social-twitter.svg';
import web from '../../../assets/social-web.svg';

const makeNormalUrl = (url) => {
  if (url.startsWith('https://') || url.startsWith('http://')) return url
  return 'https://' + url
}

const ExpertTitle = ({expert}) => {

  return (
    <div>
      <div className={s.name}>{expert.name} {expert.position}</div>
      <ul className={s.socials}>
        {expert.telegram && <li>
          <a href={makeNormalUrl(expert.telegram)} target="_blank">
            <img src={tg} alt="telegram icon"/>
          </a>
        </li>}

        {expert.twitter &&  <li>
          <a href={makeNormalUrl(expert.twitter)} target="_blank">
            <img src={twitter} alt="twitter icon"/>
          </a>
        </li>}

        {expert.webSite && <li>
          <a href={makeNormalUrl(expert.webSite)} target="_blank">
            <img src={web} alt="web icon"/>
          </a>
        </li>}

        {expert.instagram && <li>
          <a href={makeNormalUrl(expert.instagram)} target="_blank">
              <svg className={s.insta} width="20" height="20" viewBox="0 0 20 20" fill="#36B3B5" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7578 10C11.7578 10.9708 10.9708 11.7578 10 11.7578C9.02924 11.7578 8.24219 10.9708 8.24219 10C8.24219 9.02924 9.02924 8.24219 10 8.24219C10.9708 8.24219 11.7578 9.02924 11.7578 10Z" fill="##36B3B5"/>
              <path d="M12.9688 4.6875H7.03125C5.73883 4.6875 4.6875 5.73883 4.6875 7.03125V12.9688C4.6875 14.2612 5.73883 15.3125 7.03125 15.3125H12.9688C14.2612 15.3125 15.3125 14.2612 15.3125 12.9688V7.03125C15.3125 5.73883 14.2612 4.6875 12.9688 4.6875ZM10 12.9297C8.38455 12.9297 7.07031 11.6154 7.07031 10C7.07031 8.38455 8.38455 7.07031 10 7.07031C11.6154 7.07031 12.9297 8.38455 12.9297 10C12.9297 11.6154 11.6154 12.9297 10 12.9297ZM13.3594 7.22656C13.0357 7.22656 12.7734 6.96426 12.7734 6.64062C12.7734 6.31699 13.0357 6.05469 13.3594 6.05469C13.683 6.05469 13.9453 6.31699 13.9453 6.64062C13.9453 6.96426 13.683 7.22656 13.3594 7.22656Z" fill="##36B3B5"/>
              <path d="M14.7266 0H5.27344C2.36572 0 0 2.36572 0 5.27344V14.7266C0 17.6343 2.36572 20 5.27344 20H14.7266C17.6343 20 20 17.6343 20 14.7266V5.27344C20 2.36572 17.6343 0 14.7266 0ZM16.4844 12.9688C16.4844 14.9072 14.9072 16.4844 12.9688 16.4844H7.03125C5.09277 16.4844 3.51562 14.9072 3.51562 12.9688V7.03125C3.51562 5.09277 5.09277 3.51562 7.03125 3.51562H12.9688C14.9072 3.51562 16.4844 5.09277 16.4844 7.03125V12.9688Z" fill="##36B3B5"/>
            </svg>


            {/*<img src={insta} alt="instagram icon"/>*/}
          </a>
        </li>}
      </ul>
    </div>
  )




};

export default ExpertTitle;
