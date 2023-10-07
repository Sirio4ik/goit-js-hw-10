import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const catSelect = document.querySelector('select.breed-select');
const preloader = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const infoAboutCat = document.querySelector('.cat-info');

catSelect.style.display = 'none';
preloader.textContent = '';

function createSelectList(breeds) {
  breeds.forEach(breed => {
    const option = new Option(breed.name, breed.id);
    catSelect.appendChild(option);
  });

  catSelect.style.display = 'block';
  preloader.style.display = 'none';
  new SlimSelect({
    select: '.breed-select',
    settings: {
      showSearch: false,
    },
  });
}

function catInfoRender(cat) {
  infoAboutCat.innerHTML = `
    <img src="${cat[0].url}">
    <div class="cat-info__text">
      <h1>${cat[0].breeds[0].name}</h1>
      <p><span>${cat[0].breeds[0].description}</span></p>
      <p><strong>Temperament:</strong> <span>${cat[0].breeds[0].temperament}</span></p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  catSelect.addEventListener('change', () => {
    const selectedBreedId = catSelect.value;

    preloader.style.display = 'block';
    preloader.textContent = '';
    errorText.style.display = 'none';
    infoAboutCat.innerHTML = '';

    fetchCatByBreed(selectedBreedId)
      .then(catInfoRender)
      .catch(error => {
        console.error('Error fetching cat:', error);
        errorText.style.display = 'block';
        errorText.textContent =
          'Oops! Something went wrong! Try reloading the page!';
      })
      .finally(() => {
        preloader.style.display = 'none';
      });
  });

  fetchBreeds()
    .then(createSelectList)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      errorText.style.display = 'block';
      errorText.textContent =
        'Oops! Something went wrong! Try reloading the page!';
      preloader.style.display = 'none';
    });
});
