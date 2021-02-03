import React from 'react'
import { Link, graphql } from 'gatsby'
import BlogList from '../../blog/BlogList'

export default ({ posts = [], itemsBeforeOverflow }) => {
  const displayedPosts = posts.slice(0, itemsBeforeOverflow)
  return (
    <>
      <h2 className="mb-5">Blog</h2>
      <BlogList posts={displayedPosts}/>
      <div className='text-md-right'>
        <Link to='/blog'>
          All posts
        </Link>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
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

