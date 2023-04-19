package com.rsdata.algamoney.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.rsdata.algamoney.errors.BadRequestException;
import com.rsdata.algamoney.errors.NotFoundException;
import com.rsdata.algamoney.model.Categoria;
import com.rsdata.algamoney.model.Lancamento;
import com.rsdata.algamoney.model.Pessoa;
import com.rsdata.algamoney.repository.LancamentoRepository;
import com.rsdata.algamoney.repository.filter.LancamentoFilter;
import com.rsdata.algamoney.repository.projection.ResumoLancamento;

@Service
public class LancamentoService {

	@Autowired
	private PessoaService pessoaServices;

	@Autowired
	private CategoriaService categoriaServices;

	@Autowired
	private LancamentoRepository lancamentoRepository;

	@Autowired
	private MessageSource messageSource;

	private String NotFoundMessage() {
		return messageSource.getMessage("recurso.nao-encontrado", null,
				LocaleContextHolder.getLocale());
	}

	public Page<Lancamento> pesquisar(LancamentoFilter filter, Pageable page) {
		Page<Lancamento> lancamentos = lancamentoRepository.filtrar(filter, page);

		if (ObjectUtils.isEmpty(lancamentos)) {
			throw new NotFoundException(this.NotFoundMessage());
		}

		return lancamentos;
	}

	public Page<ResumoLancamento> resumir(LancamentoFilter filter, Pageable page) {
		Page<ResumoLancamento> lancamentos = lancamentoRepository.resumir(filter, page);

		if (ObjectUtils.isEmpty(lancamentos)) {
			throw new NotFoundException(this.NotFoundMessage());
		}

		return lancamentos;
	}

	public List<Lancamento> buscarTodos() {
		List<Lancamento> lancamentos = lancamentoRepository.findAll();
		if (lancamentos == null) {
			throw new NotFoundException(this.NotFoundMessage());
		}

		return lancamentos;
	}

	public Lancamento buscarPorId(Long id) {
		Optional<Lancamento> lancamento = lancamentoRepository.findById(id);
		if (ObjectUtils.isEmpty(lancamento)) {
			throw new NotFoundException(this.NotFoundMessage());
		}

		return lancamento.get();
	}

	public Lancamento criar(Lancamento dados) {
		Lancamento novoLancamento = new Lancamento();
		Categoria categoriaLancamento = new Categoria();

		if (ObjectUtils.isEmpty(dados.getPessoa())) {
			throw new BadRequestException(
					messageSource.getMessage("mensagem.invalida", null, LocaleContextHolder.getLocale()));
		}

		Pessoa pessoaLancamento = pessoaServices.buscarPorId(dados.getPessoa().getId());
		if (pessoaLancamento == null || !pessoaLancamento.isAtivo()) {
			throw new NotFoundException(this.NotFoundMessage());
		}

		categoriaLancamento = categoriaServices.buscarPorId(dados.getCategoria().getId());
		if (categoriaLancamento == null) {
			throw new NotFoundException(this.NotFoundMessage());
		}

		BeanUtils.copyProperties(dados, novoLancamento);
		novoLancamento.setPessoa(pessoaLancamento);
		novoLancamento.setCategoria(categoriaLancamento);

		return lancamentoRepository.save(novoLancamento);
	}

	public Lancamento atualizar(Long id, Lancamento lancamento) {
		Optional<Lancamento> objectLancamento = lancamentoRepository.findById(id);

		if (objectLancamento.isEmpty()) {
			return null;
		}

		Lancamento lancamentoSalvo = objectLancamento.get();
		Long oldId = lancamentoSalvo.getId();

		BeanUtils.copyProperties(lancamento, lancamentoSalvo);
		lancamentoSalvo.setId(oldId);

		return lancamentoRepository.save(lancamentoSalvo);
	}

	public void remover(Long id) {

		lancamentoRepository.deleteById(id);
	}
}
