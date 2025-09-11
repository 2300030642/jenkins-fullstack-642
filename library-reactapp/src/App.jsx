import { useState } from "react";
import BookForm from "./pages/BookForm";
import BookList from "./pages/BookList";


function App() {
  const [editingBook, setEditingBook] = useState(null);
  const [reload, setReload] = useState(false);

  const refresh = () => setReload(!reload);

  return (
    <div>
      <h1>📚 Library Management (CRUD)</h1>
      <BookForm book={editingBook} refresh={refresh} clearEdit={() => setEditingBook(null)} />
      <BookList onEdit={setEditingBook} reload={reload} />
    </div>
  );
}

export default App;
