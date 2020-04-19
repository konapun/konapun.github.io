import React, { useMemo, useContext } from 'react'
import { Link } from 'gatsby'
import Scrollspy from 'react-scrollspy'
import DataContext from '../data/DataContext'
import NavContext from '../nav/NavContext'
import Scroll from './Scroll'
import avatar from './sidebar/avatar.png'

export default function Sidebar () {
  const { firstName, lastName } = useContext(DataContext)
  const { navigation: tabs } = useContext(NavContext)

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
      id="sideNav"
    >
      <a className="navbar-brand" href="#page-top">
        <span className="d-block d-lg-none">
          {firstName} {lastName}
        </span>
        <span className="d-none d-lg-block">
          <img
            className="img-fluid img-profile rounded-circle mx-auto mb-2"
            src={avatar}
            alt=""
          />
        </span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Scrollspy
          items={tabs.map(s => s.id)}
          currentClassName="active"
          offset={-300}
          className="navbar-nav"
        >
          {tabs.map(({ id, name, href }) => (
            <li className="nav-item" key={id}>
              {href ? (
                <Link className="nav-link" to={href}>
                  {name}
                </Link>
              ) : (
                <Scroll type="id" element={id}>
                  <a className="nav-link" href={`#${id}`}>
                    {name}
                  </a>
                </Scroll>
              )}
            </li>
          ))}
        </Scrollspy>
      </div>
    </nav>
  )
}
