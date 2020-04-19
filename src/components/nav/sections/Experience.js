import React from 'react'
import Overflow from '../../layout/Overflow'

export default ({ experience, itemsBeforeOverflow }) => (
  <>
    <h2 className="mb-5">Experience</h2>

    <Overflow max={itemsBeforeOverflow}>
      {experience.map(({ company, title, description, bullets = [], start, end }, index) => (
        <div key={index} className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div className="resume-content">
            <h3 className="mb-0">{title}</h3>
            <div className="subheading mb-3">{company}</div>
            <p>
              {description}
            </p>
            {bullets.length > 0 && (
              <ul>
                {bullets.map((bullet, bulletIndex) => (
                  <li key={`${index}_${bulletIndex}`}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="resume-date text-md-right">
            <span className="text-primary">{start} - {end}</span>
          </div>
        </div>
      ))}
    </Overflow>

  </>
)

