import { Sandpack } from "@codesandbox/sandpack-react"
import theme from './theme'

const CodePreview = ({ code, title, showTabs = true, showNavigator = true }) => {

   const files = {
      '/index.html': `<!DOCTYPE html>
<html>

<head>
  <title>ID Sandbox</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="/styles.css" />
</head>

<body>
  <h1>Hello world</h1>
</body>

</html>`,

      '/styles.css': {
         code: `body {
   font-family: sans-serif;
   background-color: #eee;
   padding: 20px;
}

h1 {
   color: blue;
}`,
         active: true,
      },
   }
   return (
      <Sandpack
         className="code-preview"
         files={files}
         theme={theme}
         template="static"
         options={{
            showConsoleButton: false,
            showInlineErrors: true,
            showNavigator: false,
            showLineNumbers: true,
            showTabs: true,
            editorHeight: "50vb"
         }}
      />
   )
}

export { CodePreview }