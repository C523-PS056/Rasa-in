import Artikel from '../views/pages/artikel';
import Beranda from '../views/pages/beranda';
import Favorit from '../views/pages/favorit';
import Resep from '../views/pages/resep';

const routes = {
  '/': Beranda, // default page
  '/beranda': Beranda,
  '/resep': Resep,
  '/favorit': Favorit,
  '/artikel': Artikel,
};

export default routes;
