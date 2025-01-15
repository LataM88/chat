package chat.example.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Konfiguracja CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Upewnij się, że adres jest poprawny
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization", "*"));
        return source;
    }

    // Konfiguracja Spring Security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Wyłącz CSRF na potrzeby testowania
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/register").permitAll() // Zezwól na dostęp do endpointu rejestracji
                        .anyRequest().authenticated() // Pozostałe endpointy wymagają uwierzytelnienia
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource())); // Przypisanie konfiguracji CORS
        return http.build();
    }
}