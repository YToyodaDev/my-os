import { Fragment } from 'react';
import styles from './AppleMenu.module.css';
import React from 'react';
import { MenuData, appleMenuItems } from '../utils/data';
import Divider from '@/components/mainContent/ui/Divider';

const renderMenuItems = (items: MenuData[]) => (
  <ul className={styles.ul}>
    {items.map((item) =>
      item.name === 'hr' ? (
        <Divider key={item.id} />
      ) : (
        <React.Fragment key={item.id}>
          <li className={styles.li}>
            <p className={styles.p}>{item.name}</p>
          </li>
          {item.children && renderMenuItems(item.children)}
          <div className={styles.border}></div>
        </React.Fragment>
      )
    )}
  </ul>
);

// Component to render the menu
const AppleMenu: React.FC<{ isAppleMenuOpen: boolean }> = ({
  isAppleMenuOpen,
}) => (
  <div
    className={styles.wrapper}
    style={{ visibility: isAppleMenuOpen ? 'visible' : 'hidden' }}
  >
    {renderMenuItems(appleMenuItems)}
  </div>
);

export default AppleMenu;
