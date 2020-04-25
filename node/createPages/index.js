const blog = require('./blog')

exports.createPages = async args => {
  blog.createPage(args)
}

exports.onCreateNode = args => {
  blog.onCreateNode(args)
}
