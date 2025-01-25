FROM openjdk:21-jdk-slim

WORKDIR /app

COPY out/artifacts/timeShift_jar/timeShift.jar /app/app.jar

EXPOSE 3456

CMD ["java", "-jar", "/app/app.jar"]