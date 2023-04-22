const form = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const movieList = document.getElementById("movie-list");

form.addEventListener("submit", function(event) {
	event.preventDefault();
	const searchTerm = searchBox.value;
	searchMovies(searchTerm);
});

async function searchMovies(searchTerm) {
	const url = `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${searchTerm}`;
	const response = await fetch(url);
	const data = await response.json();
	showMovies(data.results);
}

function showMovies(movies) {
	movieList.innerHTML = "";
	movies.forEach(function(movie) {
		const movieDiv = document.createElement("div");
		movieDiv.classList.add("movie");

		const img = document.createElement("img");
		img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
		img.alt = movie.title;

		const movieInfo = document.createElement("div");
		movieInfo.classList.add("movie-info");

		const h2 = document.createElement("h2");
		const wikiLink = document.createElement("a");
		wikiLink.href = `https://en.wikipedia.org/wiki/${movie.title}`;
		wikiLink.target = "_blank";
		wikiLink.textContent = movie.title;
		h2.appendChild(wikiLink);

		const releaseDate = new Date(movie.release_date);
		const year = releaseDate.getFullYear();
		const p = document.createElement("p");
		p.textContent = year;

		const overview = document.createElement("p");
		overview.textContent = movie.overview;

		movieInfo.appendChild(h2);
		movieInfo.appendChild(p);
		movieInfo.appendChild(overview);

		movieDiv.appendChild(img);
		movieDiv.appendChild(movieInfo);

		movieList.appendChild(movieDiv);
	});
}
