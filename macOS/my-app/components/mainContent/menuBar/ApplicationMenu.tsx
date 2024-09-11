import Divider from '@/components/mainContent/ui/Divider';
import { MenuData } from '@/components/mainContent/utils/data';
import styles from './ApplicationMenu.module.css';

import { applicationMenuData } from '@/components/mainContent/utils/data';
type MultiLevelMenuProps = {
  items: MenuData[];
  depth?: number;
};

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SuBMenuItems } from '@/components/mainContent/menuBar/AppleMenu';

const StyledWrapperLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
`;

const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;

  &li:first-child span {
    font-weight: 900;
  }
`;

const StyledLi = styled.li`
  align-self: center;
  height: 100%;
  margin: 0 -3px;

  &:hover {
    background-color: rgba(213, 213, 206, 0.5);
    border-radius: 3px;
  }
  &:hover ul {
    display: flex;
  }
`;

const StyledSpan = styled.span`
  font-size: 13px;
  font-weight: bold;
  padding: 5px 13px;
  cursor: pointer;
  &:hover {
    /* background-color: rgba(213, 213, 206, 0.5); */
    border-radius: 3px;
  }
`;

function ApplicationMenu() {
  return (
    <StyledWrapperLeft>
      <MultiLevelMenu items={applicationMenuData} />
    </StyledWrapperLeft>
  );
}

export const MultiLevelMenu = ({ items }: MultiLevelMenuProps) => (
  <StyledUl>
    {items.map((item) =>
      item.name === 'hr' ? (
        <Divider key={item.id} />
      ) : (
        <React.Fragment key={item.id}>
          <StyledLi>
            {item.icon ? (
              <StyledSpan>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={styles.appleIcon}
                />
              </StyledSpan>
            ) : (
              <StyledSpan>{item.name}</StyledSpan>
            )}
            {item.children && <SuBMenuItems items={item.children} />}
          </StyledLi>
        </React.Fragment>
      )
    )}
  </StyledUl>
);
export default ApplicationMenu;
