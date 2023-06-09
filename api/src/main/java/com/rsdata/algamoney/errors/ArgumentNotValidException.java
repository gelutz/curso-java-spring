package com.rsdata.algamoney.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ArgumentNotValidException extends RuntimeException {

	public ArgumentNotValidException(String message) {
		super(message);
	}
}