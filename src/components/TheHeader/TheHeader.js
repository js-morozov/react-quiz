import React from 'react';
import './TheHeader.scss'
import { NavLink } from 'react-router-dom'

const TheHeader = (props) => {
  const links = [
    {
      to: '/',
      label: 'Test list',
      exact: true,
      visible: true
    },
    {
      to: '/login',
      label: 'Login',
      exact: true,
      visible: !props.isAuthenticated
    },
    {
      to: '/create-test',
      label: 'Create test',
      exact: true,
      visible: props.isAuthenticated
    },
    {
      to: '/test',
      label: 'Test',
      exact: true,
      visible: props.isAuthenticated
    },
    {
      to: '/logout',
      label: 'Logout',
      exact: true,
      visible: props.isAuthenticated
    },
  ]

  return (
    <header className="header">
      <nav className="menu">
        <ul className="menu__list">
          {
            links.filter(link => link.visible).map((link, index) => {
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