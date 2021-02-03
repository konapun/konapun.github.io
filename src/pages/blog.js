import React from 'react'
import { Link, graphql } from 'gatsby'
import BlogLayout from '../components/layout/BlogLayout'
import BlogList from '../components/blog/BlogList'

export default ({ data }) => {
  const tags = data.allMarkdownRemark.group // TODO: use these
  const posts = data.allMarkdownRemark.edges

  const title = 'All Posts'
  return (
    <BlogLayout posts={posts} seo={title}>
      <h2>{title}</h2>
      <BlogList posts={posts}/>

      <h3>Tags</h3>
      <div className='tag-list'>
        {tags.map(({tag, totalCount}) => (
          <div className='tag'>
            <Link to={`/blog/tags/${tag}`}>
              {`${tag} (${totalCount})`}
            </Link>
          </div>
        ))}
      </div>
    </BlogLayout>
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
