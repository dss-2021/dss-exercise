import DisHomeScreen from './screens/home';
import './styles.css';

document.body.appendChild(
  new DisHomeScreen()
);

console.log(`Note for reviewers:
  This implementation is targeted for the latest Firefox & Chrome.
  (Tested in Firefox 86 & Chrome 89.)`);
