package com.rsdata.algamoney.resource;

import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.rsdata.algamoney.repository.filter.PessoaFilter;
import com.rsdata.algamoney.service.PessoaService;

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
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA')")
	public ResponseEntity<Page<Pessoa>> pesquisar(PessoaFilter filter, Pageable pageable) {
		Page<Pessoa> pessoas = pessoaRepository.filtrar(filter, pageable);

		return ResponseEntity.ok(pessoas);
	}

	@GetMapping("/ativos")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA')")
	public ResponseEntity<Page<Pessoa>> pesquisarAtivos(PessoaFilter filter, Pageable pageable) {
		Page<Pessoa> pessoas = pessoaRepository.filtrar(filter, pageable);
		pessoas.map((p) -> p.isAtivo());
		return ResponseEntity.ok(pessoas);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA')")
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
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA')")
	public ResponseEntity<Pessoa> criarPessoa(@Valid @RequestBody Pessoa pessoa, HttpServletResponse response) {
		Pessoa novaPessoa = pessoaRepository.save(pessoa);

		publisher.publishEvent(new RecursoCriadoEvent(this, response, novaPessoa.getId()));

		return ResponseEntity.status(HttpStatus.CREATED).body(novaPessoa);
	}
	// [/POST]

	// [PUT]
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA')")
	public ResponseEntity<Pessoa> atualizarPessoa(@PathVariable Long id, @Valid @RequestBody Pessoa pessoa) {
		Pessoa pessoaAtualizada = pessoaServices.atualizar(id, pessoa);

		if (pessoaAtualizada == null) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(pessoaAtualizada);
	}

	@PutMapping("/{id}/ativo")
	@ResponseStatus(HttpStatus.ACCEPTED)
	// @PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA')")
	public ResponseEntity<Object> atualizarAtivo(@PathVariable Long id, @Valid @RequestBody boolean ativo) {
		Pessoa pessoa = pessoaServices.buscarPorId(id);

		if (pessoa == null) {
			return ResponseEntity.notFound().build();
		}

		pessoa.setAtivo(ativo);
		pessoaServices.atualizar(id, pessoa);

		return ResponseEntity.ok(pessoa);
	}

	@PutMapping("/{id}/endereco")
	@ResponseStatus(HttpStatus.ACCEPTED)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA')")
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
	@PreAuthorize("hasAuthority('ROLE_REMOVER_PESSOA')")
	public ResponseEntity<Object> excluirPessoa(@PathVariable Long id) {
		Optional<Pessoa> object = pessoaRepository.findById(id);

		if (object.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		Pessoa pessoa = object.get();
		pessoaRepository.delete(pessoa);

		return ResponseEntity.noContent().build();
	}
	// [/DELETE]

}