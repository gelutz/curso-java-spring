package com.rsdata.algamoney.resource;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rsdata.algamoney.event.RecursoCriadoEvent;
import com.rsdata.algamoney.model.Lancamento;
import com.rsdata.algamoney.model.TipoLancamento;
import com.rsdata.algamoney.repository.LancamentoRepository;
import com.rsdata.algamoney.repository.filter.LancamentoFilter;
import com.rsdata.algamoney.repository.projection.ResumoLancamento;
import com.rsdata.algamoney.service.LancamentoService;

@RestController
@RequestMapping("/lancamentos")
public class LancamentoResource {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private LancamentoService lancamentoService;

	@Autowired
	private LancamentoRepository lancamentoRepository;

	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
	public ResponseEntity<Page<Lancamento>> pesquisar(LancamentoFilter filter, Pageable pageable) {
		Page<Lancamento> lancamentos = lancamentoRepository.filtrar(filter, pageable);

		return ResponseEntity.ok(lancamentos);
	}

	@GetMapping("/tipos")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
	public ResponseEntity<List<TipoLancamento>> buscarTipos() {
		List<TipoLancamento> tipos = new ArrayList<TipoLancamento>();

		tipos.add(TipoLancamento.RECEITA);
		tipos.add(TipoLancamento.DESPESA);

		return ResponseEntity.ok(tipos);
	}

	@GetMapping(params = "resumo")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
	public ResponseEntity<Page<ResumoLancamento>> resumir(LancamentoFilter filter, Pageable pageable) {
		Page<ResumoLancamento> lancamento = lancamentoService.resumir(filter, pageable);

		return ResponseEntity.ok(lancamento);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
	public ResponseEntity<Lancamento> buscarPorId(@PathVariable Long id) {
		Lancamento lancamento = lancamentoService.buscarPorId(id);

		return ResponseEntity.ok(lancamento);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_LANCAMENTO')")
	public ResponseEntity<Lancamento> criarLancamento(@Valid @RequestBody Lancamento lancamento,
			HttpServletResponse response) {
		Lancamento novoLancamento = lancamentoService.criar(lancamento);

		publisher.publishEvent(new RecursoCriadoEvent(this, response, novoLancamento.getId()));

		return ResponseEntity.ok(novoLancamento);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVER_LANCAMENTO')")
	public void removerLancamentoPorId(@PathVariable Long id) {
		lancamentoService.remover(id);
	}
}
