import React from 'react';
import { Link } from 'react-router-dom';
import useViewport from '../../lib/useViewport';
import Wrapper from '../atoms/Wrapper';
import NavbarSm from '../atoms/NavSmall';
import Button from '../atoms/Button';
import ButtonColorVariants from '../../types/enums/ButtonColorVariants';

interface NavLinkProps {
  display: string;
  url: string;
}
function NavLink({ display, url }: NavLinkProps) {
  return (
    <li className="px-2.5">
      <Link to={url}>{display}</Link>
    </li>
  );
}

export default function Navbar() {
  const { viewport } = useViewport();
  const showSmall = viewport === 'sm' || viewport === 'md';
  const links = [
    { display: 'Tasks', url: '/to-do' },
    { display: 'Favorites', url: '/to-do/favorites' },
  ];

  const onLogoutCallback = () => console.log('Logout...');

  if (showSmall) {
    return <NavbarSm links={links} onLogoutCallback={onLogoutCallback} />;
  }

  return (
    <nav className="bg-darkNavbar mb-16">
      <Wrapper>
        <div className="flex items-center justify-between py-6">
          <div className="text-white">
            <p className="font-black leading-none">
              TO-DO <br /> APP
            </p>
          </div>

          <ul className="flex items-center justify-center text-white font-medium">
            {links.map((link) => (
              <NavLink key={link?.url} {...link} />
            ))}
            <li className="w-20 bg-transparent" />
            <li>
              <Button id="logout-lg-btn" color={ButtonColorVariants.danger}>
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </Wrapper>
    </nav>
  );
}
