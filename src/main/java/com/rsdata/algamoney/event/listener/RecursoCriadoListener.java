package com.rsdata.algamoney.event.listener;

import java.net.URI;

import org.springframework.context.ApplicationListener;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rsdata.algamoney.event.RecursoCriadoEvent;

import javax.servlet.http.HttpServletResponse;

public class RecursoCriadoListener implements ApplicationListener<RecursoCriadoEvent> {

	@Override
	public void onApplicationEvent(RecursoCriadoEvent rcEvent) {
		HttpServletResponse response = rcEvent.getResponse();
		Long id = rcEvent.getId();

		adicionarHeader(response, id);
	}

	private void adicionarHeader(HttpServletResponse response, Long id) {
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri()
				.path("/{id}")
				.buildAndExpand(id).toUri();

		response.setHeader("Location", uri.toASCIIString());
	}
}
