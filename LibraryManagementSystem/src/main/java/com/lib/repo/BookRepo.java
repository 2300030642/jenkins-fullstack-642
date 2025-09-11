package com.lib.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lib.entity.Book;

public interface BookRepo extends JpaRepository<Book, Long> {
	
}
