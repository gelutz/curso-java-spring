package com.rsdata.algamoney.repository.lancamento;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.rsdata.algamoney.model.Lancamento;
import com.rsdata.algamoney.model.Lancamento_;
import com.rsdata.algamoney.repository.filter.LancamentoFilter;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

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

	private Long total(LancamentoFilter filter) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);

		Predicate[] predicates = criarRestricoes(filter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));

		return em.createQuery(criteria).getSingleResult();
	}

	private void adicionarRestricoesDePaginacao(TypedQuery<Lancamento> query, Pageable pageable) {

		int totalPorPagina = pageable.getPageSize();
		int primeiroIndex = pageable.getPageNumber() * totalPorPagina;

		query.setFirstResult(primeiroIndex);
		query.setMaxResults(totalPorPagina);
	}

	private Predicate[] criarRestricoes(LancamentoFilter filter, CriteriaBuilder builder, Root root) {
		List<Predicate> predicates = new ArrayList<Predicate>();

		if (!StringUtils.isEmpty(filter.getDescricao())) {
			predicates.add(
					builder.like(
							builder.lower(root.get(Lancamento_.descricao)),
							"%" + filter.getDescricao().toLowerCase() + "%"));

		}

		if (filter.getDataVencimentoDe() != null) {
			predicates.add(
					builder.like(
							builder.lower(root.get(Lancamento_.dataVencimento)), filter.getDataVencimentoDe()));
		}

		if (filter.getDataVencimentoAte() != null) {
			predicates.add(
					builder.like(
							builder.lower(root.get(Lancamento_.dataVencimento)), filter.getDataVencimentoAte()));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}
}
