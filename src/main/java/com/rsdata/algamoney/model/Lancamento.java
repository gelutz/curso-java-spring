package com.rsdata.algamoney.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "lancamento")
public class Lancamento {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String descricao;

	@NotNull
	@Column(name = "data_vencimento")
	private String dataVencimento;

	@Column(name = "data_pagamento")
	private String dataPagamento;

	@NotNull
	private BigDecimal valor;

	@NotNull
	@Enumerated(EnumType.STRING)
	private TipoLancamento tipo;

	@ManyToOne
	@JoinColumn(name = "categoria_id")
	private Categoria categoriaId;

	@ManyToOne
	@JoinColumn(name = "pessoa_id")
	private Pessoa pessoaId;

	private String observacao;

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getDataVencimento() {
		return this.dataVencimento;
	}

	public void setDataVencimento(String dataVencimento) {
		this.dataVencimento = dataVencimento;
	}

	public String getDataPagamento() {
		return this.dataPagamento;
	}

	public void setDataPagamento(String dataPagamento) {
		this.dataPagamento = dataPagamento;
	}

	public BigDecimal getValor() {
		return this.valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public TipoLancamento getTipo() {
		return this.tipo;
	}

	public void setTipo(TipoLancamento tipo) {
		this.tipo = tipo;
	}

	public Pessoa getPessoaId() {
		return this.pessoaId;
	}

	public void setPessoaId(Pessoa pessoaId) {
		this.pessoaId = pessoaId;
	}

	public String getObservacao() {
		return this.observacao;
	}

	public Categoria getCategoriaId() {
		return categoriaId;
	}

	public void setCategoriaId(Categoria categoriaId) {
		this.categoriaId = categoriaId;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

}
