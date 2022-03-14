import Link from 'next/link';
import { useScrollTrigger } from '@mui/material';
import classNames from 'classnames';
import styles from './Navbar.module.scss';
import { handleMoveToId } from 'utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Menu = {
  text: string;
  onClick?: () => void;
};

export type NavbarProps = {
  dark?: boolean;
  setOpen?: () => void;
  logoColor?: string;
};

const Navbar: React.FC<NavbarProps> = ({ dark = true, setOpen, logoColor = 'white' }: NavbarProps) => {
  const router = useRouter();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80,
  });

  const menus: Menu[] = [
    {
      text: 'Solutions',
      onClick: () => router.push('/sponsor'),
    },
    {
      text: 'About us',
      onClick: () => handleAboutUsClick(),
    },
    {
      text: 'Careers',
      onClick: () => router.push('/career'),
    },
    {
      text: 'Contact Us',
      onClick: () => handleButtonClick(),
    },
    {
      text: 'Get Started',
    },
  ];

  const handleAboutUsClick = () => {
    router.pathname !== '/' && router.push('/?about=true');
    router.pathname === '/' && handleMoveToId('about');
  };

  const handleButtonClick = () => {
    router.pathname !== '/' && router.push('/?cta=true');
    router.pathname === '/' && handleMoveToId();
  };

  const [activeLogoColor, setActiveLogoColor] = useState('');

  useEffect(() => {
    setActiveLogoColor(trigger ? 'white' : logoColor);
  }, [trigger]);

  return (
    <nav
      className={classNames(`${styles.navbar} padding-wrapper`, {
        [styles.active]: trigger || dark,
      })}>
      <div className={styles['navbar-content']}>
        <div className={styles['navbar-content-box']}>
          <Link href="/">
            <a>
              <img
                src={`/logo-${activeLogoColor}.png`}
                alt="Pillar Markets"
                width={120}
                height={60}
                className={styles.logo}
              />
            </a>
          </Link>
        </div>
        {menus &&
          menus.map((menu, idx) => {
            const linkClass = idx !== menus.length - 1 ? (trigger || dark ? 'link-trigger' : 'link') : '';
            return (
              <div className={styles['navbar-content-box']} key={idx}>
                <button
                  className={`ui-button primary ${linkClass} ${styles['get-started']}`}
                  onClick={menu.onClick ?? handleButtonClick}>
                  {menu.text}
                </button>
              </div>
            );
          })}
      </div>
      {/* Disable sidebar menu for now - KR Dec 29, 2021
        <div className={styles['sidebar-trigger']} onClick={setOpen}>
          <MenuIcon />
        </div> */}
    </nav>
  );
};

export default Navbar;
