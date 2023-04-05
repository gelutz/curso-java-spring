package com.rsdata.algamoney.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsdata.algamoney.model.Lancamento;
import com.rsdata.algamoney.repository.lancamento.LancamentoRepositoryQuery;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery {

}
