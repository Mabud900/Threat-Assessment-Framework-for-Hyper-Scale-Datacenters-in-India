FROM eclipse-temurin:17-jdk-focal

WORKDIR /app

# Copy Maven wrapper and POM
COPY mvnw .
COPY pom.xml .

# Copy .mvn directory for Maven native cache
COPY .mvn .mvn

# Copy source code
COPY src ./src

# Make the wrapper executable
RUN chmod +x ./mvnw

# Build the application using Maven
RUN ./mvnw clean package -DskipTests

# Expose port 8080 (Spring Boot default)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "target/java-backend-0.0.1-SNAPSHOT.jar"]