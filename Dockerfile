FROM docker.klnsdr.com/nyx-cli:1.3 as builder

WORKDIR /app

COPY . .

RUN nyx build

FROM gcr.io/distroless/java21

WORKDIR /app

COPY --from=builder /app/build/timeShift-1.5.jar /app/app.jar

EXPOSE 3456

CMD ["app.jar"]