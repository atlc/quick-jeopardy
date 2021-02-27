import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

interface AppProps { };

export default App;