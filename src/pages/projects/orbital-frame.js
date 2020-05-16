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
        <li>Jobs</li>
        <li>Pipes</li>
        <li>Signals</li>
        <li>Variables</li>
        <li>Scripting</li>
      </ul>
      <p>
        It is designed to run basically everywhere through the use of adapters. Though it was built with chat services such as Slack and Discord in mind,
        it can even run on the web as in the demo below which is running entirely client side. It features a robust plugin system for further extending bot capabilities beyond what's possible via functions.
        For the full project description, see the <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core/README.md" target="_blank" rel="noopener noreferrer">README</a>.
      </p>
      <p>
        The demo below is Orbital Frame running on a custom web adapter with interaction provided through a React terminal emulator. The bot commands are provided by <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core-commands/README.md" target="_blank" rel="noopener noreferrer">@orbital-frame/core-commands</a> which
        are a set of basic commands to help you get up and running quickly. If you're looking for a prebuilt bot which is able to run on most chat services, check out <a href="https://github.com/konapun/orbital-frame/tree/master/packages/orbital-frame-jehuty" target="_blank" rel="noopener noreferrer">@orbital-frame/jehuty</a> which is configured to run on Hubot.
        A description of capabilities and examples are given below.
      </p>
      <div ref={demo}>
        <OrbitalFrameConsole input={input}/>
      </div>
      <div className="alert alert-info mt-3">
        <h3 className="mt-3">Examples</h3>
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

      <h2 className="mt-4">Commands</h2>
      <p>
        Commands can be called with arguments and options. The options and option types a command accepts are provided by the command's author in the command definition. A detailed explanation for command authors is provided <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core/README.md#Commands" target="_blank" rel="noopener noreferrer">here</a>.
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

      <h3 className="mt-3">Options</h3>
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

      <h3 className="mt-3">Interpolations</h3>
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

      <h3 className="mt-3">Interactions</h3>
      <p>
        Some commands start an interactive session where the command can receive nonblocking input throughout its lifespan. The interaction character is configurable based on your bot but defaults to >. For full details, see documentation in the @orbital-frame/core <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core/README.md#Interactive%20Commands" target="_blank" rel="noopener noreferrer">README</a>:
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

      <h3 className="mt-3">Jobs</h3>
      <p>
        When user input is entered it is assigned to a job. A job is in one of four states:
      </p>
      <ul>
        <dl>
          <dt>Pending</dt>
          <dd>A job begins its lifecycle in the pending state.</dd>
          <dt>Running</dt>
          <dd>Once a job begins execution, it is moved to the running state and remains there until it is either fulfilled or rejected.</dd>
          <dt>Fulfilled</dt>
          <dd>Upon success, a job moves to the terminal fulfilled state.</dd>
          <dt>Rejected</dt>
          <dd>Upon error, a job moves to the terminal rejected state.</dd>
        </dl>
      </ul>
      <p>
        Along with its current state, a job contains its ID, a user-local ID, the ID of the user who started the job, the
        job's context which is used for interaction with the chat service, a command object for the command that belongs to
        the job, the source code input by the user which spawned the job, the date the job was started, the date the job was
        finished (or null if the job hasn't reached a terminal state), and the job's output if it is in a finished state.
      </p>

      <h4>Foregrounding</h4>
      <p>
        Because multiple interactive commands can be run at once, you may want to change which job is foregrounded. If you're
        using @orbital-frame/core-commands, there is a bundled <code>fg</code> command to handle this for you. Otherwise, the
        source is terse enough to add it yourself:
      </p>
      <div className='alert alert-info'>
        <pre>
          <code>
            <div>
              {`export default ({ jobService, interactionService }) => ({
  name: 'fg',
  synopsis: 'fg [JOB ID]',
  description: 'Foreground an interactive job',
  async execute ([ jobId ]) {
    const { userId } = await jobService.findOne({ 'command.pid': this.pid })

    await interactionService.foreground(userId, jobId)
  }
})`}
            </div>
          </code>
        </pre>
      </div>

      <h2 className="mt-4">Pipes</h2>
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

      <h2 className="mt-4">Variables</h2>
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

      <h2 className="mt-4">Signals</h2>
      <p>
        Commands can be written to respond to signals, such as signals to pause or exit immediately. For full documentation, see the entry in the @orbital-frame/core <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core/README.md#signalService" target="_blank" rel="noopener noreferrer">README</a>.
      </p>

      <h2 className="mt-4">Functions</h2>
      <p>
        Like Bash, the Orbital Frame command line supports two forms of functions which are equivalent in the AST so it's a matter of your personal style:
      </p>
      <h3 className="mt-3">Form 1</h3>
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
      <h3 className="mt-3">Form 2</h3>
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
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              {tryFunction}
            </div>
          </code>
        </pre>
        <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryFunction)}>Try It</button>
      </div>

      <h3 className="mt-3">Scoping</h3>
      <p>
        By default, all variables are declared in the global scope. If you want to instead use lexical scoping, use the local keyword inside your function block:
      </p>
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              {`MY_VAR=outer

function set_var {
  local MY_VAR=inner
  echo $MY_VAR
}

set_var # echoes "inner"
echo $MY_VAR # echoes "outer"`}
            </div>
          </code>
        </pre>
      </div>
      <h3 className="mt-3">Control Structures</h3>
      <p>
        To keep the syntax simple, the Orbital Frame grammar does not include any control structures such as if statements or loops but these can be easily replicated using commands.
        @orbital-frame/core-commands includes the following logical commands:
      </p>
      <ul>
        <li>
          <code>and</code>
        </li>
        <li>
          <code>or</code>
        </li>
        <li>
          <code>not</code>
        </li>
        <li>
          <code>true</code>
        </li>
        <li>
          <code>false</code>
        </li>
        <li>
          <code>if</code>
        </li>
      </ul>
      <p>
        Here is an additional example using commands loaded into ifrit which demonstrates how to do branching using the if and and commands rather than dedicated control structures:
      </p>
      <div className='alert alert-info d-flex justify-content-between'>
        <pre>
          <code>
            <div>
              {tryControlStructure}
            </div>
          </code>
        </pre>
        <button type='button' className='btn btn-link text-primary' onClick={() => handleTryIt(tryControlStructure)}>Try It</button>
      </div>
    </ProjectLayout>
  )
}

const tryCommand = '@ifrit echo hello'
const tryCommandWithOptions = '@ifrit choose -n 2 option1 option2 option3 option4'
const tryVariable = '@ifrit MY_VAR="a variable"; echo $MY_VAR'
const tryInterpolation = '@ifrit echo "three plus two is " $(calc 3 + 2)'
const tryPipe = "@ifrit echo category | split -d '' | head -n 3 | join -g ''"
const tryInteraction = '@ifrit interact'
const tryFunction = `@ifrit function say_hello {
  echo "Hello, " $1
}
`
const tryControlStructure = `@ifrit function analyze_length {
  local WORD=$1
  local LOWER=$2
  local UPPER=$3
  local WORD_LENGTH=$(split -d '' $WORD | length)

  if $(and $(greater-than $WORD_LENGTH $LOWER) $(less-than $WORD_LENGTH $UPPER)) "String is valid" "String is invalid"
}
`
