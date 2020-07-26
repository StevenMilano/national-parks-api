'use strict'

var apiKey = 'fSlqRvMS83lE3edMJf5WVdvFo0YqPfV4NkWR5kAd';
var searchURL= 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    var qureyItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return qureyItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><a href='${responseJson.data[i].url}'><h3>${responseJson.data[i].fullName}</h3></a>
            <p>${responseJson.data[i].description}</p>
            </li>`
          )};
    $('#results').removeClass('hidden');
}

function getParks(querry, limit=10) {
    var params = {
        api_key: apiKey,
        stateCode: querry,
        limit,
    };
    var queryString = formatQueryParams(params)
    var url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(respone => {
            if(respone.ok) {
                return respone.json();
            }
            throw new Error(respone.statusText);
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
        getParks(searchTerm, limit);
    });
}

$(watchForm);

