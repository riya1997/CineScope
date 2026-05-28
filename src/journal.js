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
    "flex flex-col text-[#303738] items-center text-center justify-start bg-[#b37839] rounded-xl";

  let url = "https://image.tmdb.org/t/p/w500" + movie.obj.poster_path;

  imageElem.src = url;
  imageElem.alt = movie.obj.original_name;
  imageElem.className = "mb-4";
  figElem.appendChild(imageElem);
  spanContainer.appendChild(figElem);
  spanContainer.appendChild(title);
  spanContainer.appendChild(document.createElement("br"));
  spanContainer.appendChild(infotextnode);

  const addButton = document.createElement("button");
  addButton.textContent = movie.info ? "Update Note" : "Add Note";
  addButton.classList =
    " w-[150px] mt-1 px-1 py-2 bg-[#4f335c] hover:bg-blue-400 text-white rounded";

  const noteDiv = document.createElement("div");
  noteDiv.className = " w-[150px] mt-2 px-1 py-2 bg-[#4f335c] text-white rounded";

  if (movie.info) {
    noteDiv.textContent = "Note: " + movie.info;
    spanContainer.appendChild(noteDiv);
  }

  addButton.addEventListener("click", (e) => {
    const textArea = document.createElement("textarea");
    textArea.classList =
      "mt-3 px-1 py-1 bg-blue-200 hover:bg-blue-400 text-black rounded";
    textArea.placeholder = "Enter your note here";

    textArea.value = movie.info || "";

    function saveNote() {
      movie.info = textArea.value;
      movieArray[index] = movie;

      localStorage.setItem("favMovie", JSON.stringify(movieArray));
      noteDiv.textContent = "Note: " + textArea.value;
      spanContainer.appendChild(noteDiv);
      addButton.textContent = "Update Note";
      if (textArea.value === "") {
        noteDiv.remove();
        addButton.textContent = "Add Note";
      }
      location.reload();
    }
    textArea.addEventListener("blur", saveNote);
    textArea.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveNote();
        textArea.blur();
      }
    });
    spanContainer.appendChild(textArea);
  });
  spanContainer.appendChild(addButton);
  container.appendChild(spanContainer);
});
