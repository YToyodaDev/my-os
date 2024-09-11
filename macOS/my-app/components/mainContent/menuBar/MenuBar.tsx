import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './StatusBar.module.css';

import { faApple } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MenuData,
  statusBarData,
  StatusBarItem,
} from '@/components/mainContent/utils/data';
import { useClock } from '@/components/mainContent/hooks/useClock';
import ApplicationMenu from '@/components/mainContent/menuBar/ApplicationMenu';
import AppleMenu from '@/components/mainContent/menuBar/AppleMenu';
import { useOutsideClick } from '@/components/mainContent/hooks/useOutsideClick';

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_inner_left}>
          <FontAwesomeIcon
            icon={faApple}
            onClick={() => setIsOpen(!isOpen)}
            className={styles.appleIcon}
          />
          <AppleMenu isAppleMenuOpen={isOpen} />
          {/* <Image
            onClick={toggleAppleMenu}
            className={styles.appleIcon}
            src={apppleIcon}
            alt='apple_icon'
          /> */}

          <ApplicationMenu />
        </div>
        <div className={styles.wrapper_inner_right}>
          <RenderStatusBarItems items={statusBarData} />
        </div>
      </div>
    </>
  );
};
const RenderStatusBarItems = ({ items }: { items: StatusBarItem[] }) => {
  const currentTime = useClock();

  return (
    <ul className={styles.right_ul}>
      {items.map((item) => (
        <li key={item.id}>
          <img src={item.url} alt={item.name} />
        </li>
      ))}
      <li>
        <span className={styles.date}>{currentTime}</span>{' '}
        {/* Assuming currentTime is a state or prop */}
      </li>
    </ul>
  );
};
export default MenuBar;
