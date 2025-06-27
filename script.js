const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn.create");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
  addNoteListeners();
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

function addNoteListeners() {
  notes = document.querySelectorAll(".input-box");
  notes.forEach(note => {
    note.onkeyup = updateStorage;
  });
}

createBtn.addEventListener("click", () => {
  const inputBox = document.createElement("p");
  const img = document.createElement("img");

  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");

  img.src = "img/download (1).png";
  img.alt = "Delete Note";

  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);

  updateStorage();
  addNoteListeners();
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

function downloadNotes() {
  const notesText = [...document.querySelectorAll(".input-box")]
    .map(note => note.innerText.replace("Delete Note", "").trim())
    .filter(text => text !== "")
    .join("\n\n");

  const blob = new Blob([notesText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "MyNotes.txt";
  a.click();

  URL.revokeObjectURL(url);
}

showNotes();
