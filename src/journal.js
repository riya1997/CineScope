const container = document.querySelector("#favmovie-container");
const movieArray = JSON.parse(localStorage.getItem("favMovie")) || [];
console.log(movieArray);

movieArray.forEach((movie) => {
  let spanContainer = document.createElement("span");
  let figElem = document.createElement("figure");
  let imageElem = document.createElement("img");
  let title = document.createElement("h2");
  title.textContent = movie.obj.title;
  title.style.color = "black";
  title.style.fontWeight = "bold";
  let infotextnode = document.createTextNode("Info: " + movie.obj.overview);
  spanContainer.className =
    "flex flex-col text-violet-600 item-center justify-start bg-green-100 rounded-md";

  let url = "https://image.tmdb.org/t/p/w500" + movie.obj.poster_path;

  imageElem.src = url;
  imageElem.alt = movie.obj.original_name;
  imageElem.className = "mb-4";
  figElem.appendChild(imageElem);
  spanContainer.appendChild(figElem);
  spanContainer.appendChild(title);
  spanContainer.appendChild(document.createElement("br"));
  spanContainer.appendChild(infotextnode);
  container.appendChild(spanContainer);
});
