package com.rsdata.algamoney.repository.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.rsdata.algamoney.model.TipoLancamento;

public class LancamentosPorDia {
	TipoLancamento tipoLancamento;
	LocalDate dia;
	BigDecimal total;

	public LancamentosPorDia(TipoLancamento tipoLancamento, LocalDate dia, BigDecimal total) {
		this.tipoLancamento = tipoLancamento;
		this.dia = dia;
		this.total = total;
	}

	public TipoLancamento getTipoLancamento() {
		return tipoLancamento;
	}

	public void setTipoLancamento(TipoLancamento tipoLancamento) {
		this.tipoLancamento = tipoLancamento;
	}

	public LocalDate getDia() {
		return dia;
	}

	public void setDia(LocalDate dia) {
		this.dia = dia;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

}
