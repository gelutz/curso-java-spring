package com.rsdata.algamoney.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsdata.algamoney.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
