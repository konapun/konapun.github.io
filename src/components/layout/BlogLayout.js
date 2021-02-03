import React from 'react'
import useNavigation from '../nav/useNavigation'
import PageLayout from './PageLayout'

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
    <PageLayout title={seo}>
      {children}
    </PageLayout>
  )
}
