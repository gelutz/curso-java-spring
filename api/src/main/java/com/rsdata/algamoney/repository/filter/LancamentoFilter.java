package com.rsdata.algamoney.repository.filter;

import org.springframework.format.annotation.DateTimeFormat;

public class LancamentoFilter {

	private String descricao;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private String dataVencimentoDe;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private String dataVencimentoAte;

	public String getDescricao() {
		return this.descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getDataVencimentoDe() {
		return this.dataVencimentoDe;
	}

	public void setDataVencimentoDe(String dataVencimentoDe) {
		this.dataVencimentoDe = dataVencimentoDe;
	}

	public String getDataVencimentoAte() {
		return this.dataVencimentoAte;
	}

	public void setDataVencimentoAte(String dataVencimentoAte) {
		this.dataVencimentoAte = dataVencimentoAte;
	}

}
