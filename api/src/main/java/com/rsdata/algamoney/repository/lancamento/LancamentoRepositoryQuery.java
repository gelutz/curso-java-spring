package com.rsdata.algamoney.repository.lancamento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.rsdata.algamoney.model.Lancamento;
import com.rsdata.algamoney.repository.filter.LancamentoFilter;
import com.rsdata.algamoney.repository.projection.ResumoLancamento;

public interface LancamentoRepositoryQuery {
	public Page<Lancamento> filtrar(LancamentoFilter filter, Pageable pageable);

	public Page<ResumoLancamento> resumir(LancamentoFilter filter, Pageable pageable);
}
