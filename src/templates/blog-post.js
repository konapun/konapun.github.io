import React, { useContext, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import NavContext from '../components/nav/NavContext'

import SEO from '../components/SEO'

export default ({ data, pageContext }) => {
  const { markdownRemark: post, allMarkdownRemark: allPosts } = data
  const { previous, next } = pageContext
  const { setNavigation } = useContext(NavContext)

  const nav = [ // FIXME: this is duplicated in the blog landing page. clean this up
    {
      id: 'home',
      name: 'Home',
      href: '/'
    },
    {
      id: 'blog',
      name: 'All Posts',
      href: '/blog'
    },
    ...allPosts.edges.map(({ node }) => ({
      id: node.fields.slug,
      name: node.frontmatter.title,
      href: `/blog${node.fields.slug}`
    }))
  ]

  useEffect(() => {
    setNavigation(nav)
  }, [ nav, setNavigation ])

  return (
    <div className="mt-5 p-5">
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className="mb-5">
          <h1>
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.description && (
            <h4>
              {post.frontmatter.description}
            </h4>
          )}
          <p>
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/blog/${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog/${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
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
