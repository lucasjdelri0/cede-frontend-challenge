import { Button } from 'antd'
import Page from 'components/layout/Page'
import logo from './logo.svg'
import './App.css'

const App = (): JSX.Element => {
  return (
    <Page>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          <Button type='primary'>My Button</Button>
        </header>
      </div>
    </Page>
  )
}

export default App
