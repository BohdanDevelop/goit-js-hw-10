export function fetchIt(inputValue, URL) {
  if (inputValue) {
    return fetch(URL).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}
