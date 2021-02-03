const blog = require('./blog')

exports.createPages = async args => {
  blog.createPage(args)
}

exports.onCreateNode = args => {
  blog.onCreateNode(args)
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const { path } = page

  const parts = path.split('/').filter(p => p)
  parts.pop()
  const previous = path !== '/' ? `/${parts.join('/')}` : null

  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      back: previous
    }
  })
}
