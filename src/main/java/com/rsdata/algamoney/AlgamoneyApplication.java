package com.rsdata.algamoney;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.rsdata.algamoney.config.ApiProperties;

@SpringBootApplication
@EnableConfigurationProperties(value = ApiProperties.class)
public class AlgamoneyApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlgamoneyApplication.class, args);
	}

}
