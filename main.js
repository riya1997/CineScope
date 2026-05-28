// You can work here or download the template

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

		let dataId = movie.id;
		//console.log(dataId);
		let allFavMovies = JSON.parse(localStorage.getItem('favMovie')) || [];   
		//console.log("allFavMovies:",allFavMovies);
		//const index = (allFavMovies.length>0)?allFavMovies.findIndex(x => x.obj.id === dataId):(-1);
		const index = allFavMovies.findIndex(x => x.obj.id === dataId);
    
        
        let spanContainer = document.createElement("span"); 
        let figElem = document.createElement('figure');
        let imageElem = document.createElement('img');
        
        let titletextnode=document.createTextNode(movie.title);
		let infotextnode=document.createTextNode(movie.overview);
        spanContainer.className='flex flex-col text-[#303738] items-center text-center justify-start bg-[#b37839] rounded-xl';
        

		
		let url ='https://image.tmdb.org/t/p/w500'+movie.poster_path;
		//console.log('url:',url);

			imageElem.src = url;
            imageElem.alt = movie.original_name;
            imageElem.className='mb-4 rounded-xl';
			figElem.appendChild(imageElem);
            spanContainer.appendChild(figElem);
			let bold = document.createElement('strong');
    		bold.className='text-[#611105]';
    		bold.appendChild(titletextnode); 
			spanContainer.appendChild(bold);
			spanContainer.appendChild(document.createElement("br"));
			let info = document.createElement('strong');
    		info.className='text-[#252900]';
    		info.appendChild(infotextnode); 
			spanContainer.appendChild(info);

			//Create and add Fav button
			let favButton=document.createElement("button");
    		
    		favButton.classList = " w-[150px] mt-1 px-1 py-2 bg-[#4f335c] hover:bg-blue-400 text-white rounded";
			//let movieFound=false;
    		favButton.addEventListener('click', (e) => {
				//console.log(index);
				if (index === -1) { 
					//console.log("Add to fav storage.");
					const movieInfo={
						obj:movie,
						info:''
					}
					allFavMovies.push(movieInfo); 
					localStorage.setItem('favMovie', JSON.stringify(allFavMovies));
					favButton.textContent='Remove from Fav';
				}else if (index => -1) { 
					console.log("Remove from fav storage.");
					//delete from storage
					allFavMovies.splice(index,1);
					localStorage.setItem('favMovie', JSON.stringify(allFavMovies));
					favButton.textContent='Add to Fav';
				}
				allFavMovies = JSON.parse(localStorage.getItem('favMovie')) || [];  
				location.reload();	
			});
			//console.log(index);
			if(index === -1){
				favButton.textContent='Add to Fav';
			}else{
				favButton.textContent='Remove from Fav';
			}
			
    		spanContainer.appendChild(favButton);

			document.getElementById(container).appendChild(spanContainer);
   
});
};

const errorHandler = (errorMsg, container) => {
	console.error(errorMsg);
	const h2 = document.createElement('h2');
	h2.className = 'inline-block m-auto text-6xl mb-6 text-red-600';
	h2.textContent = errorMsg;
	document.getElementById(container).appendChild(h2);
};
let allMovies=[];
async function  asyncTodo() {
	try {
		 allMovies = await getMovieArray();
      // console.log("Print all data",allMovies.results);
        renderMovies(allMovies.results, 'movie-container');
	} catch (error) {
		errorHandler(error.message,  'movie-container');
	}
}
asyncTodo();

const search = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchImput");

search.addEventListener(
  "click",
  (event) => {
	if(searchInput.value){
	let dialogP=document.getElementById("dialogP");
	dialogP.innerHTML = "";

	const allFavMovies = JSON.parse(localStorage.getItem('favMovie')) || [];   
	let searchVal=searchInput.value;
	
	let movieFound=false;
	allFavMovies.forEach((movieObj) => {
		let movie=movieObj.obj.title;
		let info=movieObj.info;
		if(movie.toLowerCase().includes(searchVal.toLowerCase()) || info.toLowerCase().includes(searchVal.toLowerCase())){
			console.log("Movie found:",movie);
			let titletextnode=document.createTextNode("Movie found in Favourite: "+movie);
			dialogP.appendChild(titletextnode);
			dialogP.appendChild(document.createElement("br"));
			let infotextnode=document.createTextNode("Info:"+movieObj.info);
			dialogP.appendChild(infotextnode);
			dialogP.appendChild(document.createElement("br"));
			movieFound=true;
			return;
		}
		
	});

	if(!movieFound){
		allMovies.results.forEach((movieObj) => {
			let movie=movieObj.title;
			if(movie.toLowerCase().includes(searchVal.toLowerCase())){
				console.log("Movie found:",movie);
				let titletextnode=document.createTextNode("Movie found: "+movie);
				dialogP.appendChild(titletextnode);
				dialogP.appendChild(document.createElement("br"));
				movieFound=true;
				return;
			}
			
		});

		if(!movieFound){
			let titletextnode=document.createTextNode("Movie not found.");
				dialogP.appendChild(titletextnode);
		}
	}
	searchInput.value='';
	let dialog = document.getElementById('myDialog');
	dialog.style.top = ((window.innerHeight/2) - (dialog.offsetHeight/2))+'px';
  	dialog.style.left = ((window.innerWidth/2) - (dialog.offsetWidth/2))+'px';
	dialog.open = true;
	
  }}
);
		