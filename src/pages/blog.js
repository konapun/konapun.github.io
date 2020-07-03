import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import BlogLayout from '../components/layout/BlogLayout'
import TagList from '../components/tags/TagList'
import querystring from 'query-string'

export default ({ data, location, pageContext }) => {
  console.log('CONTEXT:', pageContext)
  const tags = data.allMarkdownRemark.group.map(({tag}) => tag)
  const posts = data.allMarkdownRemark.edges
  const {tag} = querystring.parse(location.search)
  const title = 'All Posts'

  return (
    <BlogLayout posts={posts} seo={title}>
      <h2>{title}</h2>
      <TagBlock>
        <TagList location='/blog' tags={tags}/>
      </TagBlock>
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
    </BlogLayout>
  )
}

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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

const TagBlock = styled.div`
  padding: .75rem 0;
  margin-bottom: 2rem;
  border: ${({theme}) => `1px solid ${theme.accent.background}`};
  border-radius: .25rem;
`
