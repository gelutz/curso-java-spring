package com.rsdata.algamoney.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(value = "lutz")
public class ApiProperty {

	private final String origemPermitida = "http://localhost:4200";
	private final Seguranca seguranca = new Seguranca();

	public final Mail mail = new Mail();

	public Mail getMail() {
		return mail;
	}

	public String getOrigemPermitida() {
		return origemPermitida;
	}

	public Seguranca getSeguranca() {
		return seguranca;
	}

	public class Seguranca {

		public List<String> redirectsPermitidos;
		public String authServerUrl;

		public List<String> getRedirectsPermitidos() {
			return redirectsPermitidos;
		}

		public void setRedirectsPermitidos(List<String> redirectsPermitidos) {
			this.redirectsPermitidos = redirectsPermitidos;
		}

		public String getAuthServerUrl() {
			return authServerUrl;
		}

		public void setAuthServerUrl(String authServerUrl) {
			this.authServerUrl = authServerUrl;
		}

	}

	public class Mail {
		private String host;
		private Integer port;
		private String username;
		private String password;

		public String getHost() {
			return host;
		}

		public void setHost(String host) {
			this.host = host;
		}

		public Integer getPort() {
			return port;
		}

		public void setPort(Integer port) {
			this.port = port;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

	}
}
