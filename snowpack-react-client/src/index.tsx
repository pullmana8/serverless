import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeAuthRouting } from './routing'


ReactDOM.render(makeAuthRouting(), document.getElementById('root'))

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
