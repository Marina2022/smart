import s from './Burger.module.scss';
import menuIcon from '../../../../assets/burger-menu.svg'
import {Link} from "react-router-dom";
import {useRef, useState} from "react";


const Burger = () => {

  const [isMenuShown, setIsMenuShown] = useState(false)

  const onBurgerClick = () => {
    document.body.style.overflow = "hidden";
    setIsMenuShown((prev) => !prev)
    if (!isMenuShown) {   // открываем меню
      const onDocClick = (e) => {
        if (e.target === menuBtn.current) return
        const dontHideModal = menuRef.current && e.composedPath().includes(menuRef.current) && e.target !== LinkRef.current
        if (!dontHideModal) {
          setIsMenuShown(false)
          document.removeEventListener('click', onDocClick)
          document.body.style.overflow = "auto";
        }
      }

      document.addEventListener('click', onDocClick)
    }

  }

  const menuRef = useRef(null)
  const menuBtn = useRef(null)
  const LinkRef = useRef(null)

  return (
    <div className={s.burgerMenu}>
      <img src={menuIcon} alt="mobile menu" onClick={onBurgerClick} ref={menuBtn}/>

      {isMenuShown && <div className={s.menu} ref={menuRef}>
        <Link to="/" className={s.headerLink_active} ref={LinkRef}>Donation</Link>
        <a href="https://docs.cyberbox.art/" className={s.headerLink}>About</a>
      </div>}
    </div>
  );
};

export default Burger;
