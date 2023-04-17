package com.rsdata.algamoney.repository.pessoa;

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

import com.rsdata.algamoney.model.Pessoa;
import com.rsdata.algamoney.model.Pessoa_;
import com.rsdata.algamoney.repository.filter.PessoaFilter;

public class PessoaRepositoryImpl implements PessoaRepositoryQuery {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Page<Pessoa> filtrar(PessoaFilter filter, Pageable pageable) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Pessoa> criteria = builder.createQuery(Pessoa.class);
		Root<Pessoa> root = criteria.from(Pessoa.class);

		// restrições
		Predicate[] predicates = criarRestricoes(filter, builder, root);
		criteria.where(predicates);

		TypedQuery<Pessoa> query = em.createQuery(criteria);
		adicionarRestricoesDePaginacao(query, pageable);

		return new PageImpl<Pessoa>(query.getResultList(), pageable, total(filter));
	}

	private Long total(PessoaFilter filter) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Pessoa> root = criteria.from(Pessoa.class);

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

	private Predicate[] criarRestricoes(PessoaFilter filter, CriteriaBuilder builder, Root<Pessoa> root) {
		List<Predicate> predicates = new ArrayList<Predicate>();

		addPredicatesDeNome(predicates, filter, builder, root);

		return predicates.toArray(new Predicate[predicates.size()]);
	}

	private void addPredicatesDeNome(List<Predicate> predicates, PessoaFilter filter,
			CriteriaBuilder builder, Root<Pessoa> root) {

		if (!StringUtils.isEmpty(filter.getNome())) {
			predicates.add(builder.like(
					builder.lower(root.get(Pessoa_.nome)),
					"%" + filter.getNome().toLowerCase() + "%"));
		}
	}
}
