/* eslint-disable no-param-reassign */
import { addArticleTemplate } from '../templates/template-creator';

const TambahArtikel = {
  async render() {
    return `
        <section class="add-article page">
          ${addArticleTemplate()}
          <div class="loading-popup" id="loadingPopup">
            <div class="popup-container">
            <div class="popup-icon">
            <i class='bx bx-loader-alt bx-spin' ></i>
            </div>
              <span class="popup-content">Mengirim...</span>
            </div>
          </div>
          <div class="popup" id="successPopup">
          <div class="popup-container" >
          <div class="popup-icon">
          <i class='bx bx-check-circle bx-tada' ></i>
          </div>
            <span class="popup-content">Artikel berhasil ditambahkan!</span>
            <button class="close-button" >Oke</button>
            </div>
          </div>
          <div class="popup" id="errorPopup">
            <div class="popup-container" >
            <div class="popup-icon">
            <i class='bx bx-x-circle bx-tada bx-rotate-90' ></i>
            </div>
            <span class="popup-content">Gagal menambah artikel.<br> Silakan coba lagi.</span>
            <button class="close-button">Oke</button>
          </div>
          </div>
        </section>
      `;
  },

  async afterRender() {
    document.getElementById('thumb').addEventListener('change', (event) => {
      checkFileSize(event.target);
    });

    document
      .getElementById('articleForm')
      .addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        submitForm();
      });
    document.getElementById('successPopup').addEventListener('click', () => {
      closePopup('successPopup');
    });
    document.getElementById('errorPopup').addEventListener('click', () => {
      closePopup('errorPopup');
    });

    dropImage();
  },
};

function closePopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
}

function submitForm() {
  const formData = new FormData(document.getElementById('articleForm'));

  // Menampilkan popup loading
  document.getElementById('loadingPopup').style.display = 'block';

  fetch('https://rasa-in-backend.vercel.app/api/articles', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Artikel berhasil ditambahkan:', data);

      // Menyembunyikan popup loading
      document.getElementById('loadingPopup').style.display = 'none';

      // Menampilkan popup success
      document.getElementById('successPopup').style.display = 'block';

      clearForm();

      // Handle response or redirect to another page if needed
    })
    .catch((error) => {
      console.error('Gagal menambah artikel:', error);

      // Menyembunyikan popup loading
      document.getElementById('loadingPopup').style.display = 'none';

      // Menampilkan popup error
      document.getElementById('errorPopup').style.display = 'block';

      // Handle error, e.g., display an error message to the user
    });
}

function dropImage() {
  const dropContainer = document.getElementById('dropContainer');
  const fileInput = document.getElementById('thumb');

  dropContainer.addEventListener(
    'dragover',
    (e) => {
      // prevent default to allow drop
      e.preventDefault();
    },
    false,
  );

  dropContainer.addEventListener('dragenter', () => {
    dropContainer.classList.add('drag-active');
  });

  dropContainer.addEventListener('dragleave', () => {
    dropContainer.classList.remove('drag-active');
  });

  dropContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    dropContainer.classList.remove('drag-active');
    fileInput.files = e.dataTransfer.files;
  });
}
function clearForm() {
  const form = document.getElementById('articleForm');
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach((input) => {
    // Mengosongkan nilai input atau textarea
    input.value = '';

    // Menghapus kelas error jika ada
    input.classList.remove('error');
    input.parentNode.classList.remove('error');
  });

  // Reset juga file input jika ada
  const fileInput = document.getElementById('thumb');
  fileInput.value = '';
}

function checkFileSize(input) {
  const maxFileSizeInBytes = 2097152; // 2 MB
  const errorMessageContainer = document.getElementById('fileSizeError');

  if (input.files.length > 0) {
    const fileSize = input.files[0].size;
    if (fileSize > maxFileSizeInBytes) {
      errorMessageContainer.textContent = '* File terlalu besar. Maksimum 2 MB.';
      input.value = ''; // Mengosongkan input file
    } else {
      errorMessageContainer.textContent = ''; // Menghapus pesan kesalahan jika ukuran file sesuai
    }
  }
}

export default TambahArtikel;
