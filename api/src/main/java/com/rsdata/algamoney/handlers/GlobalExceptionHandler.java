package com.rsdata.algamoney.handlers;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.rsdata.algamoney.errors.BadRequestException;
import com.rsdata.algamoney.errors.NotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	String errorHeader = "-x-x: ERROR :x-x-";

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ExceptionDto> BadRequestException(BadRequestException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
				new ExceptionDto(e.getMessage()));
	}

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ExceptionDto> NotFoundException(NotFoundException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
				new ExceptionDto(e.getMessage()));
	}

	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	public ResponseEntity<ExceptionDto> IntegrityConstraintViolationException(
			SQLIntegrityConstraintViolationException e) {

		String message = "O registro está relacionado à um registro de outra tabela";
		System.out.println(this.errorHeader);
		System.out.println(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
				new ExceptionDto(message));
	}

	public class ExceptionDto {

		private String message;

		public ExceptionDto(String message) {
			super();
			this.message = message;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}
	}
}
