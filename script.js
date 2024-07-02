const form = document.getElementById('search-form');
const container = document.getElementById('image-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = document.getElementById('search-input').value;
    console.log(query);
    if (query) {
        tvmazeApi(query);
    }
});

async function tvmazeApi(query) {
    const apiKey = 'a78d99a';  // Your OMDb API key
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    
    try {
        const req = await fetch(url);
        const res = await req.json();
        console.log(res);
        displayResults(res);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(data) {
    container.innerHTML = '';
    if (data.Response === "True") {
        data.Search.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
            `;
            container.appendChild(movieElement);
        });
    } else {
        container.innerHTML = `<p style="color: white;">${data.Error}</p>`;
    }
}
