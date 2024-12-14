# 1. 빌드 스테이지
FROM node:22.11.0-alpine AS builder

# 작업 디렉토리 생성
WORKDIR /usr/src/app

# 의존성 설치
COPY package*.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile

# 소스 코드 및 필요한 설정 파일 복사
COPY . .

# 소스 코드 빌드
RUN yarn build

RUN yarn db:generate

# 2. 실행 스테이지
FROM node:22.11.0-alpine

# 작업 디렉토리 생성
WORKDIR /usr/src/app

# 로그 디렉토리 생성
RUN mkdir logs

RUN apk add --no-cache curl

# 빌드 결과물과 필요한 파일만 복사
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY package*.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install --production --frozen-lockfile