import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
// import Layout from '../components/Layout'
import Sidebar from '../components/layout/Sidebar'
import sections from '../components/nav/sections'
import config from '../../config'

export default ({ data }) => {
  const siteData = useMemo(() => ({
    ...data,
    posts: data?.allMarkdownRemark?.edges
  }), [ data ])

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
