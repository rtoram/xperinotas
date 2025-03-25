// Carregar notas ao iniciar
document.addEventListener("DOMContentLoaded", loadNotes);

const colors = [
    "#ffffff", "#f5f5f5", "#ffebee", "#fff3e0", "#f9fbe7",
    "#e8f5e9", "#e3f2fd", "#ede7f6", "#fce4ec", "#e0f7fa"
];

// Adicionar uma nova nota
function addNote() {
    const noteTitle = document.getElementById("noteTitle").value.trim();
    const noteText = document.getElementById("noteText").value.trim();

    // Verificar se há conteúdo para adicionar
    if (!noteText && !noteTitle) {
        console.log("Nenhum conteúdo para adicionar.");
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
    notes.push(newNote);
    saveNotes(notes);
    renderNotes();
    resetInputs();
    console.log("Nota adicionada:", newNote); // Debug
}

// Excluir nota
function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
    console.log("Nota excluída no índice:", index); // Debug
}

// Arquivar nota
function archiveNote(index) {
    const notes = getNotes();
    notes[index].archived = true;
    saveNotes(notes);
    renderNotes();
    console.log("Nota arquivada:", index); // Debug
}

// Adicionar lembrete
function addReminder(index) {
    const reminder = prompt("Digite a data do lembrete (ex.: 2025-03-25):");
    if (reminder) {
        const notes = getNotes();
        notes[index].reminder = reminder;
        saveNotes(notes);
        renderNotes();
        console.log("Lembrete adicionado:", reminder, "no índice:", index); // Debug
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
            console.log("Imagem adicionada no índice:", index); // Debug
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
        console.log("Marcador adicionado:", tag, "no índice:", index); // Debug
    }
}

// Mudar cor
function changeColor(index, color) {
    const notes = getNotes();
    notes[index].color = color;
    saveNotes(notes);
    renderNotes();
    console.log("Cor alterada para:", color, "no índice:", index); // Debug
}

// Copiar para Google Docs (simulado)
function copyToGoogleDocs(index) {
    const notes = getNotes();
    const note = notes[index];
    const text = `${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(text);
    alert("Conteúdo copiado para a área de transferência! Cole em um Google Docs.");
    console.log("Nota copiada para área de transferência:", index); // Debug
}

// Exibir seletor de cores
function showColorPicker(index, button) {
    const existingPicker = button.parentElement.querySelector(".color-picker");
    if (existingPicker) existingPicker.remove(); // Remove picker anterior

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
    console.log("Seletor de cores exibido para índice:", index); // Debug
}

// Obter notas do localStorage
function getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "[]");
}

// Salvar notas no localStorage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Renderizar notas
function renderNotes() {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    const notes = getNotes();

    notes.forEach((note, index) => {
        if (note.archived) return; // Não exibir notas arquivadas

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

        // Adicionar evento ao botão de imagem
        const imageButton = noteElement.querySelector('button[title="Adicionar Imagem"]');
        imageButton.onclick = () => imageButton.querySelector("input").click();

        notesContainer.appendChild(noteElement);
    });
    console.log("Notas renderizadas:", notes.length); // Debug
}

// Limpar formulário
function resetInputs() {
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
}

// Carregar notas iniciais
function loadNotes() {
    renderNotes();
}
