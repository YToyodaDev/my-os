import './styles.css';

function page() {
  return (
    <section className='card-container'>
      <div className='box'>
        <div className='ball-1'></div>
        <div className='ball-2'></div>
        <div className='ball-3'></div>

        <nav>
          <h3 className='logo'>
            <span>!</span>Logo
          </h3>
          <ul>
            <li>
              <a href=''>Home</a>
            </li>
            <li>
              <a href=''>About</a>
            </li>
            <li>
              <a href=''>Service</a>
            </li>
            <li>
              <a href=''>Contact</a>
            </li>
          </ul>
        </nav>
        <div className='contains'>
          <div className='section-1'>
            <h1>Welcome</h1>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <div className='button'>
              <a href=''>More Info</a>
              <a href=''>Contact Us</a>
            </div>
          </div>
          <div className='section-2'>
            <img src='/practice/future-01.png' alt='name' />
          </div>
          <div className='section-3'></div>
        </div>
      </div>
    </section>
  );
}

export default page;
