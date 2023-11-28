const Pagination = {
  currentPage: 1,
  totalPages: 10,

  init(totalPages) {
    this.totalPages = totalPages;
    this.render();
  },

  createButton(text, page) {
    const button = document.createElement('li');
    button.innerHTML = `<a href="#" data-page="${page}">${text}</a>`;
    return button;
  },

  render() {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    const previousButton = this.createButton('&laquo;', this.currentPage - 1);
    paginationElement.appendChild(previousButton);
    previousButton.addEventListener('click', (event) => {
      event.preventDefault();
      const newPage = this.currentPage - 1;
      if (newPage >= 1) {
        this.setCurrentPage(newPage);
      }
    });

    for (let i = 1; i <= this.totalPages; i++) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="#" data-page="${i}">${i}</a>`;

      if (i === this.currentPage) {
        listItem.classList.add('active');
      }

      paginationElement.appendChild(listItem);

      listItem.addEventListener('click', (event) => {
        event.preventDefault();
        this.setCurrentPage(parseInt(event.target.dataset.page, 10));
      });
    }

    const nextButton = this.createButton('&raquo;', this.currentPage + 1);
    paginationElement.appendChild(nextButton);
    nextButton.addEventListener('click', (event) => {
      event.preventDefault();
      const newPage = this.currentPage + 1;
      if (newPage <= this.totalPages) {
        this.setCurrentPage(newPage);
      }
    });
  },

  setCurrentPage(page) {
    this.currentPage = page;
    // Panggil fungsi untuk menampilkan resep sesuai halaman baru
    Resep.afterRender(page);
  },
};

export default Pagination;
