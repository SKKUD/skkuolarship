package dev.skku.scholar.backend.jwt;

import dev.skku.scholar.backend.Service.UserService;
import dev.skku.scholar.backend.domain.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.security.auth.message.AuthException;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

// OncePerRequestFilter : 매번 들어갈 때 마다 체크 해주는 필터
@RequiredArgsConstructor
@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final String secretKey;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authorizationHeader == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // Header의 Authorization 값이 'Bearer '로 시작하지 않으면 => 잘못된 토큰
        if(!authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 전송받은 값에서 'Bearer ' 뒷부분(Jwt Token) 추출
        String token = authorizationHeader.split(" ")[1];

        // 전송받은 Jwt Token이 만료되었으면 => 다음 필터 진행(인증 X)
        if(JwtTokenUtil.isExpired(token, secretKey)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Jwt Token에서 loginId 추출
        String loginId = JwtTokenUtil.getLoginId(token, secretKey);
        // 추출한 loginId로 User 찾아오기
        User loginUser = userService.getLoginUserByUsername(loginId);

        // loginUser 정보로 UsernamePasswordAuthenticationToken 발급
        // loginUser 정보로 UsernamePasswordAuthenticationToken 발급
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser.getUsername(), null, Collections.emptyList());



        // 권한 부여
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        //log.info(SecurityContextHolder.getContext().getAuthentication().toString());
        filterChain.doFilter(request, response);
        /*try {
            String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

            // Header의 Authorization 값이 비어있으면 => Jwt Token을 전송하지 않음 => 로그인 하지 않음
            if(authorizationHeader == null) {
                filterChain.doFilter(request, response);
                throw new AuthException("missing Authorization header");
            }

            // Header의 Authorization 값이 'Bearer '로 시작하지 않으면 => 잘못된 토큰
            if(!authorizationHeader.startsWith("Bearer ")) {
                    filterChain.doFilter(request, response);
                throw new BadCredentialsException("Invalid token format");
            }

            // 전송받은 값에서 'Bearer ' 뒷부분(Jwt Token) 추출
            String token = authorizationHeader.split(" ")[1];

            // 전송받은 Jwt Token이 만료되었으면 => 다음 필터 진행(인증 X)
            if(JwtTokenUtil.isExpired(token, secretKey)) {
                filterChain.doFilter(request, response);
                throw new ExpiredJwtException(null, null, "Expired token");
            }

            // Jwt Token에서 loginId 추출
            String loginId = JwtTokenUtil.getLoginId(token, secretKey);
            // 추출한 loginId로 User 찾아오기
            User loginUser = userService.getLoginUserByUsername(loginId);

            // loginUser 정보로 UsernamePasswordAuthenticationToken 발급
            // loginUser 정보로 UsernamePasswordAuthenticationToken 발급
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginUser.getUsername(), null, Collections.emptyList());



            // 권한 부여
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            //log.info(SecurityContextHolder.getContext().getAuthentication().toString());
            filterChain.doFilter(request, response);

        }
        catch (ExpiredJwtException e) {
            response.setStatus(HttpStatus.FORBIDDEN.value()); // 403 Forbidden 응답 설정
            response.getWriter().write("Token has expired");
            return;
        } catch (BadCredentialsException | AuthException e) {
            response.setStatus(HttpStatus.FORBIDDEN.value()); // 403 Forbidden 응답 설정
            response.getWriter().write("Invalid token format");
            return;
        }*/

    }

}
