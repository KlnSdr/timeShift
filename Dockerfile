FROM gcr.io/distroless/java21

WORKDIR /app

COPY out/artifacts/timeShift_jar/timeShift.jar /app/app.jar

EXPOSE 3456

CMD ["app.jar"]