# 빌드 스테이지
FROM node:22.16.0-alpine AS builder

WORKDIR /app

# 패키지 파일 복사
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile

# 소스코드 복사
COPY . .

# 애플리케이션 빌드
RUN yarn build

# 프로덕션 스테이지
FROM node:22.16.0-alpine AS production

WORKDIR /app

# 패키지 파일 복사
COPY package.json yarn.lock ./

# 프로덕션 의존성만 설치
RUN yarn install --frozen-lockfile --production

# 빌드된 애플리케이션을 빌더 스테이지에서 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Prisma 클라이언트 생성
RUN npx prisma generate