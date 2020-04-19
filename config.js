module.exports = {
  siteTitle: 'konapun.github.io', // <title>
  siteDescription: 'Personal site for Bremen Braun (@konapun)',
  manifestName: 'Resume',
  manifestShortName: 'Landing', // max 12 characters
  manifestStartUrl: '/',
  manifestBackgroundColor: '#2f3133',
  manifestThemeColor: '#f92672',
  manifestDisplay: 'standalone',
  manifestIcon: 'src/assets/img/website-icon.png',
  pathPrefix: '/resume', // This path is subpath of your hosting https://domain/portfolio
  blogPrefix: '/blog',
  itemsBeforeOverflow: 3,
  firstName: 'Bremen',
  lastName: 'Braun',
  byline: 'The perfect blend of technology and magic',
  socialLinks: [
    {
      icon: 'fa-github',
      name: 'Github',
      url: 'https://github.com/konapun',
    },
    {
      icon: 'fa-linkedin-in',
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/bremen-braun-81732582/',
    },
    {
      icon: 'fa-twitter',
      name: 'Twitter',
      url: 'https://twitter.com/konapun_',
    }
  ],
  email: 'konapun.zero@gmail.com',
  address: 'Minneapolis area',
  experience: [
    {
      company: 'Trimble',
      title: 'Software Engineer III',
      description: 'Served as full-stack web developer on a next-generation fleet management product to replace a legacy offering.',
      bullets: [
        'Owned, developed, maintained, and monitored tens of Node microservices running on Kubernetes utilizing Kafka for messaging',
        'Created full-stack solutions using a React frontend',
        'Facilitated discussion between remote groups to drive product development and remove blockers'
      ],
      technologies: [
        'JavaScript (Babel)', 'Node.js', 'hapi', 'joi', 'Kafka', 'Kubernetes', 'Elastic Search', 'Postgres', 'React', 'Lerna', 'Jest', 'WebdriverIO', 'Git'
      ],
      start: 'August 2018',
      end: 'Present'
    },
    {
      company: 'Calabrio',
      title: 'Senior Software Engineer',
      description: 'Developed and maintained UI for enterprise cloud offering serving thousands of customers worldwide.',
      bullets: [
        'Architected, defined best-practices, and implemented UI for an enterprise  web application using React and Redux to replace legacy offering',
        'Created and maintained a high-quality repository of reusable React components',
        'Served as Team Lead on a team of six UI developers'
      ],
      technologies: [
        'JavaScript (Babel)', 'HTML5', 'CSS3', 'React', 'Redux', 'Jest', 'Storybook', 'AngularJS', 'Git'
      ],
      start: 'February 2017',
      end: 'August 2018'
    },
    {
      company: 'Robert Half, Salaried Professional Service',
      title: 'Software Consultant',
      description: 'Offered software development services to clients in the Minneapolis area, including:',
      bullets: [
        'Aided in the design and development of features of software products following Agile methodologies',
        'Improved software functionality and code quality among various web-based products'
      ],
      technologies: [
        'JavaScript', 'HTML5', 'CSS3', 'AngularJS', 'Dojo', 'svn'
      ],
      start: 'July 2016',
      end: 'February 2017'
    },
    {
      company: 'Independent Contractor - MaizeGDB',
      title: 'Software Consultant',
      description: 'Worked alongside researchers and programmers to maintain and enhance a web-based portal to facilitate crop research.',
      bullets: [
        'Created a transparent caching system atop PDO to serialize/unserialize the result of long-running queries into a key-value store (MongoDB)',
        'Created an interactive graph-based tool for visualization and analysis of ~5000 maize lines'
      ],
      technologies: [
        'PHP', 'JavaScript', 'HTML5', 'CSS3', 'PDO', 'Cytoscape.js', 'PostgreSQL', 'MongoDB', 'Linux'
      ],
      start: 'October 2014',
      end: 'July 2016'
    },
    {
      company: 'Independent Contractor - iGEM at Temple University',
      title: 'Software Consultant',
      description: 'Worked as the lead developer for three major web-based products for exploration of evolutionary data and research on model organisms.',
      bullets: [
        'Created and maintained a web framework in use across multiple websites',
        'Developed websites from scratch based off mockups',
        'Created tools for the visualization of genomic sequence data'
      ],
      technologies: [
        'PHP', 'JavaScript', 'HTML5', 'CSS3', 'Python', 'CodeIgniter', 'PostgreSQL', 'SQLite', 'Linux'
      ],
      start: 'July 2014',
      end: 'July 2016'
    },
    {
      company: 'The Biodesign Institute',
      title: 'Research Professional',
      description: 'Worked in the Center for Evolutionary Medicine and Informatics creating web-based tools for evolutionary and developmental research.',
      bullets: [
        'Created novel visualizations for the analysis of next-generation genomic data',
        'Maintained and updated web-based applications to aid researchers in the field of evolutionary biology'
      ],
      technologies: [
        'PHP', 'JavaScript', 'HTML5', 'CSS3', 'Python', 'C', 'Java', 'PostgreSQL', 'Linux'
      ],
      start: 'July 2012',
      end: 'July 2014'
    },
    {
      company: 'USDA, Agricultural Research Service',
      title: 'IT Specialist',
      description: 'Worked on the MaizeGDB project, assisting with web development and custom tool development.',
      bullets: [
        'Designed and implemented an advanced templating language for the MaizeGDB website redesign',
        'Created custom modules for the visualization of next-generation sequencing data',
        'Communicated with geneticists to establish use-cases for various software scenarios'
      ],
      technologies: [
        'Perl', 'PHP', 'JavaScript', 'HTML', 'CSS3', 'PostgreSQL'
      ],
      start: 'November 2010',
      end: 'July 2012'
    },
    {
      company: 'Iowa State University',
      title: 'Software Developer',
      description: 'Worked on the POPcorn project assisting in the creation of a genetic sequence-based search engine.',
      bullets: [
        'Wrote and integrated programs into a large system to automate sequence alignment jobs and display results between various genome browsers',
        'Designed and implemented a web-interfaced scalable multithreaded and multiprocess application for scheduling and distributing large genetic alignment tasks among compute nodes'
      ],
      technologies: [
        'Perl', 'PHP', 'JavaScript', 'HTML', 'CSS3', 'MySQL'
      ],
      start: 'June 2010',
      end: 'November 2010'
    },
    {
      company: 'Iowa State University',
      title: 'Research Assistant',
      description: 'Worked on a multi-university, NSF-funded project.',
      bullets: [
        'Improved source code and curated data for bioinformatic analysis of synteny conserved among legume genomes',
        'Represented comparative genomics outputs on a web-based genome browser (GBrowse)'
      ],
      technologies: [
        'Python', 'Bash', 'Perl', 'Bioinformatics Toolkits'
      ],
      start: 'November 2009',
      end: 'June 2010'
    }
  ]
}
