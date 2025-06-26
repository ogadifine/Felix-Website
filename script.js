const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    addNoteListeners(); // Reattach event listeners after loading
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

    img.src = "/img/download (1).png";
    img.alt = "Delete Note";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    updateStorage();
    addNoteListeners(); // Add listeners to new note
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

showNotes();
