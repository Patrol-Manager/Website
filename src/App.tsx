import './App.css'
import Layout from './layout'
import { WebsiteSocketProvider } from './providers/socket-io'

function App() {
  return (
    <WebsiteSocketProvider> 
    <Layout />
    </WebsiteSocketProvider>
  )
}

export default App
