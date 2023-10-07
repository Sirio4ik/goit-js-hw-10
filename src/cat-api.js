const KEY =
  'live_7vD52lSAeJSSXmLTbJx9zGXWGejx0kS77JIPsp1fpb7uS5gTEPz4rrmqZXC7jXE9';

function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${KEY}`).then(
    response => {
      return response.json();
    }
  );
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${KEY}`
  ).then(response => {
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
