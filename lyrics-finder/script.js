//grab elements
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

//url for fetch call
const apiURL = 'https://api.lyrics.ovh';

//function to search for songs or artist that match term
async function searchSongs(term) {
  //await the responses and store them into variables
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  //display data
  showData(data);
}

//show song and artist DOM
function showData(data) {
  //output variable
  let output = '';

  //loop through each song and display each as <li>
  data.data.forEach(song => {
    output += `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">See Lyrics</button>
      </li>
    `;
  });

  result.innerHTML = `
    <ul class="songs">
      ${output}
    </ul>
  `;

  //check if there are more songs
  if (data.prev || data.next) {
    //set the pagination
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
    `;
  } else {
    //if there is not more songs
    more.innerHTML = '';
  }
}

//function to get more songs for pagination (prev and next)
async function getMoreSongs(url) {
  //await the responses and store them into variables
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  //display data
  showData(data);
}

//get the lyrics with song and artist
async function getLyrics(artist, songTitle) {
  //await the responses and store them into variables
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  //use regex to replace with <br> and store into lyrics variable
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  //insert lyrics with artist and title in the container
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

  //do not show prev and next buttons
  more.innerHTML = '';
}


//event listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  //grab value from search bar
  const searchTerm = search.value.trim()

  //check if they typed something
  if (!searchTerm) {
    alert('Please type a search term');
  } else {
    //search the song
    searchSongs(searchTerm);
  }
})

//event listeners for getting lyrics
result.addEventListener('click', e => {
  //click target
  const clickedEl = e.target;

  //check if the tagname of the clicked element is the button
  if (clickedEl.tagName === 'BUTTON') {
    //get the artist from data attribute
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    //get the lyrics
    getLyrics(artist, songTitle);
  }
})
