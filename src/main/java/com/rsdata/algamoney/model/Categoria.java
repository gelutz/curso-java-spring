package com.rsdata.algamoney.model;

import java.util.Objects;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categoria")
public class Categoria {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(min = 3, max = 20)
	private String nome;

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

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof Categoria)) {
			return false;
		}
		Categoria categoria = (Categoria) o;
		return Objects.equals(id, categoria.id) && Objects.equals(nome, categoria.nome);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, nome);
	}

}
