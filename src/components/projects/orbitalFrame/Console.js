import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { startCase } from 'lodash'
import Terminal from '../components/Terminal'
import orbitalFrame from '@orbital-frame/core'
import coreCommands from '@orbital-frame/core-commands'
import errorTrap from '@orbital-frame/plugin-error-trap'
import didYouMean from '@orbital-frame/plugin-did-you-mean'
import extraCommands from './commands'

const name = 'ifrit'

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

export default ({ input = '', maxScrollback = 100 }) => {
  const [ output, setOutput ] = useState(input ? [ input ] : [])
  const [ terminalInput, setTerminalInput ] = useState('')
  const [ cursor, setCursor ] = useState(0)
  const [ adapter, setAdapter ] = useState({})

  const history = useMemo(() => [ ...output ].reverse().filter(({ type }) => type === 'input'), [ output ])

  const handleArrowUp = useCallback(() => {
    if (cursor < history.length) {
      setTerminalInput(history[cursor].value)
      setCursor(cursor + 1)
    }
  }, [ cursor, history ])

  const handleArrowDown = useCallback(() => {
    if (cursor > 0) {
      setTerminalInput(history[cursor - 1].value)
      setCursor(cursor - 1)
    }
  }, [ cursor, history ])

  const handleEnter = useCallback(value => {
    setOutput(output => [ ...output, { type: 'input', text: `${name}> ${value}`, value } ])
    setCursor(0)
    adapter && adapter.notify(value)
  }, [ adapter ])

  const handleMessage = useCallback(message => setOutput(output => [ ...output, { type: 'output', value: message, text: message }]), [])

  useEffect(() => {
    if (input) {
      handleEnter(input)
    }
  }, [ input, handleEnter ])

  useEffect(() => {
    const [ webAdapter, notifyAdapter ] = createWebAdapter({ handleMessage })

    setAdapter({ notify: notifyAdapter })
    const bot = orbitalFrame(webAdapter, {
      name,
      commands: [ ...coreCommands, ...extraCommands ],
      plugins: [ didYouMean, errorTrap ]
    })
    bot.run()
  }, [ handleMessage ])

  return (
    <Terminal
      title={startCase(`orbital frame ${name}`)}
      prompt={`${name}>`}
      onEnter={handleEnter}
      onArrowUp={handleArrowUp}
      onArrowDown={handleArrowDown}
      value={output.map(({ text }) => text)}
      input={terminalInput}
      height='400px'
    />
  )
}
