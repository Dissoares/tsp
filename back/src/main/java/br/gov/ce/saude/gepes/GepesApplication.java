package br.gov.ce.saude.gepes;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.SpringApplication;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@SpringBootApplication

public class GepesApplication {
	public static void main(String[] args) {
		SpringApplication.run(GepesApplication.class, args);
	}
}
