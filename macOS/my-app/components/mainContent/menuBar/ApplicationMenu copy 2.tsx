import Divider from '@/components/mainContent/ui/Divider';
import {
  applicationMenuData,
  MenuData,
} from '@/components/mainContent/utils/data';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { SuBMenuItems } from '@/components/mainContent/menuBar/AppleMenu';
import useOutsideClick from '@/components/mainContent/hooks/useOutsideClick';

const StyledWrapperLeft = styled.div`
  padding: 0;
`;

const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  display: column;
  height: 100%;
`;
type StyledLiProps = {
  active: boolean;
};
const StyledLi = styled.li<StyledLiProps>`
  position: relative;
  align-self: center;
  margin: 0;
  &:nth-child(2) > span {
    color: green;
    font-weight: 700;
  }
  ${(props) =>
    props.active &&
    css`
  :hover 
    background-color: rgba(213, 213, 206, 0.5);
    border-radius: 3px;
    & > span + ul {
      display: flex;
    
  }`}
`;

const StyledSpan = styled.span`
  font-size: 13px;
  font-weight: bold;
  padding: 5px 13px;
  cursor: pointer;
  &:hover {
    background-color: rgba(213, 213, 206, 0.5);
    border-radius: 3px;
  }
`;

function ApplicationMenu() {
  const [isOutsideClicked, SetIsOutsideClicked] = useState(false);
  const refMenuBar = useRef(null);

  function handleOutsideClick() {
    SetIsOutsideClicked(true);
  }

  useOutsideClick(refMenuBar, handleOutsideClick);

  return (
    <StyledWrapperLeft ref={refMenuBar}>
      <MultiLevelMenu
        items={applicationMenuData}
        isOutsideClicked={isOutsideClicked}
      />
    </StyledWrapperLeft>
  );
}
type MultiLevelMenuProps = {
  items: MenuData[];
  depth?: number;
  isOutsideClicked: boolean;
};

export const MultiLevelMenu = ({
  items,
  isOutsideClicked,
}: MultiLevelMenuProps) => {
  const [option, setOption] = useState<number>();
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleOnClick(id: number) {
    if (!option || id !== option) {
      setOption(id);
      setIsActive(true);
    } else {
      setIsActive(false);
      setOption(0);
    }
  }
  function HandleOnMouseEnter(id: number) {
    if (isActive) setOption(id);
  }
  useEffect(() => {
    if (isOutsideClicked) console.log('clicked');
  }, []);

  return (
    <StyledUl>
      {items.map((item) =>
        item.name === 'hr' ? (
          <Divider key={item.id} />
        ) : (
          <React.Fragment key={item.id}>
            <StyledLi
              onClick={() => handleOnClick(item.id)}
              onMouseEnter={() => HandleOnMouseEnter(item.id)}
              active={isActive && option === item.id}
            >
              {item.icon ? (
                <StyledSpan>
                  <FontAwesomeIcon icon={item.icon} />
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
};
export default ApplicationMenu;
