const container = document.querySelector("#favmovie-container");
const movieArray = JSON.parse(localStorage.getItem("favMovie")) || [];
console.log(movieArray);

movieArray.forEach((movie, index) => {
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

  if (movie.info) {
    const noteDiv = document.createElement("div");
    noteDiv.textContent = "Note: " + movie.info;
    noteDiv.className = "mt-2 p-2 bg-blue-100 rounded";
    spanContainer.appendChild(noteDiv);
  }

  const addButton = document.createElement("button");
  addButton.textContent = "Add Note";
  addButton.classList =
    "mt-3 px-4 py-2 bg-blue-200 hover:bg-blue-400 text-black rounded";

  addButton.addEventListener("click", (e) => {
    const textArea = document.createElement("textarea");
    textArea.classList =
      "mt-3 px-1 py-1 bg-blue-200 hover:bg-blue-400 text-black rounded";
    textArea.placeholder = "Enter your note here";

    spanContainer.appendChild(textArea);

    textArea.value = movie.info || "";

    textArea.addEventListener("input", () => {
      movie.info = textArea.value;
      movieArray[index] = movie;

      localStorage.setItem("favMovie", JSON.stringify(movieArray));
    });
  });

  spanContainer.appendChild(addButton);
  container.appendChild(spanContainer);
});
