import React from 'react'
import { Link } from 'gatsby'

export default ({ projects }) => (
  <div className="ml-3">
    <div className="row">
      {projects.map((project, index) => (
        <div key={index}>
          <h3>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </h3>
          <p>
            {project.description}
          </p>
          <div className="social-icons social-icons-sm">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)
