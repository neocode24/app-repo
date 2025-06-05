# Dockerfile
# 빌드 스테이지
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 프로덕션 스테이지
FROM node:22-alpine
WORKDIR /app

# 빌드된 파일만 복사
COPY --from=builder /app/dist ./

# 애플리케이션 실행을 위한 사용자 생성 (보안 강화)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# 애플리케이션 실행
CMD ["node", "index.js"]
