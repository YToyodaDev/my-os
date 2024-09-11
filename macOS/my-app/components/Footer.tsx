function Footer() {
  return (
    <footer className='footer'>
      <ul>
        <li data-title='Finder'>
          <img
            data-title='Finder'
            src='https://assets.codepen.io/237800/finder.png'
          />
        </li>
        <li data-title='Chrome'>
          <img src='https://assets.codepen.io/237800/Google_Chrome_icon_2011.png' />
        </li>
        <li data-title='iTunes' className='closed' id='iTunes'>
          <img src='https://assets.codepen.io/237800/iTunes-logo.svg' />
        </li>
        <li data-title='Photoshop'>
          <img src='https://assets.codepen.io/237800/Adobe_Photoshop_CS6_icon.png' />
        </li>
        <li data-title='Dreamweaver'>
          <img src='https://assets.codepen.io/237800/Adobe_Dreamweaver_CS6_Icon.png' />
        </li>
        <li data-title='System&nbsp;Preferences'>
          <img src='https://assets.codepen.io/237800/20140418_System_Preferences.png' />
        </li>
        <li data-title='Trash'>
          <img src='https://assets.codepen.io/237800/512-TrashIcon-macosx1.png' />
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
