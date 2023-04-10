package com.rsdata.algamoney.token;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@SuppressWarnings("deprecation")
@ControllerAdvice
public class RefreshTokenPostProcessor implements ResponseBodyAdvice<OAuth2AccessToken> {

	@Override
	public OAuth2AccessToken beforeBodyWrite(OAuth2AccessToken body, MethodParameter arg1, MediaType arg2,
			Class<? extends HttpMessageConverter<?>> arg3, ServerHttpRequest req, ServerHttpResponse res) {

		HttpServletRequest request = ((ServletServerHttpRequest) req).getServletRequest();
		HttpServletResponse response = ((ServletServerHttpResponse) res).getServletResponse();

		String refreshToken = body.getRefreshToken().getValue();
		adicionarRefreshTokenNoCookie(refreshToken, request, response);

		DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) body;
		removerRefreshTokenDoBody(token);

		return body;

	}

	private void removerRefreshTokenDoBody(DefaultOAuth2AccessToken token) {
		token.setRefreshToken(null);
	}

	private void adicionarRefreshTokenNoCookie(String refreshToken, HttpServletRequest request,
			HttpServletResponse response) {
		Cookie rtCookie = new Cookie("refreshToken", refreshToken);

		rtCookie.setHttpOnly(true);
		rtCookie.setSecure(false);
		rtCookie.setPath(request.getContextPath() + "/oauth/token");
		rtCookie.setMaxAge(2590000);

		response.addCookie(rtCookie);
	}

	@Override
	public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
		return returnType.getMethod().getName().equals("postAccessToken");
	}

}
