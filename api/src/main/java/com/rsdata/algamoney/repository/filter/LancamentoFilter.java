package com.rsdata.algamoney.repository.filter;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

public class LancamentoFilter {

	private String descricao;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate vencimentoDe;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate vencimentoAte;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate pagamentoDe;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate pagamentoAte;

	public String getDescricao() {
		return this.descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getVencimentoDe() {
		return this.vencimentoDe;
	}

	public void setVencimentoDe(LocalDate vencimentoDe) {
		this.vencimentoDe = vencimentoDe;
	}

	public LocalDate getVencimentoAte() {
		return this.vencimentoAte;
	}

	public void setVencimentoAte(LocalDate vencimentoAte) {
		this.vencimentoAte = vencimentoAte;
	}

	public LocalDate getPagamentoDe() {
		return pagamentoDe;
	}

	public void setPagamentoDe(LocalDate pagamentoDe) {
		this.pagamentoDe = pagamentoDe;
	}

	public LocalDate getpagamentoAte() {
		return pagamentoAte;
	}

	public void setpagamentoAte(LocalDate pagamentoAte) {
		this.pagamentoAte = pagamentoAte;
	}

}
