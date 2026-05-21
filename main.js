// You can work here or download the template
console.log("Hi");

 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjdlYzEzMGY1M2QxN2VjNzNhNzEzYmNiNjk3MGU5NiIsIm5iZiI6MTc3OTM2NTk5MS4zMjcwMDAxLCJzdWIiOiI2YTBlZjg2N2FhYWQ3YjQwOTQzOGQ2YzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5-N1SLF1zrgOlYvvBBRg217FfmoqVZPj7_aXpp8aFAU'
  }
};
const getMovieArray = async () => {
	
const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
 
if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();    
	return data;

};


const renderMovies = (movies, container) => {
	
	movies.forEach((movie) => {
       // console.log(movie.name);
	//	console.log(movie.profile_path);
        
        let spanContainer = document.createElement("span"); 
		//let imgspanContainer = document.createElement("span"); 
        let figElem = document.createElement('figure');
        let imageElem = document.createElement('img');
        
        let titletextnode=document.createTextNode("Title: "+movie.title);
		let infotextnode=document.createTextNode("Info: "+movie.overview);
        spanContainer.className='flex flex-col text-violet-600 item-center justify-start bg-green-100 rounded-md';
        

		
		let url ='https://image.tmdb.org/t/p/w500'+movie.poster_path;
		//console.log('url:',url);

			imageElem.src = url;
            imageElem.alt = movie.original_name;
            imageElem.className='mb-4';
			figElem.appendChild(imageElem);
            spanContainer.appendChild(figElem);
			spanContainer.appendChild(titletextnode);
			spanContainer.appendChild(document.createElement("br"));
            spanContainer.appendChild(infotextnode);
			document.getElementById(container).appendChild(spanContainer);
			//document.getElementById(container).appendChild(imgspanContainer);

		/*fetch(url)
		.then(res => console.log(res))
		.catch(err => console.error(err));*/

       
   
});
};

const errorHandler = (errorMsg, container) => {
	console.error(errorMsg);
	const h2 = document.createElement('h2');
	h2.className = 'inline-block m-auto text-6xl mb-6 text-red-600';
	h2.textContent = errorMsg;
	document.getElementById(container).appendChild(h2);
};

async function  asyncTodo() {
	try {
		const allMovies = await getMovieArray();
      // console.log("Print all data",allMovies.results);
        renderMovies(allMovies.results, 'movie-container');
	} catch (error) {
		errorHandler(error.message,  'movie-container');
	}
}
asyncTodo();
		// You can work here or download the template
