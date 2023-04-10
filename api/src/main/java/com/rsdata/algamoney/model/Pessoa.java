package com.rsdata.algamoney.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "pessoa")
public class Pessoa {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(min = 3, max = 20)
	private String nome;

	@NotNull
	private boolean ativo;

	@Embedded
	private Endereco endereco;

	@JsonIgnore
	@Transient
	public boolean isAtivo() {
		return this.ativo;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public boolean getAtivo() {
		return this.ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof Pessoa)) {
			return false;
		}
		Pessoa pessoa = (Pessoa) o;
		return Objects.equals(id, pessoa.id) && Objects.equals(nome, pessoa.nome) && ativo == pessoa.ativo;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, nome, ativo);
	}
}
