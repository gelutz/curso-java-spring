package com.rsdata.algamoney.repository.lancamento;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.rsdata.algamoney.model.Lancamento;
import com.rsdata.algamoney.repository.filter.LancamentoFilter;
import com.rsdata.algamoney.repository.projection.LancamentosPorCategoria;
import com.rsdata.algamoney.repository.projection.LancamentosPorDia;
import com.rsdata.algamoney.repository.projection.ResumoLancamento;

public interface LancamentoRepositoryQuery {
	public Page<Lancamento> filtrar(LancamentoFilter filter, Pageable pageable);

	public Page<ResumoLancamento> resumir(LancamentoFilter filter, Pageable pageable);

	public List<LancamentosPorCategoria> porCategoria(LocalDate dataRef);

	public List<LancamentosPorDia> porDia(LocalDate dataRef);
}
