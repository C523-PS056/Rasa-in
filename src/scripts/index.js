import 'regenerator-runtime';
import 'boxicons/css/boxicons.min.css';
import '../styles/style.css';
import '../styles/responsive.css';
import '@splidejs/splide/css';
import App from './views/app';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
});
