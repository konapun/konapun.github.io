import React from 'react'
import useNavigation from '../nav/useNavigation'
import PageLayout from './PageLayout'
import routes from '../projects/routes'

export default ({ title, description, link, children }) => {
  useNavigation([
    ...routes.map(({ id, name }) => ({
      id,
      name,
      href: `/projects/${id}`
    }))
  ])

  return (
    <PageLayout title={title}>
      <div className="d-flex justify-content-between">
        <h1 className="mb-0">{title}</h1>
        {link && (
          <div className="social-icons">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        )}
      </div>
      <p className="lead mb-5">
        {description}
      </p>
      <div>
        {children}
      </div>
    </PageLayout>
  )
}
