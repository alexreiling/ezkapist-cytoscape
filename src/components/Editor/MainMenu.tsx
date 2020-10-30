import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../config';
import { ExplorerIcon, Logo, MediaAssetsIcon } from './Icons';

const MenuView = styled.div`
  display: flex;
  flex-direction: column;
  width: 48px;
  background-color: ${COLORS.background.shades[1]};
  height: 100%;

  > a {
    position: relative;
    svg {
      fill: #6b6b6b;
    }
    &:hover,
    &[data-active='true'] {
      svg {
        fill: #ffd3bb;
      }
    }
    &[data-active='true'] {
      :before {
        content: '';
        width: 1px;
        position: absolute;
        background: #ffd3bb;
        height: 100%;
      }
    }
  }
`;
type MainMenuProps = {};

const MainMenu: React.FC<MainMenuProps> = (props) => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <MenuView>
      <Logo />
      <Link to='/explorer' data-active={pathname.includes('/explorer')}>
        <ExplorerIcon title='Show Explorer' />
      </Link>
      <Link to='/flow' data-active={pathname.includes('/flow')}>
        <MediaAssetsIcon title='Manage Media Assets' />
      </Link>
    </MenuView>
  );
};

export default MainMenu;
