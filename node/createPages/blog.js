const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { blogPrefix } = require('../../config')

exports.createPage = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`${__dirname}/../../src/templates/blog-post.js`)
  const postsByTag = path.resolve(`${__dirname}/../../src/templates/tags.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) throw result.errors

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const slug = post.node.fields.slug
    const path = `${blogPrefix}${slug}`

    createPage({
      path,
      component: blogPost,
      context: {
        slug,
        previous,
        next
      }
    })
  })

  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    console.log('Creating page:', `${blogPrefix}${tag.fieldValue}`)
    createPage({
      path: `${blogPrefix}/tags/${tag.fieldValue}`,
      component: postsByTag,
      context: {
        tag: tag.fieldValue
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
