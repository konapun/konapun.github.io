import React, { useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Terminal from '../../components/projects/Terminal'
import orbitalFrame from '@orbital-frame/core'
import coreCommands from '@orbital-frame/core-commands'
import errorTrap from '@orbital-frame/plugin-error-trap'
import didYouMean from '@orbital-frame/plugin-did-you-mean'

export const metadata = {
  name: 'Orbital Frame',
  github: 'orbital-frame'
}

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
  const [ webAdapter, notify ] = useMemo(() => createWebAdapter({
    handleMessage: message => console.log('HANDLING MESSAGE:', message)
  }), [])

  const handleEnter = useCallback(value => notify(value), [ notify ])

  const bot = useMemo(() => orbitalFrame(webAdapter, {
    name: 'jehuty',
    commands: coreCommands,
    plugins: [ didYouMean, errorTrap ]
  }), [webAdapter])

  useEffect(() => {
    bot.run()
  }, [ bot ])

  return (
    <Container>
      Orbital frame!
      <Terminal
        title='Orbital Frame Jehuty'
        prompt='jehuty>'
        onEnter={handleEnter}
      >
        Content
      </Terminal>
    </Container>
  )
}

const Container = styled.div`
  padding: 12px;
`
