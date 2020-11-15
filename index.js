'use strict';


const accept = "application/vnd.github.v3+json";
const searchURL = 'https://api.github.com/users/';


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through repos
  for (let i = 0; i < responseJson.length; i++){
    //add a list item to the results 
    //display the repo name and link to the repo URL
    $('#results-list').append(
      `     
      <li>
        <h3><a href="${responseJson[i].owner.html_url}" target=_black>${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(userName) {
  
  const url = searchURL + `${userName}` + "/repos";
  console.log(url);

  const options = {
    headers: new Headers({
      "accept": accept})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      $('#results-list').empty();
      $('#results h2').hide();
      $('#js-error-message').show();
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    $('#js-error-message').hide();
    event.preventDefault();
    const searchUser = $('#js-search-term').val();
    
    getRepos(searchUser);
  });
}

$(watchForm);