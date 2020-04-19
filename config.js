module.exports = {
  siteTitle: 'konapun.github.io', // <title>
  siteDescription: 'Personal site for Bremen Braun (@konapun)',
  manifestName: 'Resume',
  manifestShortName: 'Landing', // max 12 characters
  manifestStartUrl: '/',
  manifestBackgroundColor: '#663399',
  manifestThemeColor: '#663399',
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
      description: 'This is the description',
      bullets: [
        'Did a thing'
      ],
      start: 'August 2018',
      end: 'Present'
    },
    {
      company: 'Calabrio',
      title: 'Senior Software Engineer',
      description: '',
      start: 'February 2017',
      end: 'August 2018'
    },
    {
      company: 'Robert Half, Salaried Professional Service',
      title: 'Software Consultant',
      description: '',
      start: 'July 2016',
      end: 'February 2017'
    },
    {
      company: 'Independent Contractor',
      title: 'Software Consultant',
      description: '',
      start: 'July 2014',
      end: 'July 2016'
    },
    {
      company: 'The Biodesign Institute',
      title: 'Research Professional',
      description: '',
      start: 'July 2012',
      end: 'July 2014'
    },
    {
      company: 'USDA, Agricultural Research Service',
      title: 'IT Specialist',
      description: '',
      start: 'November 2010',
      end: 'July 2012'
    },
    {
      company: 'Iowa State University',
      title: 'Software Developer',
      description: '',
      start: 'June 2010',
      end: 'November 2010'
    },
    {
      company: 'Iowa State University',
      title: 'Research Assistant',
      description: '',
      start: 'November 2009',
      end: 'June 2010'
    }
  ]
};
