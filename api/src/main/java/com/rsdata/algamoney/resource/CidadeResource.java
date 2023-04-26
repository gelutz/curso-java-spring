package com.rsdata.algamoney.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rsdata.algamoney.model.Cidade;
import com.rsdata.algamoney.repository.CidadeRepository;

@RestController
@RequestMapping("/cidades")
public class CidadeResource {

	@Autowired
	private CidadeRepository cidadeRepository;

	// [GET]
	@GetMapping
	public ResponseEntity<List<Cidade>> pesquisar(@RequestParam Long estado) {
		List<Cidade> Cidades = cidadeRepository.findByEstadoId(estado);

		return ResponseEntity.ok(Cidades);
	}

}