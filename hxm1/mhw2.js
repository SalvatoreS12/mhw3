function createImage(src){
    const image=document.createElement('img');
    image.src=src;
    return image;
}
function onThumbnailClick(event){
const image=createImage("Inizio.png");
modalView.innerHTML = '';
modalView.appendChild(image);
modalView.classList.remove('hidden');
}
function onModalClick(){
    modalView.classList.add('hidden');
    modalView.innerHTML='';
}
const playButton = document.querySelector('.playbutton');
const modalView = document.querySelector('#modal-view');
playButton.addEventListener('click', onThumbnailClick);
modalView.addEventListener('click',onModalClick);
//
const toggleButton = document.querySelector('.nav-btn5');
const searchContainer = document.querySelector('#searchContainer');

toggleButton.addEventListener('click', function (event) {
  event.stopPropagation();
  searchContainer.classList.remove('Hidden');
});

searchContainer.addEventListener('click', function (event) {
  event.stopPropagation();
});


document.addEventListener('click', function () {
  searchContainer.classList.add('Hidden');
});
//
function onJson(json) {
  console.log('JSON ricevuto');
  // Svuotiamo la libreria
  const library = document.querySelector('#library-view');
  library.innerHTML = '';
  // Leggi il numero di risultati
  let num_results = json.data.length;
  
  console.log(num_results);
  // Mostriamone al massimo 10
  if(num_results > 10)
    num_results = 10;
  // Processa ciascun risultato
  for(let i=0; i<num_results; i++)
  {
    // Leggi il documento
    const doc = json.data[i]
    // Leggiamo info
    const title = doc.title;
    // Costruiamo l'URL della copertina
    const cover_url = doc.images.jpg.image_url;
    console.log(cover_url);
    // Creiamo il div che conterrà immagine e didascalia
    const book = document.createElement('div');
    book.classList.add('book');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = cover_url;
    // Creiamo la didascalia
    const caption = document.createElement('span');
    caption.textContent = title;
    // Aggiungiamo immagine e didascalia al div
    book.appendChild(img);
    book.appendChild(caption);
    // Aggiungiamo il div alla libreria
    library.appendChild(book);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const anime_input = document.querySelector('#anime2');
  const anime_value = encodeURIComponent(anime_input.value);
  console.log('Eseguo ricerca: ' + anime_value);
  // Prepara la richiesta
  rest_url = 'https://api.jikan.moe/v4/anime?q=' + anime_value;
  console.log('URL: ' + rest_url);
  // Esegui fetch
  fetch(rest_url).then(onResponse).then(onJson);
}

// Aggiungi event listener al form
const form = document.querySelector('form');
form.addEventListener('submit', search);

