import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

//code for getting recommendations from APIs
async function getRecommendations() {
    //First we will get the elements on the page to interact with

    //For the first one, we want the value in the element and store it in genre
    const genre = document.getElementById('genre').value;
    const bookGrid = document.getElementById('bookGrid');
    //Very simple error handling on this line 
    const error = document.getElementById('error');
    bookGrid.innerHTML = ''; //Clear the previous results in the book display grid everytime the recommendations function is called
    error.style.display = 'none' //Hide the error message

    //Google books API
    try {
        //We are limiting the results to only 8 books 
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=8`);
        if (!response.ok) throw new Error('Network response was not ok');

        //Store the data retrieved
        const data = await response.json();

        //Checking for data in the json using the google books website as a guide
        if (data.items && data.items.length > 0)
        {
            //Creating the book card to be displayed using a for loop with also basic error handling
            data.items.forEach(book => {
            const title = book.volumeInfo.title || 'No title available';
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author';
            
            //If there is no image, we will get a placeholder from that URL
            const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192';
            const description = book.volumeInfo.description ? book.volumeInfo.description.substring(0, 100) + '...' : 'No description available';

            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
              <img src="${thumbnail}" alt="${title}">
              <h3>${title}</h3>
              <p><strong>Author(s):</strong> ${authors}</p>
              <p>${description}</p>
            `;
            bookGrid.appendChild(bookCard);
            });
        }
        else {
            error.textContent = 'No books found for this genre.';
            error.style.display = 'block';
        }
        
    } catch (err) {
        error.textContent = 'Error fetching recommendations: ' + err.message;
        error.style.display = 'block';
    }

    // Open Library API (supplementary data, e.g., additional book info)
    //We get 3 more books from Open Library API
    try {
        const openLibraryResponse = await fetch(`https://openlibrary.org/search.json?q=${genre}&limit=4`);
        if (!openLibraryResponse.ok) throw new Error('Network response was not ok');
        const openLibraryData = await openLibraryResponse.json();

        if (openLibraryData.docs && openLibraryData.docs.length > 0) {
          openLibraryData.docs.forEach(book => {
            const title = book.title || 'No title available';
            const authors = book.author_name ? book.author_name.join(', ') : 'Unknown author';
            const coverId = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/128x192';

            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
              <img src="${coverId}" alt="${title}">
              <h3>${title}</h3>
              <p><strong>Author(s):</strong> ${authors}</p>
              <p>Explore more on Open Library.</p>
            `;
            bookGrid.appendChild(bookCard);
          });
        }
    } catch (err) {
        console.warn('Open Library API error:', err.message);
        // Don't show error to user, as Google Books is primary
    }
}

 //We need to add an eventListener to the button to run the function
    document.getElementById('recommendButton').addEventListener('click', getRecommendations);