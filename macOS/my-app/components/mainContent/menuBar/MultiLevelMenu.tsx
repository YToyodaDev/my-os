// import styles from './AppleMenu.module.css';
// import React from 'react';
// import styles2 from './mutliLevelMenu.module.css';

// import { MenuData } from '../utils/data';
// import Divider from '@/components/mainContent/ui/Divider';

// type MultiLevelMenuProps = {
//   items: MenuData[];
//   depth?: number;
// };

// function MultiLevelMenu({ items, depth = 0 }: MultiLevelMenuProps) {
//   return (
//     <ul
//       className={` ${
//         depth === 0
//           ? `menu-primary`
//           : depth === 1
//           ? `${styles2.submenuPrimary}`
//           : 'submenu-nested'
//       }`}
//     >
//       {items.map((item) =>
//         item.name === 'hr' ? (
//           <Divider key={item.id} />
//         ) : (
//           <React.Fragment key={item.id}>
//             <li className={styles2.li}>
//               <p className={styles2.p}>{item.name}</p>
//             </li>
//             {item.children && (
//               <MultiLevelMenu items={item.children} depth={depth + 1} />
//             )}
//             <div className={styles.border}></div>
//           </React.Fragment>
//         )
//       )}
//     </ul>
//   );
// }

// export default MultiLevelMenu;
