package com.rsdata.algamoney.repository.pessoa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.rsdata.algamoney.model.Pessoa;
import com.rsdata.algamoney.repository.filter.PessoaFilter;

public interface PessoaRepositoryQuery {
	public Page<Pessoa> filtrar(PessoaFilter filter, Pageable pageable);
}
