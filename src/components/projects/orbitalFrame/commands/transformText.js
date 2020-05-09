import { flow } from 'lodash'

export default () => ({
  name: 'transform-text',
  synopsis: 'transform-text [TEXT] ...[MORE]',
  description: 'Apply a transformation to input text',
  options: {
    u: {
      alias: 'upper',
      description: 'Transform to uppercase',
      type: 'boolean'
    },
    l: {
      alias: 'lower',
      description: 'Transform to lowercase',
      type: 'boolean'
    }
  },
  execute (args, opts) {
    const enabled = Object.entries(opts).filter(([ key, val ]) => val).reduce((acc, [ key ]) => [ ...acc, key ], [])
    const activeTransforms = Object.entries(transforms).filter(([ name ]) => enabled.includes(name)).map(([ name, fn ]) => fn)
    const pipeline = flow(activeTransforms)

    return args.map(pipeline)
  }
})

const transforms = {
  upper: text => text.toUpperCase(),
  lower: text => text.toLowerCase()
}
