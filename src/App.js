import Labs from './components/Labs'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'

function App() {
  let imageClick = e => {
    axios.post('/labs/1', { 'abc': '123' })
      // axios.get('/labs')
      .then(res => res.data)
      .then(data => console.log(data))
  }

  return (
    <Labs />
  );
}

export default App;
