package com.rsdata.algamoney.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(value = "lutz-security")
public class ApiProperties {

	private final String origemPermitida = "http://localhost";
	private final Seguranca seguranca = new Seguranca();

	public String getOrigemPermitida() {
		return origemPermitida;
	}

	public Seguranca getSeguranca() {
		return seguranca;
	}

	public class Seguranca {
		private boolean enableHttps;

		public Seguranca() {
		}

		public boolean isEnableHttps() {
			return enableHttps;
		}

		public void setEnableHttps(boolean enableHttps) {
			this.enableHttps = enableHttps;
		}
	}
}