import React from 'react';
import './TheHeader.scss'
import { NavLink } from 'react-router-dom'

const TheHeader = () => {

  const links = [
    {
      to: '/',
      label: 'Login',
      exact: true
    },
    {
      to: '/create-test',
      label: 'Create test',
      exact: true
    },
    {
      to: '/test',
      label: 'Test',
      exact: true
    },
  ]

  return (
    <header className="header">
      <nav className="menu">
        <ul className="menu__list">
          {
            links.map((link, index) => {
              return (
                <li className="menu__item" key={index}>
                  <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName="menu__link--active"
                    className="menu__link"
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </header>
  );
};

export default TheHeader;