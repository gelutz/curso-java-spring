package com.rsdata.algamoney.model;

import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class Endereco {
	private String logradouro;
	private String numero;
	private String complemento;
	private String bairro;
	private String cep;
	private String cidade;
	private String estado;

	public Endereco() {
	}

	public Endereco(String logradouro, String numero, String complemento, String bairro, String cep, String cidade,
			String estado) {
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cep = cep;
		this.cidade = cidade;
		this.estado = estado;
	}

	public String getLogradouro() {
		return this.logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getNumero() {
		return this.numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getComplemento() {
		return this.complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getBairro() {
		return this.bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCep() {
		return this.cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getCidade() {
		return this.cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return this.estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Endereco logradouro(String logradouro) {
		setLogradouro(logradouro);
		return this;
	}

	public Endereco numero(String numero) {
		setNumero(numero);
		return this;
	}

	public Endereco complemento(String complemento) {
		setComplemento(complemento);
		return this;
	}

	public Endereco bairro(String bairro) {
		setBairro(bairro);
		return this;
	}

	public Endereco cep(String cep) {
		setCep(cep);
		return this;
	}

	public Endereco cidade(String cidade) {
		setCidade(cidade);
		return this;
	}

	public Endereco estado(String estado) {
		setEstado(estado);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof Endereco)) {
			return false;
		}
		Endereco endereco = (Endereco) o;
		return Objects.equals(logradouro, endereco.logradouro) && Objects.equals(numero, endereco.numero)
				&& Objects.equals(complemento, endereco.complemento) && Objects.equals(bairro, endereco.bairro)
				&& Objects.equals(cep, endereco.cep) && Objects.equals(cidade, endereco.cidade)
				&& Objects.equals(estado, endereco.estado);
	}

	@Override
	public int hashCode() {
		return Objects.hash(logradouro, numero, complemento, bairro, cep, cidade, estado);
	}

}
