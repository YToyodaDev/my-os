import { css } from '@emotion/css';

const styles = css`
  font-size: clamp(min, cur, upper);
`;

function ResponsiceTypography() {
  return (
    <h1
      className='text-center text-5xl font-extrabold capitalize md:text-6xl lg:text-7xl xl:text-8xl 
    '
    >
      this text is fluid
    </h1>
  );
}

export default ResponsiceTypography;
