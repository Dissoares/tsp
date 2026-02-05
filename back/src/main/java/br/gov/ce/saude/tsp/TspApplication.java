package br.gov.ce.saude.tsp;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.SpringApplication;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@SpringBootApplication

public class TspApplication {
	public static void main(String[] args) {
		SpringApplication.run(TspApplication.class, args);
	}
}
