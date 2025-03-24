// Carregar notas salvas ao iniciar
document.addEventListener("DOMContentLoaded", loadNotes);

function addNote() {
    const noteText = document.getElementById("noteText").value.trim();
    if (noteText === "") return;

    const notes = getNotes();
    notes.push(noteText);
    saveNotes(notes);
    renderNotes();
    document.getElementById("noteText").value = ""; // Limpar o campo
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
            <p>${note}</p>
            <button onclick="deleteNote(${index})">Excluir</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function loadNotes() {
    renderNotes();
}
