import React, {useContext} from 'react'
import useNavigation from '../nav/useNavigation'
import PageLayout from './PageLayout'
import DataContext from '../data/DataContext'

export default ({ posts = [], seo, children }) => {
  const config = useContext(DataContext)
  const displayedPosts = posts.slice(0, config.itemsBeforeOverflow)

  useNavigation([
    ...displayedPosts.map(({ node }) => ({
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
