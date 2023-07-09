import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import topTracks from './pages/topTracks';
import RecommendedTracks from './pages/RecommendedTracks';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route Component={Login} path='/' exact/>
          <Route Component={Home} path='/home' exact/>
          <Route Component={topTracks} path='/toptracks' exact></Route>
          <Route Component={RecommendedTracks} path='/recommendations' exact></Route>
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
