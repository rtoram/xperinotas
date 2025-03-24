// Carregar notas salvas ao iniciar
document.addEventListener("DOMContentLoaded", loadNotes);

function addNote() {
    const noteTitle = document.getElementById("noteTitle").value.trim();
    const noteText = document.getElementById("noteText").value.trim();
    if (noteTitle === "" || noteText === "") return; // Exige título e conteúdo

    const notes = getNotes();
    notes.push({ title: noteTitle, content: noteText });
    saveNotes(notes);
    renderNotes();
    document.getElementById("noteTitle").value = ""; // Limpar campos
    document.getElementById("noteText").value = "";
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
}

function getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    const notes = getNotes();

    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="deleteNote(${index})">Excluir</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function loadNotes() {
    renderNotes();
}
