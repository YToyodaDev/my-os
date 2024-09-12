'use client';

import Divider from '@/components/mainContent/ui/Divider';
import React from 'react';
import { appleMenuItems, MenuData } from '../utils/data';
import styles from './AppleMenu.module.css';

// import { MultiLevelMenu } from '@/components/mainContent/menuBar/ApplicationMenu';
import styled, { css } from 'styled-components';

const StyledUl = styled.ul`
  padding: 4px;
  width: 14rem;
  background: rgba(245, 245, 245, 0.5);
  background-blend-mode: luminosity;
  backdrop-filter: blur(81.5485px);
  border-radius: 6px;
  left: 0px;
  top: 32px;
  position: absolute;
  list-style: none;
  display: none;
  flex-direction: column;
  justify-content: flex-start;

  /* background-color: blue; */
  /* &:hover {
    display: flex;
  } */
`;

type StyledProps = {
  type?: 'sub' | 'nested';
};
const StyledUl2 = styled.ul<StyledProps>`
  ${(props) =>
    props.type === 'nested' &&
    css`
      background-color: green;
    `}

  padding: 4px;
  width: 14rem;
  background-color: ${(props) => props.type === 'nested' && 'green'};
  background: rgba(245, 245, 245, 0.5);
  background-blend-mode: luminosity;
  backdrop-filter: blur(81.5485px);
  border-radius: 6px;
  left: 100%;
  top: -4px;
  position: absolute;
  list-style: none;
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 4px;
  &:hover {
    display: flex;
  }
`;
StyledUl2.defaultProps = {
  type: 'sub',
};
const StyledLi = styled.li`
  position: relative;
  display: flex;
  height: 100%;
  padding: 0 0.3rem;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: white;
    background-color: #007aff;
    border-radius: 4px;
  }

  &:hover > span + ul {
    color: #000000;
    display: flex;
  }
`;
const StyledSpan = styled.span`
  font-size: 13px;
  cursor: pointer;
`;
type SubMenuProps = {
  depth?: number;
  items: MenuData[];
};

type Props = {
  type?: 'sub' | 'nested';
};
const Form = styled.form<Props>`
  ${(props) =>
    props.type === 'sub' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'nested' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: 'sub',
};

export const SuBMenuItems = ({ items, depth }: SubMenuProps) => {
  let num: number = 0;
  if (depth) {
    num = depth;
  }
  console.log(depth);
  return (
    <>
      {num > 0 ? (
        <StyledUl2 type={'nested'}>
          {items.map((item) =>
            item.name === 'hr' ? (
              <Divider key={item.id} />
            ) : (
              <React.Fragment key={item.id}>
                <StyledLi>
                  <StyledSpan>{item.name}</StyledSpan>
                  {item.children && (
                    <SuBMenuItems items={item.children} depth={num + 1} />
                  )}
                </StyledLi>
              </React.Fragment>
            )
          )}
        </StyledUl2>
      ) : (
        <StyledUl>
          {items.map((item) =>
            item.name === 'hr' ? (
              <Divider key={item.id} />
            ) : (
              <React.Fragment key={item.id}>
                <StyledLi>
                  <StyledSpan>{item.name}</StyledSpan>
                  {item.children && (
                    <SuBMenuItems items={item.children} depth={num + 1} />
                  )}
                </StyledLi>
              </React.Fragment>
            )
          )}
        </StyledUl>
      )}
    </>
  );
};
// Component to render the menu
const AppleMenu = () => {
  console.log('apple menu');
  return (
    <div
      className={styles.wrapper}
      style={{ visibility: isAppleMenuOpen ? 'visible' : 'hidden' }}
    >
      <SuBMenuItems items={appleMenuItems} depth={1} />
    </div>
  );
};

export default AppleMenu;
