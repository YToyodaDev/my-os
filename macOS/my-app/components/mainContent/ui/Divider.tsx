import styled from 'styled-components';

const StyledDivider = styled.div`
  .wrap {
    text-align: center;
    margin: 6px;
    position: relative;
    cursor: pointer;
  }

  .wrap:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    width: 100%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

import styles from './divider.module.css';
function Divider() {
  return <StyledDivider className={styles.wrap}></StyledDivider>;
}

export default Divider;
