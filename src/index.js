import './css/styles.css';
import { onInputType } from './fetch';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');

inputRef.addEventListener('input', debounce(onInputType, DEBOUNCE_DELAY));
