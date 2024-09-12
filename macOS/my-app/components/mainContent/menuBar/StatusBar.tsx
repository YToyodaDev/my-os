import styles from './StatusBar.module.css';

import { useClock } from '@/components/mainContent/hooks/useClock';
import ApplicationMenu from '@/components/mainContent/menuBar/ApplicationMenu';
import {
  statusBarData,
  StatusBarItem,
} from '@/components/mainContent/utils/data';

const StatusBar = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <ApplicationMenu />
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
export default StatusBar;
