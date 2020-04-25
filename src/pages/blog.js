import React, { useContext, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import NavContext from '../components/nav/NavContext'
import SEO from '../components/SEO'

export default ({ data }) => {
  const tags = data.allMarkdownRemark.group // TODO: use these
  const posts = data.allMarkdownRemark.edges
  const { setNavigation } = useContext(NavContext)

  const nav = [
    {
      id: 'home',
      name: 'Home',
      href: '/'
    },
    ...posts.map(({ node }) => ({
      id: node.fields.slug,
      name: node.frontmatter.title,
      href: `/blog${node.fields.slug}`
    }))
  ]

  useEffect(() => {
    setNavigation(nav)
  }, [ setNavigation, nav ])

  return (
    <div className="mt-5 p-5">
      <SEO title='All posts'/>
      <h2>All Posts</h2>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: `none` }} to={`/blog${node.fields.slug}`}> {/* FIXME */}
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </div>
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
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
