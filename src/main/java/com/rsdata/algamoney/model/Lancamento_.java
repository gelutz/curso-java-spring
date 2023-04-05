package com.rsdata.algamoney.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Lancamento.class)
public abstract class Lancamento_ {

	public static volatile SingularAttribute<Lancamento, TipoLancamento> tipo;
	public static volatile SingularAttribute<Lancamento, String> observacao;
	public static volatile SingularAttribute<Lancamento, String> dataPagamento;
	public static volatile SingularAttribute<Lancamento, String> dataVencimento;
	public static volatile SingularAttribute<Lancamento, BigDecimal> valor;
	public static volatile SingularAttribute<Lancamento, Long> id;
	public static volatile SingularAttribute<Lancamento, Pessoa> pessoaId;
	public static volatile SingularAttribute<Lancamento, String> descricao;
	public static volatile SingularAttribute<Lancamento, Categoria> categoriaId;

	public static final String TIPO = "tipo";
	public static final String OBSERVACAO = "observacao";
	public static final String DATA_PAGAMENTO = "dataPagamento";
	public static final String DATA_VENCIMENTO = "dataVencimento";
	public static final String VALOR = "valor";
	public static final String ID = "id";
	public static final String PESSOA_ID = "pessoaId";
	public static final String DESCRICAO = "descricao";
	public static final String CATEGORIA_ID = "categoriaId";

}

