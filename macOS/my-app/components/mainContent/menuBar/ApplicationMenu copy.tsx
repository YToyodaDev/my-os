import Divider from '@/components/mainContent/ui/Divider';
import { MenuData } from '@/components/mainContent/utils/data';
import styles from './ApplicationMenu.module.css';

import { applicationMenuData } from '@/components/mainContent/utils/data';
type MultiLevelMenuProps = {
  items: MenuData[];
  depth?: number;
};

import styled from 'styled-components';

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
    display: flex;
  }
`;
const StyledSpan = styled.span`
  font-size: 13px;
  cursor: pointer;
`;

function ApplicationMenu() {
  return <MultiLevelMenu items={applicationMenuData} />;
}

export default ApplicationMenu;

const MultiLevelMenu = ({ items, depth = 0 }: MultiLevelMenuProps) => (
  <StyledUl>
    {items.map((item) =>
      item.name === 'hr' ? (
        <Divider key={item.id} />
      ) : (
        <StyledLi key={item.id}>
          <StyledSpan>{item.name}</StyledSpan>
          {item.children && (
            <MultiLevelMenu items={item.children} depth={depth + 1} />
          )}
          {/* Handle sub-menus if they exist */}
        </StyledLi>
      )
    )}
  </StyledUl>
);
