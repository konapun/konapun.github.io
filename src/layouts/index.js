import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import PageTransition from 'gatsby-v2-plugin-page-transitions'
import DataProvider from '../components/data/DataProvider'
import NavProvider from '../components/nav/NavProvider'
import Sidebar from '../components/layout/Sidebar'

import '../assets/sass/resume.scss'

export default ({ location, children, pageContext }) => (
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
            <Sidebar location={location} context={pageContext} />
            <div className='container-fluid p-3 p-lg-5'>
              <PageTransition>
                {children}
              </PageTransition>
            </div>
          </div>
        </NavProvider>
      </DataProvider>
    )}
  />
)
