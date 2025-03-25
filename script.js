body {
    font-family: 'Segoe UI', Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
    color: #333;
}

.container {
    max-width: 900px;
    margin: 0 auto;
}

h1 {
    text-align: center;
    font-size: 2em;
    color: #444;
    margin-bottom: 30px;
}

.note-input {
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-bottom: 40px; /* Mais espaço entre o formulário e as notas */
    position: sticky;
    top: 20px;
    z-index: 10;
}

#noteTitle {
    width: 100%;
    padding: 10px;
    font-size: 1.1em;
    border: none;
    border-bottom: 2px solid #ddd;
    margin-bottom: 10px;
    outline: none;
    background: transparent;
}

textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 1em;
    border: none;
    border-radius: 4px;
    resize: vertical;
    outline: none;
    background: transparent;
}

.note-input button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.note-input button:hover {
    background-color: #45a049;
}

.notes-section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
}

.note {
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: relative;
    transition: transform 0.2s;
}

.note:hover {
    transform: translateY(-2px);
}

.note h3 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
    color: #333;
}

.note p {
    margin: 0 0 10px 0;
    font-size: 0.95em;
    color: #555;
}

.note a {
    color: #1e90ff;
    text-decoration: underline;
}

.note img {
    max-width: 100%;
    border-radius: 4px;
    margin-top: 10px;
}

.note .tags {
    font-size: 0.85em;
    color: #888;
    margin-top: 10px;
}

.note-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    opacity: 0;
    transition: opacity 0.2s;
}

.note:hover .note-actions {
    opacity: 1;
}

.note-actions button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1em;
    color: #666;
    padding: 5px;
}

.note-actions button:hover {
    color: #333;
}

.dropdown {
    position: relative;
}

.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    border-radius: 4px;
    z-index: 1;
}

.dropdown-content button {
    display: block;
    width: 100%;
    padding: 8px 12px;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;
    color: #333;
}

.dropdown-content button:hover {
    background-color: #f0f0f0;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.color-picker {
    display: none;
    position: absolute;
    background: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 1;
}

.color-option {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    margin: 2px;
    cursor: pointer;
    border: 2px solid #fff;
}

.color-option:hover {
    border-color: #888;
}
