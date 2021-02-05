import React from 'react'
import { Link } from 'gatsby'
import ProjectList from '../../projects/ProjectList'
import projects from '../../projects/routes'

export default () => (
  <>
    <h2 className="mb-5">Projects</h2>
    <div className='mb-3'>
      <ProjectList projects={projects}/>
    </div>
    <div className='text-md-right'>
      <Link to='/projects'>
        All projects
      </Link>
    </div>
  </>
)
