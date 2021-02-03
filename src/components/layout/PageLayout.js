import React from 'react'
import SEO from '../SEO'

export default ({ title, children }) => (
  <section className="content-section">
    <SEO title={title} className="mb-0"/>
    {children}
  </section>
)
