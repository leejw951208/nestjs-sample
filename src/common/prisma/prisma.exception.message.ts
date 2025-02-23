import { PrismaClient } from '@prisma/client';

export const PrismaErrorMessage = {
    P2002: '중복된 데이터가 존재합니다.',
    P2003: '참조 무결성 제약 조건을 위반했습니다.',
    P2025: '요청한 레코드를 찾을 수 없습니다.',
    P2014: '관계 제약 조건을 위반했습니다.',
    P2001: '레코드를 찾을 수 없습니다.',
    P2015: '관련된 레코드가 존재하지 않습니다.',
    P2016: '쿼리 실행 중 오류가 발생했습니다.',
    P2017: '관계 연결에 실패했습니다.',
    P2021: '테이블이 존재하지 않습니다.',
    P2022: '컬럼이 존재하지 않습니다.',
    P2024: '데이터베이스 연결 시간이 초과되었습니다.',
    P2028: '트랜잭션 충돌이 발생했습니다.'
} as const;

export type PrismaErrorCode = keyof typeof PrismaErrorMessage;
