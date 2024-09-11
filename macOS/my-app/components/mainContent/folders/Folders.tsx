import Link from 'next/link';
import styles from './Folders.module.css';
import { folders } from '@/components/mainContent/utils/data';

const Folders = ({ openFolderContent }: { openFolderContent: () => void }) => {
  return (
    <div className={styles.wrapper}>
      {folders.map((folder, index) => (
        <div key={index} className={styles.folderWrapper}>
          <Link href={folder.link} className={`mt-0  ${styles.folderText}`}>
            <img
              className={styles.folderImage}
              onClick={() => openFolderContent()}
              src={folder.src}
              alt={folder.alt}
            />
            <span className={styles.folderTextSpan}>{folder.text}</span>
          </Link>
        </div>
      ))}
      <div className={styles.marginBottom20}></div>
    </div>
  );
};

export default Folders;
