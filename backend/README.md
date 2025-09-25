# Gaming Tournament Backend (Spring Boot + MySQL)

## Prerequisites
- Java 17+
- Maven 3.9+
- MySQL running locally with a database named `gtp`

## Configure
Edit `src/main/resources/application.properties` with your MySQL username/password:
```
spring.datasource.url=jdbc:mysql://localhost:3306/gtp?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=changeme
```

## Run
```
mvn spring-boot:run
```
Server will start at `http://localhost:8080` with CORS allowed for `http://localhost:5173`.

## API
- Auth
  - POST `/api/auth/register` { name, email, password, role }
  - POST `/api/auth/login` { email, password }
- Tournaments
  - GET `/api/tournaments`
  - POST `/api/tournaments` (admin) body: Tournament JSON
  - GET `/api/tournaments/{id}`
- Registrations
  - POST `/api/registrations/join` { userId, tournamentId }
  - GET `/api/registrations/user/{userId}`

Note: This demo does not include JWT yet; add Spring Security + JWT for production.

