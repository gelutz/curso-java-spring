package com.rsdata.algamoney.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsdata.algamoney.model.Estado;
import com.rsdata.algamoney.repository.EstadoRepository;

@RestController
@RequestMapping("/estados")
public class EstadoResource {

	@Autowired
	private EstadoRepository EstadoRepository;

	// @Autowired
	// private EstadoService EstadoService;

	// [GET]
	@GetMapping
	public ResponseEntity<List<Estado>> todos() {
		List<Estado> Estados = EstadoRepository.findAll();

		return ResponseEntity.ok(Estados);
	}

	// public ResponseEntity<Page<Estado>> pesquisar(Pageable pageable) {
	// Page<Estado> Estados = EstadoRepository.filtrar(pageable);

	// return ResponseEntity.ok(Estados);
	// }

}