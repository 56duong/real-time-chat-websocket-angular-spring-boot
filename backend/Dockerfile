# 1. build the jar
FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /app
COPY . .
RUN chmod +x mvnw
RUN ./mvnw install -DskipTests

# 2. run the jar
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY --from=build app/target/*.jar app.jar
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV GITHUB_TOKEN=${GITHUB_TOKEN}
ENV CORS_ALLOWED_ORIGINS=${CORS_ALLOWED_ORIGINS}
ENTRYPOINT ["java", "-jar", "/app.jar"]