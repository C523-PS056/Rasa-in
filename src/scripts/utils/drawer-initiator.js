import UrlParser from '../routes/url-parser';

const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
      this._markActiveLink();
    });

    drawer.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },

  _markActiveLink() {
    const currentPath = UrlParser.parseActiveUrlWithCombiner();
    const navLinks = document.querySelectorAll('.app-bar__navigation ul li a');

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute('href');
      if (linkPath === `#${currentPath}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },
};

export default DrawerInitiator;
