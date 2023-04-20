package com.rsdata.algamoney.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rsdata.algamoney.model.Endereco;
import com.rsdata.algamoney.model.Pessoa;
import com.rsdata.algamoney.repository.PessoaRepository;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository pessoaRepository;

	public Pessoa buscarPorId(Long id) {
		return pessoaRepository.findById(id).get();
	}

	public Pessoa buscarSeExisteEAtivo(Long id) {
		Pessoa pessoa = pessoaRepository.findById(id).get();
		if (pessoa == null || !pessoa.isAtivo()) {
			return null;
		}

		return pessoa;
	}

	public Pessoa salvar(Pessoa pessoa) {
		pessoa.getContatos().forEach(contato -> contato.setPessoa(pessoa));

		return pessoaRepository.save(pessoa);
	}

	public Pessoa atualizar(Long id, Pessoa dados) {
		Optional<Pessoa> objectPessoa = pessoaRepository.findById(id);

		if (objectPessoa.isEmpty()) {
			return null;
		}

		Pessoa pessoaSalva = objectPessoa.get();
		Long oldId = pessoaSalva.getId();

		pessoaSalva.getContatos().clear();
		pessoaSalva.getContatos().addAll(dados.getContatos());
		pessoaSalva.getContatos().forEach(contato -> contato.setPessoa(pessoaSalva));

		BeanUtils.copyProperties(dados, pessoaSalva, "id", "contatos");
		pessoaSalva.setId(oldId);

		return pessoaRepository.save(pessoaSalva);
	}

	public Pessoa atualizarAtivo(Long id, boolean ativo) {
		Pessoa objectPessoa = pessoaRepository.findById(id).get();
		objectPessoa.setAtivo(ativo);

		return pessoaRepository.saveAndFlush(objectPessoa);
	}

	public Pessoa atualizarEndereco(Long id, Endereco dados) {
		Optional<Pessoa> objectPessoa = pessoaRepository.findById(id);

		if (objectPessoa.isEmpty()) {
			return null;
		}

		Pessoa pessoa = objectPessoa.get();

		Endereco endereco = pessoa.getEndereco() != null
				? pessoa.getEndereco()
				: new Endereco();

		BeanUtils.copyProperties(dados, endereco);
		pessoa.setEndereco(endereco);

		return pessoaRepository.save(pessoa);
	}
}
