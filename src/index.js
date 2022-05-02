import './css/styles.css';
import { fetchIt } from './fetch';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const newSth = 5;
const sdf = 6;
Notify.init({
  clickToClose: true,
  position: 'center-top',
});
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');

inputRef.addEventListener('input', debounce(onInputType, DEBOUNCE_DELAY));

function onInputType(event) {
  const countryDiv = document.querySelector('.country-info');
  const inputValue = event.target.value.trim();

  const params = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  const URL = `https://restcountries.com/v3.1/name/${inputValue}?${params}`;
  countryDiv.innerHTML = '';
  fetchIt(inputValue, URL)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else {
        const countriesMarkup =
          data.length !== 1
            ? data
                .map(element => {
                  return `
                    <div class="flex-country">
                    <img class="image" width="70" src="${element.flags.svg}"/>
                    <p class="name-less">${element.name.official}</p>
                    </div>
                    `;
                })
                .join('')
            : `<div class="flex-country"><img class="image" width="60" height="40" src="${
                data[0].flags.svg
              }" />
              <p class="country-name">${data[0].name.official}</p>
              </div>
              <p class="info">Capital: <span class="info-thin">${data[0].capital}</span></p>
              <p class="info">Population: <span class="info-thin">${data[0].population}</span></p>
              <p class="info">Languages: <span class="info-thin">${Object.values(
                data[0].languages,
              )}</span></p>
              `;
        countryDiv.innerHTML = countriesMarkup;
        console.log(countriesMarkup);
      }
    })
    .catch(console.log(error));
}
