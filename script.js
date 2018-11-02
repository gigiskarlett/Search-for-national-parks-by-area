'use strict';

const api_key = 'ed3Ki5hynx0sSE0FokVmvOFmNoulXDIPZadaX7Go'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

  for (let i = 1; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>Link: <a href="${responseJson.data[i].url} "target="_blank">${responseJson.data[i].url}</a></p>
        <h4>Description: </h4>
        <p> ${responseJson.data[i].description}</p>
        <h4>Directions: </h4>
        <p><a href="${responseJson.data[i].directionsUrl} "target="_blank">${responseJson.data[i].directionsUrl}</a></p>
      </li>`
    )};

  $('#results').removeClass('hidden');
};

function getNationalParkData(query, limit=10) {
  const params = {
    key: api_key,
    q: query,
    limit: limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getNationalParkData(searchTerm, limit);
  });
}

$(watchForm);