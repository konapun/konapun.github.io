import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import DataProvider from '../components/data/DataProvider'
import NavProvider from '../components/nav/NavProvider'
import Sidebar from '../components/layout/Sidebar'

import '../assets/sass/resume.scss';

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <DataProvider>
        <NavProvider>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Resume' },
              { name: 'keywords', content: 'site, web' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <div className='main-body'>
            <Sidebar/>
            <div className='container-fluid p-4'>
              {children}
            </div>
          </div>
        </NavProvider>
      </DataProvider>
    )}
  />
)
