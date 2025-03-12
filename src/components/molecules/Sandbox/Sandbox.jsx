import { Sandpack } from "@codesandbox/sandpack-react"
import theme from './theme'

const defaultOptions = {
   showConsoleButton: true,
   showInlineErrors: true,
   showNavigator: false,
   showLineNumbers: true,
   showTabs: true,
   editorHeight: "50vb",
}

const Sandbox = ({ files, title = '', template = 'static', options = {} }) => {
   options = { ...defaultOptions, ...options }
   return (
      <div className="sandbox container__content--main">
         { title && <h3 className='sandbox__title'>{ title }</h3> }
         <div className="sandbox__container">
            <Sandpack
               className="sandpack"
               files={files}
               theme={theme}
               template={template}
               options={options}
            />
         </div>
      </div>
   )
}

export { Sandbox }