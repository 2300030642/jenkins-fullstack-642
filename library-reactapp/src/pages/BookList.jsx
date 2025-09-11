import { useEffect, useState } from "react";
// Inside BookList.jsx or BookForm.jsx
import { getBooks, deleteBook } from "../service/config";


function BookList({ onEdit, reload }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, [reload]);

  const loadBooks = () => {
    getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    deleteBook(id).then(() => loadBooks());
  };

  return (
    <div>
      <h2>Books List</h2>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} - {b.author} ({b.category}) [Copies: {b.copies}]
            <button onClick={() => onEdit(b)}>Edit</button>
            <button onClick={() => handleDelete(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
