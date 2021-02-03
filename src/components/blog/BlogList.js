import React from 'react'
import { Link } from 'gatsby'

export default ({ posts }) => posts.map(({ node }) => {
  const title = node.frontmatter.title || node.fields.slug

  return (
    <article key={node.fields.slug}>
      <header>
        <h3>
          <Link style={{ boxShadow: `none` }} to={'/blog' + node.fields.slug}> {/* FIXME */}
            {title}
          </Link>
        </h3>
        <small>{node.frontmatter.date}</small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt
          }}
        />
      </section>
    </article>
  )
})
