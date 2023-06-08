import cn from 'classnames/bind';
import s from './ShareProfile.module.scss'
import shareIcon from '../../../assets/share-icon.svg'
import {useState} from "react";
import {useClipboard} from "use-clipboard-copy";
import {useLocation, useParams} from "react-router-dom";

const ShareProfile = ({classname, expertId}) => {

  let url
  const path = useLocation().pathname
  if (path.includes('expertProfile')) {
    url = window.location.href
  } else {
    url = `${window.location.href}expertProfile/${expertId}`
  }

  const showTooltip = () => {
    setIsTooltipShown(true);
    clipboard.copy(url);

    setTimeout(() => {
      setIsTooltipShown(false)
    }, 3000)
  }

  const clipboard = useClipboard();

  const [isTooltipShown, setIsTooltipShown] = useState(false);
  return (
    <div className={s.shareProfile}>
      <div className={cn(classname, s.wrapper)} onClick={() => showTooltip()}>
        Share profile
        <img className={s.icon} src={shareIcon} alt="share profile icon"/>
      </div>
      {
        isTooltipShown && <div className={s.tooltip}>Link copied!</div>
      }
    </div>

  );
};

export default ShareProfile;

