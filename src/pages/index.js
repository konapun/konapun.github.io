import React, { useMemo, useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import sections from '../components/nav/sections'
import NavContext from '../components/nav/NavContext'
import config from '../../config'

export default ({ data }) => {
  const { setDefaultNavigation } = useContext(NavContext)
  const siteData = useMemo(() => ({
    ...data,
    posts: data?.allMarkdownRemark?.edges
  }), [ data ])

  useEffect(setDefaultNavigation, [ setDefaultNavigation ])

  return (
    <>
      {sections.map(({id, Component}) => (
        <React.Fragment key={id}>
          <section
            id={id}
            className="resume-section p-3 p-lg-5 d-flex align-items-center"
          >
            <div className="w-100">
              <Component {...config} {...siteData}/>
            </div>
          </section>
          <hr className="m-0"/>
        </React.Fragment>
      ))}
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
