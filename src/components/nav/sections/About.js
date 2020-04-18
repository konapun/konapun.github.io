import React from 'react'

export default ({firstName, lastName, address, email, byline, socialLinks}) => (
  <>
    <h1 className="mb-0">
      {firstName}
      <span className="text-primary">{lastName}</span>
    </h1>
    <div className="subheading mb-5">
      {address} · <a href={`mailto:${email}`}>{email}</a>
    </div>
    <p className="lead mb-5">
      {byline}
    </p>
    <div className="social-icons">
      {socialLinks.map(social => {
        const { icon, url } = social;
        return (
          <a key={url} href={url} target="_blank">
            <i className={`fab ${icon}`}></i>
          </a>
        );
      })}
    </div>
  </>
)
