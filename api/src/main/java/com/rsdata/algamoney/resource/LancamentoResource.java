package com.rsdata.algamoney.resource;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.FileSystems;
import java.time.LocalDate;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rsdata.algamoney.event.RecursoCriadoEvent;
import com.rsdata.algamoney.model.Lancamento;
import com.rsdata.algamoney.model.TipoLancamento;
import com.rsdata.algamoney.repository.LancamentoRepository;
import com.rsdata.algamoney.repository.filter.LancamentoFilter;
import com.rsdata.algamoney.repository.projection.LancamentosPorCategoria;
import com.rsdata.algamoney.repository.projection.LancamentosPorDia;
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

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
	public ResponseEntity<Lancamento> buscarPorId(@PathVariable Long id) {
		Lancamento lancamento = lancamentoService.buscarPorId(id);

		return ResponseEntity.ok(lancamento);
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

	@GetMapping("/estatisticas/categoria")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
	public ResponseEntity<List<LancamentosPorCategoria>> porCategoria() {
		List<LancamentosPorCategoria> lancamento = lancamentoService.porCategoria(LocalDate.now());

		return ResponseEntity.ok(lancamento);
	}

	@GetMapping("/estatisticas/dia")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_LANCAMENTO')")
	public ResponseEntity<List<LancamentosPorDia>> porDia() {
		List<LancamentosPorDia> lancamento = lancamentoService.porDia(LocalDate.now());

		return ResponseEntity.ok(lancamento);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_LANCAMENTO')")
	public ResponseEntity<Lancamento> criarLancamento(@Valid @RequestBody Lancamento lancamento,
			HttpServletResponse response) {
		System.out.println(lancamento.toString());
		Lancamento novoLancamento = lancamentoService.criar(lancamento);

		publisher.publishEvent(new RecursoCriadoEvent(this, response, novoLancamento.getId()));

		return ResponseEntity.ok(novoLancamento);
	}

	@PostMapping("/anexo")
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_LANCAMENTO')")
	public ResponseEntity<String> uploadArquivo(@RequestParam MultipartFile arquivo) throws IOException {
		int random = (int) (Math.random() * 1000);
		String path = FileSystems
				.getDefault()
				.getPath(".")
				.toAbsolutePath()
				.getParent() + "/src/main/resources/uploads/";

		String nomeArquivoOriginal = arquivo.getOriginalFilename();
		String nomeArquivo = nomeArquivoOriginal.substring(0, nomeArquivoOriginal.lastIndexOf('.'));
		String extensaoArquivo = nomeArquivoOriginal.substring(nomeArquivoOriginal.lastIndexOf('.'));

		OutputStream out = new FileOutputStream(
				path + nomeArquivo + random + extensaoArquivo);

		out.write(arquivo.getBytes());
		out.close();

		return ResponseEntity.ok("Upload bem sucedido.");
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_LANCAMENTO')")
	public ResponseEntity<Lancamento> atualizar(@PathVariable Long id, @Valid @RequestBody Lancamento lancamento) {
		Lancamento lancamentoAtualizado = lancamentoService.atualizar(id, lancamento);

		return ResponseEntity.ok(lancamentoAtualizado);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVER_LANCAMENTO')")
	public void removerLancamentoPorId(@PathVariable Long id) {
		lancamentoService.remover(id);
	}
}
