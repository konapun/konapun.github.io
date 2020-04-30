import React, { useState, useCallback, useEffect } from 'react'
import Terminal from '../Terminal'
import orbitalFrame from '@orbital-frame/core'
import coreCommands from '@orbital-frame/core-commands'
import errorTrap from '@orbital-frame/plugin-error-trap'
import didYouMean from '@orbital-frame/plugin-did-you-mean'

const createWebAdapter = ({ handleMessage }) => {
  let matcher, callback

  const notify = text => {
    if (matcher && callback) {
      if (matcher.test(text)) {
        return callback({
          message: {
            user: {
              id: 1,
              name: 'root'
            },
            text,
            channel: 'root'
          },
          send (message) {
            handleMessage(message)
          }
        })
      }
    }
  }

  const adapter = {
    ps1: '@',
    hear (str, fn) {
      matcher = str
      callback = fn
    },

    send (channel, message) {
      handleMessage(message)
    },

    async getUsers () {
      return []
    },

    async getChannels () {
      return []
    }
  }

  return [ adapter, notify ]
}

export default () => {
  const [ output, setOutput ] = useState('')
  const [ adapter, setAdapter ] = useState({})

  const handleEnter = useCallback(value => adapter && adapter.notify(value), [ adapter ])

  useEffect(() => {
    const [ webAdapter, notifyAdapter ] = createWebAdapter({
      handleMessage: message => {
        setOutput(() => message) // FIXME: if the output is the same between messages this won't update
      }
    })

    setAdapter({ notify: notifyAdapter })
    const bot = orbitalFrame(webAdapter, {
      name: 'jehuty',
      commands: coreCommands,
      plugins: [ didYouMean, errorTrap ]
    })
    bot.run()
  }, [])

  return (
    <Terminal
      title='Orbital Frame Jehuty'
      prompt='jehuty>'
      onEnter={handleEnter}
      output={output}
      height='400px'
    />
  )
}
