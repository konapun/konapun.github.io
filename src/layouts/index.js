import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import PageTransition from 'gatsby-v2-plugin-page-transitions'
import Sidebar from '../components/layout/Sidebar'
import AppProviders from '../AppProviders'
import '../assets/sass/resume.scss'

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
      <AppProviders>
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
          <div className='container-fluid p-3 p-lg-5'>
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </div>
      </AppProviders>
    )}
  />
)
