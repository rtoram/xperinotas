// Carregar notas ao iniciar
document.addEventListener("DOMContentLoaded", function() {
    console.log("Página carregada, iniciando loadNotes...");
    loadNotes();
});

const colors = [
    "#ffffff", "#f5f5f5", "#ffebee", "#fff3e0", "#f9fbe7",
    "#e8f5e9", "#e3f2fd", "#ede7f6", "#fce4ec", "#e0f7fa"
];

// Adicionar uma nova nota
function addNote() {
    console.log("Função addNote chamada"); // Debug
    const noteTitle = document.getElementById("noteTitle").value.trim();
    const noteText = document.getElementById("noteText").value.trim();

    console.log("Título:", noteTitle, "Texto:", noteText); // Debug

    if (!noteTitle && !noteText) {
        console.log("Nenhum conteúdo para adicionar, saindo da função.");
        return;
    }

    const notes = getNotes();
    const newNote = {
        title: noteTitle || "Sem título",
        content: noteText || "",
        color: "#ffffff",
        archived: false,
        reminder: null,
        image: null,
        tags: []
    };

    console.log("Nova nota criada:", newNote); // Debug
    notes.push(newNote);
    console.log("Notas após adicionar:", notes); // Debug
    saveNotes(notes);
    renderNotes();
    resetInputs();
    console.log("Nota adicionada e renderizada"); // Debug
}

// Excluir nota
function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
}

// Arquivar nota
function archiveNote(index) {
    const notes = getNotes();
    notes[index].archived = true;
    saveNotes(notes);
    renderNotes();
}

// Adicionar lembrete
function addReminder(index) {
    const reminder = prompt("Digite a data do lembrete (ex.: 2025-03-25):");
    if (reminder) {
        const notes = getNotes();
        notes[index].reminder = reminder;
        saveNotes(notes);
        renderNotes();
    }
}

// Adicionar imagem
function addImage(index, input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const notes = getNotes();
            notes[index].image = e.target.result;
            saveNotes(notes);
            renderNotes();
        };
        reader.readAsDataURL(file);
    }
}

// Adicionar marcador
function addTag(index) {
    const tag = prompt("Digite um marcador:");
    if (tag) {
        const notes = getNotes();
        notes[index].tags.push(tag);
        saveNotes(notes);
        renderNotes();
    }
}

// Mudar cor
function changeColor(index, color) {
    const notes = getNotes();
    notes[index].color = color;
    saveNotes(notes);
    renderNotes();
}

// Copiar para Google Docs (simulado)
function copyToGoogleDocs(index) {
    const notes = getNotes();
    const note = notes[index];
    const text = `${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(text);
    alert("Conteúdo copiado para a área de transferência! Cole em um Google Docs.");
}

// Exibir seletor de cores
function showColorPicker(index, button) {
    const existingPicker = button.parentElement.querySelector(".color-picker");
    if (existingPicker) existingPicker.remove();

    const picker = document.createElement("div");
    picker.className = "color-picker";
    colors.forEach(color => {
        const div = document.createElement("div");
        div.className = "color-option";
        div.style.backgroundColor = color;
        div.onclick = () => {
            changeColor(index, color);
            picker.remove();
        };
        picker.appendChild(div);
    });
    button.parentElement.appendChild(picker);
}

// Obter notas do localStorage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    console.log("Notas recuperadas do localStorage:", notes); // Debug
    return notes;
}

// Salvar notas no localStorage
function saveNotes(notes) {
    console.log("Salvando notas no localStorage:", notes); // Debug
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Renderizar notas
function renderNotes() {
    console.log("Renderizando notas..."); // Debug
    const notesContainer = document.getElementById("notesContainer");
    if (!notesContainer) {
        console.error("notesContainer não encontrado!");
        return;
    }
    notesContainer.innerHTML = "";
    const notes = getNotes();

    notes.forEach((note, index) => {
        if (note.archived) return;

        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.style.backgroundColor = note.color;

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const contentWithLinks = note.content.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${contentWithLinks}</p>
            ${note.image ? `<img src="${note.image}" alt="Imagem da nota">` : ""}
            ${note.reminder ? `<p><i class="fas fa-bell"></i> Lembrete: ${note.reminder}</p>` : ""}
            ${note.tags.length ? `<p class="tags"><i class="fas fa-tag"></i> ${note.tags.join(", ")}</p>` : ""}
            <div class="note-actions">
                <button onclick="archiveNote(${index})" title="Arquivar"><i class="fas fa-archive"></i></button>
                <button onclick="addReminder(${index})" title="Lembrete"><i class="fas fa-bell"></i></button>
                <button title="Adicionar Imagem"><i class="fas fa-image"></i><input type="file" accept="image/*" onchange="addImage(${index}, this)" style="display:none;"></button>
                <button onclick="showColorPicker(${index}, this)" title="Cor de Fundo"><i class="fas fa-palette"></i></button>
                <div class="dropdown">
                    <button title="Mais opções"><i class="fas fa-ellipsis-v"></i></button>
                    <div class="dropdown-content">
                        <button onclick="deleteNote(${index})">Excluir nota</button>
                        <button onclick="addTag(${index})">Adicionar marcador</button>
                        <button onclick="copyToGoogleDocs(${index})">Copiar para Google Docs</button>
                    </div>
                </div>
            </div>
        `;

        const imageButton = noteElement.querySelector('button[title="Adicionar Imagem"]');
        imageButton.onclick = () => imageButton.querySelector("input").click();

        notesContainer.appendChild(noteElement);
    });
    console.log("Notas renderizadas, total:", notes.length); // Debug
}

// Limpar formulário
function resetInputs() {
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
    console.log("Formulário limpo"); // Debug
}

// Carregar notas iniciais
function loadNotes() {
    renderNotes();
}
