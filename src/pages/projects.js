import React, { useContext } from 'react'
import PageLayout from '../components/layout/PageLayout'
import ProjectList from '../components/projects/ProjectList'
import projects from '../components/projects/routes'
import DataContext from '../components/data/DataContext'

const title = 'All Projects'

export default () => {
  const { findSocialLink } = useContext(DataContext)
  const github = findSocialLink('github')

  return (
    <PageLayout title={title}>
      <h2>{title}</h2>
      <p>
        For a full list of projects, please visit <a href={github.url} target="_blank">my GitHub profile</a>.
      </p>
      <hr/>
      <ProjectList projects={projects}/>
    </PageLayout>
  )
}
