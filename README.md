# NestJS Sample

## 실행 환경

```
Node       v22.16.0
Nest       v11.0.7
Prisma     v6.12.0
PostgreSQL v15.4
```

## 설치

```bash
# 패키지 설치
$ yarn install

# 환경 변수 생성
$ yarn env:create

# Prisma 마이그레이션
$ yarn db:migrate
```

## 프로젝트 실행

```bash
# environment: local, dev, prod
$ yarn start:${environment}
```

## 주요 기능

```
• 회원가입, 로그인, 토큰 재발급, 회원 CRUD, 게시글 CRUD
• 토큰 인증
  ‣ 인증 프로세스
    ⁃ 가드에서 토큰 페이로드를 검사 후 컨트롤러로 요청 정보 전달
    ⁃ 토큰 만료 또는 페이로드 검증 실패 시 예외 처리
```
