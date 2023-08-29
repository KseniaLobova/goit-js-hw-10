import axios from "axios";
import Notiflix from 'notiflix'
const BASE_URL = 'https://api.thecatapi.com/v1'


function fetchBreeds() {
return axios.get(`${BASE_URL}/breeds`)
    .then(function (response) {
      return response.data
      
 })
    .catch(function (error) {
      throw new Error(Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!"))
  });
}

fetchBreeds()

 
function fetchCatByBreed(breedId) {
       return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(function (response) {
   return response.data
   ;
  })
    .catch(function (error) {
      throw new Error(Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!"))

  
  });
}
fetchCatByBreed()
export {fetchBreeds, fetchCatByBreed}