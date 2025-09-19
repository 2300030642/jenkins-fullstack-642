import axios from "axios";

const API_URL = "http://localhost:8080/springbootlibrarymanagement/api/books";

export const getBooks = () => axios.get(`${API_URL}/all`);
export const getBookById = (id) => axios.get(`${API_URL}/${id}`);
export const addBook = (book) => axios.post(API_URL, book);
export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
