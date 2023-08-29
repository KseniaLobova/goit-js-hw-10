import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_QSflvgjHhUiQTJFJ7ABEwjBpwpdcdJzzl99LRzNUb8Rg0b14cD8wWPlIEsFQuMJb"
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css'

import {fetchBreeds, fetchCatByBreed} from "./cat-api"


const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
console.log(loader)
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info')

select.addEventListener('change', onSelectChange);
error.classList.add('is-hidden')


 select.classList.add('is-hidden')



// список котів
function getList() {

  fetchBreeds().then(data => {
         console.log(data)
  const catList = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join(' ');
            select.innerHTML = catList;
         
        new SlimSelect({
            select: select
})
      loader.classList.add('is-hidden')
        select.classList.remove('is-hidden')
    })
     .catch(error => {
           Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
        });
   
   
}
getList()


// вибір котика
function onSelectChange(evt) {
    select.classList.add('is-hidden')
  catInfo.classList.add('is-hidden')
    loader.classList.remove('is-hidden')
     
//   console.log(evt.target.value)
    const selectedId = evt.target.value;
 
    //   console.log(selectedId)
    fetchCatByBreed(selectedId)
        .then(data => {
              
            creatMarkup(data)
catInfo.classList.remove('is-hidden')
        })
      
        
    .catch(err=> Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!"))
}



//витягуємо інфу кота
function creatMarkup(data) {
 
    const { url, breeds } = data[0];
    const { temperament, description, name } = breeds[0];

    const catMarkup = ` <img src="${url}" alt="${name}">
  <div class='cat-description'>
      <h1 class='cat-name'>${name}</h1>
       <p>${description}</p>
       <p ><span clas="cat-temperament">Temperament: </span>${temperament}</p>
       </div>`
    catInfo.innerHTML = catMarkup;
    console.log(catMarkup)
    loader.classList.add('is-hidden')
}

