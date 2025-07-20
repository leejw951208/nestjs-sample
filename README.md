# NestJS Sample API

Clean Architecture 패턴을 적용한 NestJS 기반 REST API 프로젝트입니다.

## 🚀 주요 기능

- **인증 시스템**: JWT 기반 로그인/회원가입
- **토큰 관리**: Access Token & Refresh Token 시스템
- **사용자 관리**: 사용자 CRUD 및 프로필 관리
- **게시물 관리**: 게시물 CRUD 기능
- **데이터베이스**: PostgreSQL + Prisma ORM
- **로깅**: Winston 기반 구조화된 로깅
- **API 문서**: Swagger/OpenAPI 자동 생성
- **환경 관리**: 다중 환경 설정 (local/dev/prod)

## 🛠 기술 스택

### Backend

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL
- **ORM**: Prisma 6.x
- **Authentication**: Passport.js + JWT
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston + Daily Rotate File

### DevOps

- **Environment**: Node.js 18+
- **Package Manager**: Yarn

## 📋 요구사항

- Node.js 18.0.0 이상
- PostgreSQL 14.0 이상

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone <repository-url>
cd nestjs-sample
```

### 2. 의존성 설치

```bash
yarn install
```

### 3. 환경 변수 설정

```bash
# 환경 변수 파일 생성
yarn env:create

# 또는 수동으로 .env.local 파일 생성
cp envs/.env.example .env.local
```

### 4. 데이터베이스 설정

```bash
# PostgreSQL 실행 (로컬 설치된 경우)
# 또는 Docker 사용 시: docker-compose up -d postgres
```

### 5. 데이터베이스 마이그레이션

```bash
# Prisma 클라이언트 생성
yarn db:generate

# 마이그레이션 실행
yarn db:migrate
```

### 6. 애플리케이션 실행

```bash
# 개발 모드
yarn start:local

# 또는 프로덕션 모드
yarn build
yarn start:prod
```

## 📁 프로젝트 구조

```
nestjs-sample/
├── src/
│   ├── _common/                # 공통 모듈
│   │   ├── config/             # 설정 파일
│   │   ├── decorator/          # 커스텀 데코레이터
│   │   ├── dto/                # 공통 DTO
│   │   ├── exception/          # 예외 처리
│   │   ├── guard/              # 가드
│   │   ├── middleware/         # 미들웨어
│   │   ├── prisma/             # Prisma 설정
│   │   └── strategy/           # Passport 전략
│   ├── auth/                   # 인증 모듈
│   ├── user/                   # 사용자 모듈
│   ├── post/                   # 게시물 모듈
│   └── main.ts                 # 애플리케이션 진입점
├── prisma/
│   ├── models/                 # Prisma 모델
│   ├── migrations/             # 마이그레이션 파일
│   └── scripts/                # 데이터베이스 스크립트
├── scripts/                    # 유틸리티 스크립트
└── test/                       # 테스트 파일
```

## 🔧 환경 변수

### 필수 환경 변수

```env
# 서버 설정
PORT=3000
NODE_ENV=local

# 데이터베이스
DATABASE_URL=postgres://postgres:postgres@localhost:5432/nestjs

# JWT 설정
JWT_SECRET_KEY=your-secret-key
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# API 설정
API_PREFIX=api
API_VERSIONING=v1

# 애플리케이션 정보
APP_NAME=NestJS-Sample
APP_VERSION=0.0.1

# 로깅
LOG_DIR=logs

# Swagger
SWAGGER_URI=docs
```

## 📚 API 문서

애플리케이션 실행 후 다음 URL에서 API 문서를 확인할 수 있습니다:

- **Swagger UI**: `http://localhost:3000/docs`
- **Health Check**: `http://localhost:3000/api/health-check`

## 🔐 인증 시스템

### JWT 토큰 구조

```typescript
// Access Token
{
  userId: number,
  type: 'ac',
  key: 'nsp'
}

// Refresh Token
{
  userId: number,
  type: 're',
  key: 'nsp'
}
```

### API 엔드포인트

- `POST /api/auth/join` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 재발급

## 🗄 데이터베이스

### 주요 모델

- **User**: 사용자 정보
- **Post**: 게시물
- **Token**: 리프레시 토큰 관리

### 마이그레이션 명령어

```bash
# 마이그레이션 적용 (환경별)
yarn db:migrate

# Prisma 클라이언트 생성
yarn db:generate

# 데이터베이스 리셋
yarn db:reset
```

## 📝 스크립트

### 개발 스크립트

```bash
# 개발 서버 실행
yarn start:local

# 디버그 모드
yarn start:debug

# 코드 포맷팅
yarn format

# 린팅
yarn lint
```

### 데이터베이스 스크립트

```bash
# 환경별 마이그레이션
yarn db:migrate

# Prisma 클라이언트 생성
yarn db:generate

# 데이터베이스 리셋
yarn db:reset
```

### 환경 설정 스크립트

```bash
# 환경 변수 파일 생성
yarn env:create
```

## 🔍 로깅

### 로그 레벨

- **개발 환경**: `debug`
- **프로덕션 환경**: `info`

### 로그 파일 구조

```
logs/
├── app/           # 애플리케이션 로그
└── error/         # 에러 로그
```

## 🏗 아키텍처

### Structure

- **Controller**: API 엔드포인트
- **Service**: 비즈니스 로직
- **Dto**: 요청, 응답 정보 전달
- **Model**: Prisma 모델 정의

### Design Pattern

- **Factory Pattern**: 모델 생성
- **Repository Pattern**: 데이터 접근
- **Strategy Pattern**: 인증 전략
- **Guard Pattern**: 인증/인가
