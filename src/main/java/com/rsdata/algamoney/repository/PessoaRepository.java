package com.rsdata.algamoney.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsdata.algamoney.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}
