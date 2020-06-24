import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store, persistor } from '../src/store/';
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react';

/*PÁGINAS*/
import Login from './Pages/login/';
import NovoUsuario from './Pages/Register/';
import Home from './Pages/home/';
import ResetPassword from './Pages/usuario-recuperar-senha/';
import New from './Pages/New/';
import ContractDetails from './Pages/Details/';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route path='/contracts/:parametro' component={Home} />
        <Route exact path='/register' component={NovoUsuario} />
        <Route exact path='/usuariorecuperarsenha' component={ResetPassword} />
        <Route exact path='/new' component={New} />
        <Route path='/contractDetails/:id' component={ContractDetails} />
        <Route path='/editContract/:id' component={ContractDetails} />
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
