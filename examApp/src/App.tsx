import reactLogo from './assets/react.svg'
import tsLogo from './assets/ts-logo-128.svg'
import viteLogo from '/vite.svg'
import gitLogo from './assets/Git-Icon.svg'
import './App.css'
import TestContainer from './components/TestComponent'

function App() {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src={tsLogo} className="logo" alt="TS logo" />
        </a>

        <TestContainer />

        <a href="https://github.com/Geegtor" target="_blank">
          <img src={gitLogo} className="logo" alt="MyGit" />
        </a>
        
      </div>
    </>
  )
}

export default App
