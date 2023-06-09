package com.rsdata.algamoney.repository.lancamento;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.rsdata.algamoney.model.Categoria_;
import com.rsdata.algamoney.model.Lancamento;
import com.rsdata.algamoney.model.Lancamento_;
import com.rsdata.algamoney.model.Pessoa_;
import com.rsdata.algamoney.repository.filter.LancamentoFilter;
import com.rsdata.algamoney.repository.projection.LancamentosPorCategoria;
import com.rsdata.algamoney.repository.projection.LancamentosPorDia;
import com.rsdata.algamoney.repository.projection.ResumoLancamento;

public class LancamentoRepositoryImpl implements LancamentoRepositoryQuery {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Page<Lancamento> filtrar(LancamentoFilter filter, Pageable pageable) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Lancamento> criteria = builder.createQuery(Lancamento.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);

		// restrições
		Predicate[] predicates = criarRestricoes(filter, builder, root);
		criteria.where(predicates);

		TypedQuery<Lancamento> query = em.createQuery(criteria);
		adicionarRestricoesDePaginacao(query, pageable);

		return new PageImpl<Lancamento>(query.getResultList(), pageable, total(filter));
	}

	@Override
	public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<ResumoLancamento> criteria = builder.createQuery(ResumoLancamento.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);

		criteria.select(builder.construct(ResumoLancamento.class,
				root.get(Lancamento_.id),
				root.get(Lancamento_.descricao),
				root.get(Lancamento_.dataVencimento),
				root.get(Lancamento_.dataPagamento),
				root.get(Lancamento_.valor),
				root.get(Lancamento_.tipo),
				root.get(Lancamento_.categoria).get(Categoria_.nome),
				root.get(Lancamento_.pessoa).get(Pessoa_.nome)));

		Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<ResumoLancamento> query = em.createQuery(criteria);
		adicionarRestricoesDePaginacao(query, pageable);

		return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
	}

	@Override
	public List<LancamentosPorCategoria> porCategoria(LocalDate dataRef) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<LancamentosPorCategoria> query = builder.createQuery(LancamentosPorCategoria.class);
		Root<Lancamento> root = query.from(Lancamento.class);

		query.select(builder.construct(LancamentosPorCategoria.class,
				root.get(Lancamento_.categoria),
				builder.sum(root.get(Lancamento_.valor))));

		LocalDate primeiroDia = dataRef.withDayOfMonth(1);
		LocalDate ultimoDia = dataRef.withDayOfMonth(dataRef.lengthOfMonth());

		query.where(builder.between(root.get(Lancamento_.dataVencimento), primeiroDia, ultimoDia));
		query.groupBy(root.get(Lancamento_.categoria));

		return em.createQuery(query).getResultList();
	}

	@Override
	public List<LancamentosPorDia> porDia(LocalDate dataRef) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<LancamentosPorDia> query = builder.createQuery(LancamentosPorDia.class);
		Root<Lancamento> root = query.from(Lancamento.class);

		query.select(builder.construct(LancamentosPorDia.class,
				root.get(Lancamento_.tipo),
				root.get(Lancamento_.dataVencimento),
				builder.sum(root.get(Lancamento_.valor))));

		LocalDate primeiroDia = dataRef.withDayOfMonth(1);
		LocalDate ultimoDia = dataRef.withDayOfMonth(dataRef.lengthOfMonth());

		query.where(builder.between(root.get(Lancamento_.dataVencimento), primeiroDia, ultimoDia));
		query.groupBy(root.get(Lancamento_.dataVencimento), root.get(Lancamento_.tipo));

		return em.createQuery(query).getResultList();
	}

	private Long total(LancamentoFilter filter) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);

		Predicate[] predicates = criarRestricoes(filter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));

		return em.createQuery(criteria).getSingleResult();
	}

	private <T> void adicionarRestricoesDePaginacao(TypedQuery<T> query, Pageable pageable) {

		int totalPorPagina = pageable.getPageSize();
		int primeiroIndex = pageable.getPageNumber() * totalPorPagina;

		query.setFirstResult(primeiroIndex);
		query.setMaxResults(totalPorPagina);
	}

	private Predicate[] criarRestricoes(LancamentoFilter filter, CriteriaBuilder builder, Root<Lancamento> root) {
		List<Predicate> predicates = new ArrayList<Predicate>();

		addPredicatesDeData(predicates, filter, builder, root);

		// descricao
		if (!StringUtils.isEmpty(filter.getDescricao())) {
			predicates.add(builder.like(
					builder.lower(root.get(Lancamento_.descricao)),
					"%" + filter.getDescricao().toLowerCase() + "%"));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}

	private void addPredicatesDeData(List<Predicate> predicates, LancamentoFilter filter,
			CriteriaBuilder builder, Root<Lancamento> root) {

		// caso haja vencimentoDe e vencimentoAte = faz um between
		if (filter.getVencimentoDe() != null && filter.getVencimentoAte() != null) {
			predicates.add(
					builder.between(
							root.get(Lancamento_.dataVencimento),
							filter.getVencimentoDe(),
							filter.getVencimentoAte()));
		}

		// caso contrário, só vê uma data maior que o vencimentoDe
		// ou menor que o vencimentoAte
		if (filter.getVencimentoDe() != null) {
			predicates.add(
					builder.greaterThanOrEqualTo(
							root.get(Lancamento_.dataVencimento), filter.getVencimentoDe()));
		}

		if (filter.getVencimentoAte() != null) {
			predicates.add(
					builder.lessThanOrEqualTo(
							root.get(Lancamento_.dataVencimento), filter.getVencimentoAte()));
		}
	}
}
