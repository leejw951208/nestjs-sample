type UnauthorizedType = 'GENERAL' | 'INVALID_ACCESS_TOKEN' | 'PASSWORD_NOT_MATCHED';
type ForbiddenType = 'GENERAL';
type NotFoundType = 'GENERAL';
type BadRequestType = 'GENERAL' | 'MISSING_ACCESS_TOKEN';
type InternalServerErrorType = 'GENERAL';

export interface IErrorCodes {
    errorCode: string;
    statusCode: number;
    message: string;
}

export const NOT_FOUND: {
    [key in NotFoundType]: IErrorCodes;
} = {
    GENERAL: {
        errorCode: 'NOT_FOUND_001',
        statusCode: 404,
        message: '요청 리소스를 찾을 수 없습니다.'
    }
};

export const UNAUTHORIZED: {
    [key in UnauthorizedType]: IErrorCodes;
} = {
    GENERAL: {
        errorCode: 'UNAUTHORIZED_001',
        statusCode: 401,
        message: '권한이 없습니다.'
    },
    INVALID_ACCESS_TOKEN: {
        errorCode: 'UNAUTHORIZED_002',
        statusCode: 401,
        message: '유효하지 않은 인증 토큰입니다.'
    },
    PASSWORD_NOT_MATCHED: {
        errorCode: 'UNAUTHORIZED_003',
        statusCode: 401,
        message: '비밀번호가 일치하지 않습니다.'
    }
};

export const FORBIDDEN: {
    [key in ForbiddenType]: IErrorCodes;
} = {
    GENERAL: {
        errorCode: 'FORBIDDEN_001',
        statusCode: 403,
        message: '요청 리소스에 접근 권한이 없습니다.'
    }
};

export const BAD_REQUEST: {
    [key in BadRequestType]: IErrorCodes;
} = {
    GENERAL: {
        errorCode: 'BAD_REQUEST_001',
        statusCode: 400,
        message: '잘못된 요청 입니다.'
    },
    MISSING_ACCESS_TOKEN: {
        errorCode: 'BAD_REQUEST_002',
        statusCode: 400,
        message: '인증 토큰을 찾을 수 없습니다.'
    }
};

export const INTERNAL_SERVER_ERROR: {
    [key in InternalServerErrorType]: IErrorCodes;
} = {
    GENERAL: {
        errorCode: 'INTERNAL_SERVER_ERROR_001',
        statusCode: 500,
        message: '요청을 처리하던 중 오류가 발생 하였습니다'
    }
};

// Prisma 관련 에러 타입 정의
type PrismaErrorType =
    | 'P2002' // Unique constraint failed
    | 'P2003' // Foreign key constraint failed
    | 'P2025' // Record not found
    | 'P2014' // Relation constraint failed
    | 'P2001' // Record not found
    | 'P2015' // Related record not found
    | 'P2016' // Query error
    | 'P2017' // Relation connection failed
    | 'P2021' // Table does not exist
    | 'P2022' // Column does not exist
    | 'P2024' // Database connection timeout
    | 'P2028' // Transaction conflict
    | 'GENERAL';

export const PRISMA: { [key in PrismaErrorType]: IErrorCodes } = {
    P2002: {
        errorCode: 'PRISMA_P2002',
        statusCode: 400,
        message: '중복된 데이터가 존재합니다.'
    },
    P2003: {
        errorCode: 'PRISMA_P2003',
        statusCode: 400,
        message: '참조 무결성 제약 조건을 위반했습니다.'
    },
    P2025: {
        errorCode: 'PRISMA_P2025',
        statusCode: 404,
        message: '요청한 레코드를 찾을 수 없습니다.'
    },
    P2014: {
        errorCode: 'PRISMA_P2014',
        statusCode: 400,
        message: '관계 제약 조건을 위반했습니다.'
    },
    P2001: {
        errorCode: 'PRISMA_P2001',
        statusCode: 404,
        message: '레코드를 찾을 수 없습니다.'
    },
    P2015: {
        errorCode: 'PRISMA_P2015',
        statusCode: 404,
        message: '관련된 레코드가 존재하지 않습니다.'
    },
    P2016: {
        errorCode: 'PRISMA_P2016',
        statusCode: 400,
        message: '쿼리 실행 중 오류가 발생했습니다.'
    },
    P2017: {
        errorCode: 'PRISMA_P2017',
        statusCode: 400,
        message: '관계 연결에 실패했습니다.'
    },
    P2021: {
        errorCode: 'PRISMA_P2021',
        statusCode: 400,
        message: '테이블이 존재하지 않습니다.'
    },
    P2022: {
        errorCode: 'PRISMA_P2022',
        statusCode: 400,
        message: '컬럼이 존재하지 않습니다.'
    },
    P2024: {
        errorCode: 'PRISMA_P2024',
        statusCode: 408,
        message: '데이터베이스 연결 시간이 초과되었습니다.'
    },
    P2028: {
        errorCode: 'PRISMA_P2028',
        statusCode: 409,
        message: '트랜잭션 충돌이 발생했습니다.'
    },
    GENERAL: {
        errorCode: 'PRISMA_GENERAL',
        statusCode: 500,
        message: 'Prisma 처리 중 오류가 발생했습니다.'
    }
};
