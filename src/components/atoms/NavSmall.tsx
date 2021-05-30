import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import useViewport from '../../lib/useViewport';
import MenuIcon from './icons/MenuIcon';
import Wrapper from './Wrapper';
import Button from './Button';
import ButtonSizeVariants from '../../types/enums/ButtonSizeVariants';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';

interface NavLinkSmProps {
  display: string;
  url: string;
}

export function NavLinkSm({ display, url }: NavLinkSmProps) {
  return (
    <li className="bg-darkNavbar hover:bg-dark ">
      <Wrapper as="div">
        <Link to={url} className="flex items-center min-h-12">
          {display}
        </Link>
      </Wrapper>
    </li>
  );
}

interface NavButtonSmProps {
  display: string;
  onClick: () => void;
  color?: ButtonColorVariants;
}

export function NavButtonSm({
  display,
  color = ButtonColorVariants.primary,
  onClick,
}: NavButtonSmProps) {
  return (
    <li className="bg-darkNavbar hover:bg-dark flex items-center min-h-12">
      <Wrapper as="div" className="h-full">
        <Button
          id="logout-btn"
          color={color}
          size={ButtonSizeVariants.small}
          onClick={onClick}
          full
        >
          {display}
        </Button>
      </Wrapper>
    </li>
  );
}

interface NavbarSmProps {
  links: { display: string; url: string }[];
  onLogoutCallback: () => void;
}
export default function NavbarSm({ links, onLogoutCallback }: NavbarSmProps) {
  const { viewport } = useViewport();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  React.useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (viewport === 'sm' || viewport === 'md') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = originalStyle;
      }
    } else {
      setIsOpen(false);
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, viewport]);

  return (
    <>
      <nav
        className={classNames('bg-darkNavbar absolute w-full', {
          'h-screen bg-opacity-70': isOpen,
        })}
      >
        <Wrapper>
          <div className="flex items-center justify-between py-6">
            <div className="text-white">
              <p className="font-black leading-none">
                TO-DO <br /> APP
              </p>
            </div>

            <Button id="menu-id" onClick={toggleMenu} icon>
              <MenuIcon />
            </Button>
          </div>
        </Wrapper>

        {isOpen && (
          <ul className="h-full text-white pt-10">
            {links.map((link) => (
              <NavLinkSm key={link?.url} {...link} />
            ))}

            <NavButtonSm
              display="Logout"
              color={ButtonColorVariants.danger}
              onClick={onLogoutCallback}
            />
          </ul>
        )}
      </nav>
      <div
        className={classNames('h-36 w-full', {
          'bg-darkNavbar': isOpen,
          transparent: !isOpen,
        })}
      />
    </>
  );
}
