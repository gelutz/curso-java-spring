package com.rsdata.algamoney.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.rsdata.algamoney.errors.UsernameNotFoundException;
import com.rsdata.algamoney.model.Usuario;
import com.rsdata.algamoney.repository.UsuarioRepository;

@Service
public class AppUserDetailsService implements UserDetailsService {
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(
				() -> new UsernameNotFoundException("Usuário e/ou senha incorretos"));

		return new User(email, usuario.getSenha(), getPermissoes(usuario));
	}

	private Collection<? extends GrantedAuthority> getPermissoes(Usuario usuario) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		usuario.getPermissoes().forEach(
				permissao -> authorities.add(new SimpleGrantedAuthority(permissao.getDescricao().toUpperCase())));

		return authorities;
	}
}
