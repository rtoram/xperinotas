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
        color: colors[Math.floor(Math.random() * colors.length)],
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
