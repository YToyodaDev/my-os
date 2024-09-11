import Image from 'next/image';
import './styles.css';
import img from '@/assets/screenhot.png';

function TwelveColumnsGrid() {
  return (
    <>
      <header className='header-grid'>
        <h1>12 col Grid</h1>
        <nav>
          <a href='/'>Home</a>
          <a href='/'>About</a>
          <a href='/'>Contact</a>
        </nav>
      </header>
      <main className='header-grid main'>
        <Image className='image' alt='Person' src={img} />
        <div className='welcome'>
          <h2>Welcome</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eaque
            quibusdam necessitatibus, facilis nulla quam aliquid assumenda in
            saepe a, eveniet incidunt nostrum inventore, repellat officiis
            architecto. Delectus, rem omnis!
          </p>
        </div>
        <h2>Services</h2>
        <div className='card'>
          <h3>Hello</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            temporibus cum sed harum incidunt officiis facere ea? Quae, illum
            accusantium.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
            explicabo molestias quis quos aspernatur hic cupiditate unde
            mollitia possimus dolor?
          </p>
        </div>
        <div className='card'>
          <h3>Hello</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            temporibus cum sed harum incidunt officiis facere ea? Quae, illum
            accusantium.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
            explicabo molestias quis quos aspernatur hic cupiditate unde
            mollitia possimus dolor?
          </p>
        </div>
        <div className='card'>
          <h3>Hello</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            temporibus cum sed harum incidunt officiis facere ea? Quae, illum
            accusantium.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
            explicabo molestias quis quos aspernatur hic cupiditate unde
            mollitia possimus dolor?
          </p>
        </div>
      </main>
    </>
  );
}

export default TwelveColumnsGrid;
