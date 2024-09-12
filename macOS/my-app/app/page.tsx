'use client';
import { useState } from 'react';
import Dock from '../components/mainContent/dock/Dock';
import FolderContent from '../components/mainContent/folderContent/FolderContent';
import Folders from '../components/mainContent/folders/Folders';
import StatusBar from '../components/mainContent/menuBar/StatusBar';
import './App.css';

const App = () => {
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  const toggleAppleMenu = () => {
    setIsAppleMenuOpen(!isAppleMenuOpen);
  };

  const closeAppleMenu = () => {
    if (isAppleMenuOpen) {
      setIsAppleMenuOpen(false);
    }
  };

  const openFolderContent = () => {
    setIsFolderOpen(true);
  };

  const closeFolderContent = () => {
    setIsFolderOpen(false);
  };

  return (
    <>
      {/* <MultiLevelDropDown /> */}
      {/* <MaxWidthWrapper /> */}

      {/* <ResponsiveTypography /> */}
      <div className='wrapper'>
        {/* <MenuBar /> */}

        <div className='inner_wrapper' onClick={closeAppleMenu}>
          <StatusBar />
          <Folders openFolderContent={openFolderContent} />
          <FolderContent
            isFolderOpen={isFolderOpen}
            closeFolderContent={closeFolderContent}
          />
          {/* <AppleMenu isAppleMenuOpen={isAppleMenuOpen} /> */}
        </div>
        <Dock />
      </div>
    </>
  );
};
export default App;
