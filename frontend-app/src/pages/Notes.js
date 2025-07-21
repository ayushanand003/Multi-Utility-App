import React, { useState } from 'react';

function Notes() {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  const addNote = () => {
    if (note.trim() === '') return;
    setNotesList([note, ...notesList]);
    setNote('');
  };

  const deleteNote = (index) => {
    const updated = [...notesList];
    updated.splice(index, 1);
    setNotesList(updated);
  };

  return (
    <div>
      <h2 className="mb-4">📝 Notes</h2>

      <div className="input-group mb-3 w-75 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addNote}>
          ➕ Add
        </button>
      </div>

      {notesList.length === 0 && (
        <p className="text-muted text-center">No notes yet.</p>
      )}

      <ul className="list-group w-75 mx-auto">
        {notesList.map((n, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {n}
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteNote(i)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Notes;
