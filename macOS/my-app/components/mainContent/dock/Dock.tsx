import { useState } from 'react';
import styles from './dock.module.css';

import dockData from './dockItemData';

const MenuBar = () => {
  const [menuBarOpen, setMenuBarOpen] = useState(false);
  const [clickedMenuItem, setClickedMenuItem] = useState(0);

  const handleMouseEnter = () => {
    setMenuBarOpen(!menuBarOpen);
  };

  const handleMouseLeave = () => {
    setMenuBarOpen(!menuBarOpen);
  };

  const onMenuChange = (id: number) => {
    setClickedMenuItem(id);

    setTimeout(() => {
      setClickedMenuItem(0);
    }, 7000);
  };

  if (!menuBarOpen) {
    return (
      <div
        className={styles.wrapperHidden}
        onMouseEnter={handleMouseEnter}
      ></div>
    );
  }

  return (
    <>
      <div className={styles.wrapper} onMouseLeave={handleMouseLeave}>
        <ul className={styles.ul}>
          {dockData.map((data) => (
            <li
              style={{ textAlign: 'center' }}
              key={data.id}
              id={String(data.id)}
              onClick={() => onMenuChange(data.id)}
            >
              <img
                className={
                  clickedMenuItem === data.id ? styles.bounceAnimation : ''
                }
                src={data.image}
                alt='image_alt'
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MenuBar;
