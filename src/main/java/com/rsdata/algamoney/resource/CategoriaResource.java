package com.rsdata.algamoney.resource;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rsdata.algamoney.event.RecursoCriadoEvent;
import com.rsdata.algamoney.model.Categoria;
import com.rsdata.algamoney.repository.CategoriaRepository;

@RestController
@RequestMapping("/categorias")
public class CategoriaResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private CategoriaRepository categoriaRepository;

	@CrossOrigin(maxAge = 10)
	@GetMapping
	public List<Categoria> listar() {
		return categoriaRepository.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Categoria> criar(@Valid @RequestBody Categoria categoria, HttpServletResponse response) {
		Categoria novaCategoria = categoriaRepository.save(categoria);

		publisher.publishEvent(new RecursoCriadoEvent(this, response, novaCategoria.getId()));

		return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> buscarPeloId(@PathVariable Long id) {
		Optional<Categoria> categoria = categoriaRepository.findById(id);

		if (categoria.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(categoria);
	}
}
