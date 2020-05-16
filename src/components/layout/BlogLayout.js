import React from 'react'
import useNavigation from '../nav/useNavigation'
import SEO from '../SEO'

export default ({ posts = [], seo, children }) => {
  useNavigation([
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
  ])

  return (
    <section className="content-section">
      <SEO title={seo} className="mb-0"/>
      {children}
    </section>
  )
}
