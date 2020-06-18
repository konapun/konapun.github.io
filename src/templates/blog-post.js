import React from 'react'
import { Link, graphql } from 'gatsby'
import BlogLayout from '../components/layout/BlogLayout'
import TagList from '../components/tags/TagList'

export default ({ data, pageContext }) => {
  const { markdownRemark: post, allMarkdownRemark: allPosts } = data
  const { previous, next } = pageContext

  const title = post.frontmatter.title
  return (
    <BlogLayout posts={allPosts.edges} seo={title}>
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
          <TagList location='/blog' tags={post.frontmatter.tags}/>
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
    </BlogLayout>
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
        tags
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
