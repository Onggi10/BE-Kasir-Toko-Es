# Build Stage
FROM golang:1.21 AS builder

WORKDIR /app

# Copy go.mod dan go.sum lebih dulu
COPY go.mod go.sum ./

# Download dependensi dengan go mod tidy
RUN go mod tidy
ENV GOTOOLCHAIN=auto
ENV GOPROXY=https://proxy.golang.org,direct
RUN go mod download

# Copy semua file setelah dependensi di-download
COPY . .

# Build aplikasi Golang
RUN go build -o main .

# Runtime Stage
FROM alpine:latest

WORKDIR /root/
RUN apk add --no-cache ca-certificates

COPY --from=builder /app/main .

CMD ["./main"]
