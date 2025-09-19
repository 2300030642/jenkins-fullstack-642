package com.lib.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lib.entity.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Long> {
	
}
