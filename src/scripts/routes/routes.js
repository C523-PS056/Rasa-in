import Artikel from '../views/pages/artikel';
import ArtikelDetail from '../views/pages/artikel-detail';
import Beranda from '../views/pages/beranda';
import Favorit from '../views/pages/favorit';
import Resep from '../views/pages/resep';
import ResepDetail from '../views/pages/resep-detail';
import TambahArtikel from '../views/pages/tambah-artikel';

const routes = {
  '/': Beranda, // default page
  '/resep': Resep,
  '/favorit': Favorit,
  '/artikel': Artikel,
  '/tambah-artikel': TambahArtikel,
  '/detail/:id': ResepDetail,
  '/artikel/:id': ArtikelDetail,
};

export default routes;
