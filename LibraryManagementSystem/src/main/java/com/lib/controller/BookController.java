package com.lib.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.lib.entity.Book;
import com.lib.repo.BookRepo;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173") 
public class BookController {

    @Autowired
    private BookRepo bookRepo;

    // Home check
    @GetMapping("/")
    public String home() {
        return "Library Management System - Book API is running";
    }

    // Get all books
    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookRepo.findAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookRepo.findById(id)
                .map(book -> ResponseEntity.ok(book))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }



    // Add book
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book savedBook = bookRepo.save(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    // Update book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookRepo.findById(id)
                .map(book -> {
                    book.setTitle(bookDetails.getTitle());
                    book.setAuthor(bookDetails.getAuthor());
                    book.setCategory(bookDetails.getCategory());
                    book.setCopies(bookDetails.getCopies());
                    Book updatedBook = bookRepo.save(book);
                    return new ResponseEntity<>(updatedBook, HttpStatus.OK);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



    // Delete book
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        if (bookRepo.existsById(id)) {
            bookRepo.deleteById(id);
            return new ResponseEntity<>("Book with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Book with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
