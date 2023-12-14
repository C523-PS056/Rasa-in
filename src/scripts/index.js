/* eslint-disable import/no-unresolved */
import 'regenerator-runtime';
import 'boxicons/css/boxicons.min.css';
import '../styles/style.css';
import '../styles/responsive.css';
import '@splidejs/splide/css';
import App from './views/app';
import scrollToTop from './utils/scroll-to-top';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  scrollToTop();
});

const favicon = document.querySelector('link[rel="icon"]');

if (
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  favicon.href = './favicon-dark.png';
} else {
  favicon.href = './favicon.png';
}

const header = document.querySelector('.app-bar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  scrollHide();
});

function scrollHide() {
  const st = window.scrollY || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScrollTop = st <= 0 ? 0 : st;
}

window.addEventListener('load', async () => {
  app.renderPage();
  scrollToTop();
  swRegister();
});
