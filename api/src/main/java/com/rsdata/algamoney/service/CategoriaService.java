package com.rsdata.algamoney.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rsdata.algamoney.model.Categoria;
import com.rsdata.algamoney.repository.CategoriaRepository;

@Service
public class CategoriaService {
	@Autowired
	private CategoriaRepository categoriaRepository;

	public Categoria buscarPorId(Long id) {
		return categoriaRepository.findById(id).get();
	}
}
