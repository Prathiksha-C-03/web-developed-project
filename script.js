let notes = JSON.parse(localStorage.getItem("notes")) || [];

let editIndex = -1;

// Display notes when page loads
displayNotes();


// Create or Edit Note
function saveNote() {

    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    if (title === "" || content === "") {
        alert("Please enter both title and note content.");
        return;
    }

    const note = {
        title: title,
        content: content,
        date: new Date().toLocaleString()
    };

    // Edit existing note
    if (editIndex !== -1) {

        notes[editIndex] = note;

        editIndex = -1;

        document.querySelector(".note-form button").textContent = "Add Note";

    }

    // Create new note
    else {

        notes.push(note);

    }

    saveToLocalStorage();

    clearForm();

    displayNotes();
}


// Display Notes
function displayNotes() {

    const container = document.getElementById("notesContainer");

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    container.innerHTML = "";

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchText) ||
        note.content.toLowerCase().includes(searchText)
    );

    if (filteredNotes.length === 0) {

        container.innerHTML =
            '<div class="empty">No notes found.</div>';

        return;
    }

    filteredNotes.forEach((note) => {

        const originalIndex = notes.indexOf(note);

        const noteElement = document.createElement("div");

        noteElement.className = "note";

        noteElement.innerHTML = `
            <h3>${note.title}</h3>

            <p>${note.content}</p>

            <small>${note.date}</small>

            <br><br>

            <div class="note-buttons">

                <button class="edit-btn"
                    onclick="editNote(${originalIndex})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteNote(${originalIndex})">
                    Delete
                </button>

            </div>
        `;

        container.appendChild(noteElement);

    });
}


// Edit Note
function editNote(index) {

    document.getElementById("noteTitle").value =
        notes[index].title;

    document.getElementById("noteContent").value =
        notes[index].content;

    editIndex = index;

    document.querySelector(".note-form button").textContent =
        "Update Note";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Delete Note
function deleteNote(index) {

    if (confirm("Are you sure you want to delete this note?")) {

        notes.splice(index, 1);

        saveToLocalStorage();

        displayNotes();

    }
}


// Save notes in browser
function saveToLocalStorage() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


// Clear input fields
function clearForm() {

    document.getElementById("noteTitle").value = "";

    document.getElementById("noteContent").value = "";

}