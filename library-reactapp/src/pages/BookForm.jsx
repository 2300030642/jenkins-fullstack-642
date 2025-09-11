import { useState, useEffect } from "react";
import { addBook, updateBook } from "../service/config";

function BookForm({ book, refresh, clearEdit }) {
  const [form, setForm] = useState({ title: "", author: "", category: "", copies: 1 });

  useEffect(() => {
    if (book) {
      setForm(book);
    } else {
      setForm({ title: "", author: "", category: "", copies: 1 });
    }
  }, [book]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      updateBook(form.id, form).then(() => {
        refresh();
        clearEdit();
      });
    } else {
      addBook(form).then(() => refresh());
    }
    setForm({ title: "", author: "", category: "", copies: 1 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input type="number" name="copies" value={form.copies} onChange={handleChange} min="1" required />
      <button type="submit">{form.id ? "Update" : "Add"} Book</button>
      {form.id && <button type="button" onClick={clearEdit}>Cancel</button>}
    </form>
  );
}

export default BookForm;
