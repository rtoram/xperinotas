// Carregar notas ao iniciar
document.addEventListener("DOMContentLoaded", loadNotes);

let selectedColor = "#ffffff";
const colors = [
    "#ffffff", "#f5f5f5", "#ffebee", "#fff3e0", "#f9fbe7",
    "#e8f5e9", "#e3f2fd", "#ede7f6", "#fce4ec", "#e0f7fa"
];

function addNote() {
    const noteTitle = document.getElementById("noteTitle").value.trim();
    const noteText = document.getElementById("noteText").value.trim();
    if (noteTitle === "" || noteText === "") return;

    const notes = getNotes();
    notes.push({
        title: noteTitle,
        content: noteText,
        color: selectedColor,
        archived: false,
        reminder: null,
        image: null,
        tags: []
    });
    saveNotes(notes);
    renderNotes();
    resetInputs();
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
}

function archiveNote(index) {
    const notes = getNotes();
    notes[index].archived = true;
    saveNotes(notes);
    renderNotes();
}

function addReminder(index) {
    const reminder = prompt("Digite a data do lembrete (ex.: 2025-03-25):");
    if (reminder) {
        const notes = getNotes();
        notes[index].reminder = reminder;
        saveNotes(notes);
        renderNotes();
    }
}

function addImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const notes = getNotes();
            const lastNote = notes[notes.length - 1] || { title: "Nova Nota", content: "", color: "#ffffff", archived: false, reminder: null, image: null, tags: [] };
            lastNote.image = e.target.result;
            if (!notes.includes(lastNote)) notes.push(lastNote);
            saveNotes(notes);
            renderNotes();
        };
        reader.readAsDataURL(file);
    }
}

function addTag(index) {
    const tag = prompt("Digite um marcador:");
    if (tag) {
        const notes = getNotes();
        notes[index].tags.push(tag);
        saveNotes(notes);
        renderNotes();
    }
}

function showColorPicker() {
    const picker = document.getElementById("colorPicker");
    picker.innerHTML = "";
    colors.forEach(color => {
        const div = document.createElement("div");
        div.className = "color-option";
        div.style.backgroundColor = color;
        div.onclick = () => {
            selectedColor = color;
            picker.classList.add("hidden");
        };
        picker.appendChild(div);
    });
    picker.classList.toggle("hidden");
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
        if (note.archived) return; // Não exibir notas arquivadas
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.style.backgroundColor = note.color;
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            ${note.image ? `<img src="${note.image}" alt="Imagem da nota">` : ""}
            ${note.reminder ? `<p><i class="fas fa-bell"></i> Lembrete: ${note.reminder}</p>` : ""}
            ${note.tags.length ? `<p class="tags"><i class="fas fa-tag"></i> ${note.tags.join(", ")}</p>` : ""}
            <button onclick="deleteNote(${index})"><i class="fas fa-trash"></i></button>
            <div class="note-actions">
                <button onclick="archiveNote(${index})" title="Arquivar"><i class="fas fa-archive"></i></button>
                <button onclick="addReminder(${index})" title="Lembrete"><i class="fas fa-bell"></i></button>
                <button onclick="addTag(${index})" title="Marcador"><i class="fas fa-tag"></i></button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function resetInputs() {
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
    document.getElementById("imageInput").value = "";
    selectedColor = "#ffffff";
}

function loadNotes() {
    renderNotes();
}
