'use client';
import { useCallback, useState } from 'react';

function Header() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isSubmenuVisible, setIsSubmenuVisible] = useState<boolean>(false);

  const handleItemClick = useCallback(
    (id: string) => {
      setSelectedItem((prev) => (prev === id ? null : id));
      setIsSubmenuVisible(
        (prev) => prev === (id === selectedItem ? false : true)
      );
    },

    [selectedItem]
  );

  //   const handleBodyClick = useCallback((e: React.MouseEvent) => {
  //     if (!(e.target as HTMLElement).closest('header')) {
  //       setSelectedItem(null);
  //       setIsSubmenuVisible(false);
  //     }
  //   }, []);
  return (
    <header className='header'>
      <ul className='left'>
        <li
          className={selectedItem === 'apple' ? 'selected' : ''}
          onClick={() => handleItemClick('apple')}
        >
          <i className='fa fa-apple'></i>
          <div
            className={`submenu ${
              isSubmenuVisible && selectedItem === 'apple' ? 'visible' : ''
            }`}
          >
            <ul>
              <li>About This Mac</li>
              <li>Software Update...</li>
              <li>Mac OS X Software...</li>
              <li className='spacer'></li>
              <li>System Preferences...</li>
              <li className='hasSubMenu'>Dock</li>
              <li className='spacer'></li>
              <li className='hasSubMenu'>Recent Items</li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x2325;&#x2318;&#x238B;'>
                Force Quit...
              </li>
              <li className='spacer'></li>
              <li>Sleep</li>
              <li>Restart...</li>
              <li>Shut Down...</li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x21E7;&#x2318;Q'>
                Log Out Jack Harner...
              </li>
            </ul>
          </div>
        </li>
        <li
          className={selectedItem === 'finder' ? 'selected' : ''}
          onClick={() => handleItemClick('finder')}
        >
          <strong>Finder</strong>
          <div
            className={`submenu ${
              isSubmenuVisible && selectedItem === 'finder' ? 'visible' : ''
            }`}
          >
            <ul>
              <li>About Finder</li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x2318;,'>
                Preferences...
              </li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x21E7;&#x2318;&#x232b;'>
                Empty Trash...
              </li>

              <li>Secure Empty Trash...</li>
              <li className='spacer'></li>
              <li className='hasSubMenu'>Services</li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x2318;H'>
                Hide Finder
              </li>

              <li className='shortcut' data-shortcut='&#x2325;&#x2318;H'>
                Hide Others
              </li>

              <li className='noChoice'>Show All</li>
            </ul>
          </div>
        </li>
        <li>
          File
          <div className='submenu'>
            <ul>
              <li className='shortcut' data-shortcut='&#x2318;N'>
                New Finder Window
              </li>
              <li className='shortcut' data-shortcut='&#x21E7;&#x2318;N'>
                New Folder
              </li>
              <li
                className='shortcut noChoice'
                data-shortcut='&#x21E7;&#x2318;N'
              >
                New Folder With Selection
              </li>
              <li className='shortcut' data-shortcut='&#x2325;&#x2318;N'>
                New Smart Folder
              </li>
              <li>New Burn Folder</li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;O'>
                Open
              </li>
              <li className='hasSubMenu noChoice'>Open With</li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;P'>
                Print
              </li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;W'>
                Close Window
              </li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x2318;I'>
                Get Info
              </li>
              <li className='spacer'></li>
              <li className='noChoice'>Compress</li>
              <li className='spacer'></li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;D'>
                Duplicate
              </li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;L'>
                Make Alias
              </li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;Y'>
                Quick Look
              </li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;R'>
                Show Original
              </li>
              <li
                className='shortcut noChoice'
                data-shortcut='&#x21E7;&#x2318;P'
              >
                Add to Dock
              </li>
              <li className='spacer'></li>
              <li
                className='shortcut noChoice'
                data-shortcut='&#x2318;&#x232b;'
              >
                Move to Trash
              </li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;E'>
                Eject
              </li>
              <li>Burn Desktop to Disc...</li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x2318;F'>
                Find
              </li>
            </ul>
          </div>
        </li>
        <li>
          Edit
          <div className='submenu'>
            <ul>
              <li className='noChoice shortcut' data-shortcut='&#x2318;Z'>
                Undo
              </li>
              <li
                className='noChoice shortcut'
                data-shortcut='&#x21E7;&#x2318;Z'
              >
                Redo
              </li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x2318;X'>
                Cut
              </li>
              <li className='shortcut' data-shortcut='&#x2318;C'>
                Copy
              </li>
              <li className='shortcut' data-shortcut='&#x2318;V'>
                Paste
              </li>
              <li className='shortcut' data-shortcut='&#x2318;A'>
                Select All
              </li>
              <li className='spacer'></li>
              <li>Show Clipboard</li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='fn fn'>
                Start Dictation
              </li>
              <li>Special Characters...</li>
            </ul>
          </div>
        </li>
        <li>
          View
          <div className='submenu'>
            <ul>
              <li className='noChoice shortcut' data-shortcut='&#x2318;1'>
                as Icons
              </li>
              <li className='noChoice shortcut' data-shortcut='&#x2318;2'>
                as List
              </li>
              <li className='noChoice shortcut' data-shortcut='&#x2318;3'>
                as Columns
              </li>
              <li className='noChoice shortcut' data-shortcut='&#x2318;4'>
                as Cover Flow
              </li>
              <li className='spacer'></li>
              <li className='noChoice'>Clean Up Selection</li>
              <li className='hasSubMenu'>Clean Up By</li>
              <li className='hasSubMenu'>Sort By</li>
              <li className='spacer'></li>
              <li className='noChoice'>Hide Path Bar</li>
              <li className='noChoice shortcut' data-shortcut='&#x2318;/'>
                Hide Status Bar
              </li>
              <li
                className='noChoice shortcut'
                data-shortcut='&#x2325;&#x2318;S'
              >
                Hide Sidebar
              </li>
              <li className='spacer'></li>
              <li
                className='noChoice shortcut'
                data-shortcut='&#x2325;&#x2318;T'
              >
                Toolbar
              </li>
              <li className='noChoice'>Customize Toolbar...</li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x2318;J'>
                Show View Options
              </li>
            </ul>
          </div>
        </li>
        <li>
          Go
          <div className='submenu'>
            <ul>
              <li className='shortcut noChoice' data-shortcut='&#x2318;['>
                Back
              </li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;]'>
                Forward
              </li>
              <li className='shortcut' data-shortcut='&#x2318;&uarr;'>
                Enclosing Folder
              </li>
              <li className='spacer'></li>
              <li className='hasSubMenu'>Recent Folders</li>
              <li className='spacer'></li>
              <li className='shortcut' data-shortcut='&#x21E7;&#x2318;G'>
                Go to Folder...
              </li>
              <li className='shortcut' data-shortcut='&#x2318;K'>
                Connect to Server...
              </li>
            </ul>
          </div>
        </li>
        <li>
          Window
          <div className='submenu'>
            <ul>
              <li className='shortcut noChoice' data-shortcut='&#x2318;M'>
                Minimize
              </li>
              <li className='noChoice'>Zoom</li>
              <li className='shortcut noChoice' data-shortcut='&#x2318;`'>
                Cycle Through Windows
              </li>
              <li className='spacer'></li>
              <li className='noChoice'>Bring All to Front</li>
            </ul>
          </div>
        </li>
        <li>
          Help
          <div className='submenu'>
            <ul>
              <li className='search'>
                Search
                <input id='search' type='text'></input>
              </li>
              <li>Help Center</li>
            </ul>
          </div>
        </li>
      </ul>
      <ul className='right'>
        <li>
          <a href='https://www.codepen.io/jackharner' target='_blank'>
            <i className='fa fa-codepen'></i>
          </a>
        </li>
        <li>
          <a href='https://www.twitter.com/jackharner' target='_blank'>
            <i className='fa fa-twitter'></i>
          </a>
        </li>
        <li id='volume-icon-li'>
          <i className='fa fa-volume-off' id='volume-icon'></i>
          <div className='submenu'>
            <ul className='volume'>
              <li className='volume'>
                <div>
                  <input type='range' min='0' max='100' id='volume' />
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <span id='clock'></span>
          <div className='submenu'>
            <ul>
              <li id='date' className='noChoice'></li>
              <li className='spacer'></li>
              <li>View as Analog</li>
              <li>View as Digital</li>
              <li className='spacer'></li>
              <li>Open Date & Time Preferences...</li>
            </ul>
          </div>
        </li>
        <li>
          Jack Harner
          <div className='submenu'>
            <ul>
              <li>
                <a href='https://jackharner.com/' target='_blank'>
                  Website
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <i className='fa fa-search'></i>
        </li>
        <li>
          <i className='fa fa-bars'></i>
        </li>
      </ul>
    </header>
  );
}

export default Header;
