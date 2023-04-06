package com.rsdata.algamoney.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.rsdata.algamoney.service.PessoaService;

public class GeradorSenha {

	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		System.out.println(encoder.encode("admin"));
		PessoaService pessoaService = new PessoaService();
		System.out.println(pessoaService.buscarPorId((long) 1));
		System.out.println(encoder.matches("admin", "$2a$10$nJOx2d6pEE5utDFCWt3PCeCopTgHvNg15PxCglbGgv1nFnNBqJUWi"));
	}
}
