import React from 'react'
import { Link, graphql } from 'gatsby'

export default ({ posts = [], itemsBeforeOverflow }) => {
  const displayedPosts = posts.slice(0, itemsBeforeOverflow)
  return (
    <>
      <h2 className="mb-5">Blog</h2>
      {displayedPosts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: `none` }} to={'/blog' + node.fields.slug}> {/* FIXME */}
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt
                }}
              />
            </section>
          </article>
        )
      })}
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

