import React, { useState, useCallback, useRef } from 'react'
import ProjectLayout from '../../components/layout/ProjectLayout'
import OrbitalFrameConsole from '../../components/projects/orbitalFrame/Console'

export const metadata = {
  id: 'orbital-frame',
  name: 'Orbital Frame',
  description: 'Unleash the power of UNIX in your chatbot!',
  link: 'https://github.com/konapun/orbital-frame'
}

export default () => {
  const [ input, setInput ] = useState('')
  const demo = useRef(null)

  const handleTryIt = useCallback(source => {
    if (demo && demo.current) {
      demo.current.scrollIntoView({ behavior: 'smooth' })
    }
    setInput(source)
  }, [ setInput ])

  return (
    <ProjectLayout
      title='Orbital Frame'
      description={metadata.description}
      link={metadata.link}
    >
      <p>
        <span className="font-weight-bold">Orbital Frame</span> is a framework for building chatbots which support UNIX-like concepts such as:
      </p>
      <ul>
        <li>Commands</li>
        <li>Pipes</li>
        <li>Signals</li>
        <li>Variables</li>
        <li>Scripting</li>
      </ul>
      <p>
      It is designed to run basically everywhere through the use of adapters. Though it was built with chat services such as Slack and Discord in mind,
      it can even run on the web as in the demo below which is running entirely client side. For the full project description, see the <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core/README.md" target="_blank">README</a>.
      </p>
      <p>
        The demo below is Orbital Frame running on a custom web adapter with interaction provided through a React terminal emulator. The bot commands are provided by <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core-commands/README.md" target="_blank">@orbital-frame/core-commands</a> which
        are a set of basic commands to help you get up and running quickly. If you're looking for a prebuilt bot which is able to run on most chat services, check out <a href="https://github.com/konapun/orbital-frame/tree/master/packages/orbital-frame-jehuty" target="_blank">@orbital-frame/jehuty</a> which is configured to run on Hubot.
        A description of capabilities and examples are given below.
      </p>
      <div ref={demo}>
        <OrbitalFrameConsole input={input}/>
      </div>
      <div className="alert alert-info mt-3">
        <h3>Examples</h3>
        <pre>
          <code>
            <div>
              @ifrit help
            </div>
            <div>
              @ifrit help choose
            </div>
            <div>
              @ifrit choose -n 2 one two three four
            </div>
          </code>
        </pre>
      </div>
      <hr/>

      <h2>Commands</h2>
      <p>
        Commands can be called with arguments and options. The options and option types a command accepts are provided by the command's author in the command definition. A detailed explanation for command authors is provided <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core/README.md#Commands" target="_blank">here</a>.
      </p>
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              {tryCommand}
            </div>
          </code>
        </pre>
        <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryCommand)}>Try It</button>
      </div>

      <h3>Options</h3>
      <p>
        Command options can either be valued or boolean, which is defined in the command itself.Command options can be either short form or long form:
      </p>
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              some_command --long_option option_value
            </div>
            <div>
              # or
            </div>
            <div>
              some_command -s option_value
            </div>
          </code>
        </pre>
        <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryCommandWithOptions)}>Try It</button>
      </div>
      <p>
        Unlike long options, short options can be chained. In this example, here, a, b, c, and d are all options. a, b, and c are boolean options while d is being passed the argument "arg".
      </p>
      <div className='alert alert-info'>
        <pre>
          <code>
            some_command -abcd arg
          </code>
        </pre>
      </div>

      <h3>Interpolations</h3>
      <p>
        Commands can be immediately evaluated for use as arguments, option values, etc. by surrounding the command or pipeline with <code>$()</code>:
      </p>
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              {tryInterpolation}
            </div>
          </code>
        </pre>
        <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryInterpolation)}>Try It</button>
      </div>

      <h3>Interactions</h3>
      <p>
        Some commands start an interactive session where the command can receive nonblocking input throughout its lifespan. The interaction character is configurable based on your bot but defaults to >. For full details, see documentation in the @orbital-frame/core <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core/README.md#Interactive%20Commands" target="_blank">README</a>:
      </p>
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              {tryInteraction}
            </div>
          </code>
        </pre>
        <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryInteraction)}>Try It</button>
      </div>

      <h2>Pipes</h2>
      <p>
        Pipes are pipelines of commands (or functions) who pass their output as input into the next pipe.
      </p>
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              {tryPipe}
            </div>
          </code>
        </pre>
        <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryPipe)}>Try It</button>
      </div>

      <h2>Variables</h2>
      <p>
        Variables are key/value pairs:
      </p>
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              {tryVariable}
            </div>
          </code>
        </pre>
        <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryVariable)}>Try It</button>
      </div>

      <h2>Signals</h2>
      <p>
        Commands can be written to respond to signals, such as signals to pause or exit immediately.
      </p>
      <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(trySignal)}>Try It</button>

      <h2>Functions</h2>
      <p>
        Like Bash, the Orbital Frame command line supports two forms of functions which are equivalent in the AST so it's a matter of your personal style:
      </p>
      <h3>Form 1</h3>
      <div className='alert alert-info'>
        <pre>
          <code>
            <div>
              {`function my_function {
  echo "This is form 1"
}`}
            </div>
          </code>
        </pre>
      </div>
      <h3>Form 2</h3>
      <div className='alert alert-info'>
        <pre>
          <code>
            <div>
              {`my_function () {
  echo "this is form 2"
}`}
            </div>
          </code>
        </pre>
      </div>
      <p>
        Like Bash, function arguments are given through positional environment variables $1 through $n, so even in the second form where parentheses are used, no parameters can be listed.
      </p>
      <div className='alert alert-info'>
        <pre>
          <code>
            <div>
              {`function say_hello {
  echo Hello, $1
}

say_hello konapun # displays "Hello, konapun"`}
            </div>
          </code>
        </pre>
      </div>
      <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryFunction)}>Try It</button>

      <h2>Control Structures</h2>
      <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryControlStructure)}>Try It</button>
    </ProjectLayout>
  )
}

const tryCommand = '@ifrit echo hello'
const tryCommandWithOptions = '@ifrit choose -n 2 option1 option2 option3 option4'
const tryVariable = '@ifrit MY_VAR="a variable"; echo $MY_VAR'
const tryInterpolation = '@ifrit echo TODO' // TODO
const tryPipe = "@ifrit echo hello | split -d '' | head -n 4 | join"
const trySignal = '@ifrit echo TODO' // TODO
const tryInteraction = '@ifrit echo TODO' // TODO
const tryFunction = `@ifrit function analyze_length {
  local WORD=$1
  local LOWER=$2
  local UPPER=$3
  local WORD_LENGTH=$(split -d '' $WORD | length)

  if $(and $(greater-than $WORD_LENGTH $LOWER) $(less-than $WORD_LENGTH $UPPER)) "String is valid" "String is invalid"
}
`
const tryControlStructure = '@ifrit echo TODO' // TODO
