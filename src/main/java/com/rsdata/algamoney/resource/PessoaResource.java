package com.rsdata.algamoney.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rsdata.algamoney.event.RecursoCriadoEvent;
import com.rsdata.algamoney.model.Endereco;
import com.rsdata.algamoney.model.Pessoa;
import com.rsdata.algamoney.repository.PessoaRepository;
import com.rsdata.algamoney.service.PessoaService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/pessoas")
public class PessoaResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private PessoaService pessoaServices;

	// [GET]
	@GetMapping
	public List<Pessoa> listar() {
		List<Pessoa> todasPessoas = pessoaRepository.findAll();
		List<Pessoa> pessoasAtivas = new ArrayList<Pessoa>();
		for (Pessoa pessoa : todasPessoas) {
			if (pessoa.getAtivo()) {
				pessoasAtivas.add(pessoa);
			}
		}

		return pessoasAtivas;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Pessoa> buscarPorId(@PathVariable Long id) {
		Optional<Pessoa> pessoa = pessoaRepository.findById(id);

		if (pessoa.isEmpty() || !pessoa.get().isAtivo()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(pessoa.get());
	}
	// [/GET]

	// [POST]
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Pessoa> criarPessoa(@Valid @RequestBody Pessoa pessoa, HttpServletResponse response) {
		Pessoa novaPessoa = pessoaRepository.save(pessoa);

		publisher.publishEvent(new RecursoCriadoEvent(this, response, novaPessoa.getId()));

		return ResponseEntity.status(HttpStatus.CREATED).body(novaPessoa);
	}

	@PostMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public ResponseEntity<?> reativarPessoa(@PathVariable Long id) {
		Pessoa pessoaAtualizada = pessoaServices.reativarPessoa(id);

		if (pessoaAtualizada == null) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(pessoaAtualizada);
	}
	// [/POST]

	// [PUT]
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public ResponseEntity<Pessoa> atualizarPessoa(@PathVariable Long id, @Valid @RequestBody Pessoa pessoa) {
		Pessoa pessoaAtualizada = pessoaServices.atualizar(id, pessoa);

		if (pessoaAtualizada == null) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(pessoaAtualizada);
	}

	@PutMapping("/{id}/ativo")
	public ResponseEntity<Object> atualizarAtivo(@PathVariable Long id, @Valid @RequestBody boolean ativo) {
		Pessoa pessoa = ativo
				? pessoaServices.reativarPessoa(id)
				: pessoaServices.desativarPessoa(id);

		if (pessoa == null) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(pessoa);
	}

	@PutMapping("/{id}/endereco")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public ResponseEntity<Object> atualizarEndereco(@PathVariable Long id, @Valid @RequestBody Endereco enderecoNovo) {
		Pessoa pessoaAtualizada = pessoaServices.atualizarEndereco(id, enderecoNovo);

		if (pessoaAtualizada == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(pessoaAtualizada);
	}
	// [/PUT]

	// [DELETE]
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Object> desativarPessoa(@PathVariable Long id) {
		Optional<Pessoa> object = pessoaRepository.findById(id);

		if (object.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		Pessoa pessoa = object.get();
		if (pessoa.isAtivo()) {
			pessoa.setAtivo(false);
			pessoaRepository.save(pessoa);
		}

		return ResponseEntity.ok(pessoa);
	}
	// [/DELETE]

}