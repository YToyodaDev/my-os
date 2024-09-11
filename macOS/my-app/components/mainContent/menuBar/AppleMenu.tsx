'use client';

import { Fragment } from 'react';
import styles from './AppleMenu.module.css';
import React from 'react';
import { MenuData, appleMenuItems } from '../utils/data';
import Divider from '@/components/mainContent/ui/Divider';

import styled from 'styled-components';
import { MultiLevelMenu } from '@/components/mainContent/menuBar/ApplicationMenu';

const StyledUl = styled.ul`
  padding: 4px;
  width: 14rem;
  background: rgba(245, 245, 245, 0.5);
  background-blend-mode: luminosity;
  backdrop-filter: blur(81.5485px);
  border-radius: 6px;
  left: 0px;
  top: 100%;
  position: absolute;
  list-style: none;
  height: 289.15px;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 4px;
  &:hover li {
    display: flex;
  }
`;
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
`;
const StyledSpan = styled.span`
  font-size: 13px;
  cursor: pointer;
`;

export const SuBMenuItems = ({ items }: { items: MenuData[] }) => (
  <StyledUl>
    {items.map((item) =>
      item.name === 'hr' ? (
        <Divider key={item.id} />
      ) : (
        <React.Fragment key={item.id}>
          <StyledLi>
            <StyledSpan className={styles.p}>{item.name}</StyledSpan>
            {item.children && <MultiLevelMenu items={item.children} />}
          </StyledLi>
        </React.Fragment>
      )
    )}
  </StyledUl>
);

// Component to render the menu
const AppleMenu: React.FC<{ isAppleMenuOpen: boolean }> = ({
  isAppleMenuOpen,
}) => (
  <div
    className={styles.wrapper}
    style={{ visibility: isAppleMenuOpen ? 'visible' : 'hidden' }}
  >
    <SuBMenuItems items={appleMenuItems} />
  </div>
);

export default AppleMenu;
