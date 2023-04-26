package com.rsdata.algamoney.repository.cidade;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class CidadeRepositoryImpl implements CidadeRepositoryQuery {

	@PersistenceContext
	private EntityManager em;

	// @Override
	// public List<Cidade> findByEstado(PessoaFilter filter, Pageable pageable) {
	// CriteriaBuilder builder = em.getCriteriaBuilder();
	// CriteriaQuery<Pessoa> criteria = builder.createQuery(Pessoa.class);
	// Root<Pessoa> root = criteria.from(Pessoa.class);

	// // restrições
	// Predicate[] predicates = criarRestricoes(filter, builder, root);
	// criteria.where(predicates);

	// TypedQuery<Pessoa> query = em.createQuery(criteria);
	// adicionarRestricoesDePaginacao(query, pageable);

	// return new PageImpl<Pessoa>(query.getResultList(), pageable, total(filter));
	// }

}
