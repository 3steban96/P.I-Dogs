import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import Landing from './components/Views/LandingPage/LandingPage';
import Home from './components/Views/Home/Home';
import Details from './components/Views/Details/Details';
import Form from './components/Views/Form/Form';

function App() {
  return (
    <BrowserRouter>
        <Route path='/'exact component={Landing}/>
        <Route path='/home'exact component={Home}/>
        <Route path='/details/:id'exact component={Details}/>
        <Route path='/form'exact component={Form}/>
    </BrowserRouter>
  );
}

export default App;
