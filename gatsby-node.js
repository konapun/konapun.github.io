const blog = require('./create_pages/blog')

exports.createPages = async args => {
  blog.createPage(args)
}

exports.onCreateNode = args => {
  blog.onCreateNode(args)
}
