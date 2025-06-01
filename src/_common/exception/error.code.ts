type UnauthorizedType = 'GENERAL' | 'INVALID_ACCESS_TOKEN' | 'PASSWORD_NOT_MATCHED'
type ForbiddenType = 'GENERAL'
type NotFoundType = 'GENERAL' | 'USER_NOT_FOUND'
type BadRequestType = 'GENERAL' | 'MISSING_ACCESS_TOKEN'
type InternalServerErrorType = 'GENERAL'

export interface IErrorCodes {
    errorCode: string
    status: number
    message: string
}

export const NOT_FOUND: {
    [key in NotFoundType]: IErrorCodes
} = {
    GENERAL: {
        status: 404,
        errorCode: 'NOT_FOUND_001',
        message: '요청 정보를 찾을 수 없습니다.'
    },
    USER_NOT_FOUND: {
        status: 404,
        errorCode: 'NOT_FOUND_002',
        message: '회원 정보를 찾을 수 없습니다.'
    }
}

export const UNAUTHORIZED: {
    [key in UnauthorizedType]: IErrorCodes
} = {
    GENERAL: {
        status: 401,
        errorCode: 'UNAUTHORIZED_001',
        message: '권한이 없습니다.'
    },
    INVALID_ACCESS_TOKEN: {
        status: 401,
        errorCode: 'UNAUTHORIZED_002',
        message: '유효하지 않은 인증 토큰입니다.'
    },
    PASSWORD_NOT_MATCHED: {
        status: 401,
        errorCode: 'UNAUTHORIZED_003',
        message: '비밀번호가 일치하지 않습니다.'
    }
}

export const FORBIDDEN: {
    [key in ForbiddenType]: IErrorCodes
} = {
    GENERAL: {
        status: 403,
        errorCode: 'FORBIDDEN_001',
        message: '요청 리소스에 접근 권한이 없습니다.'
    }
}

export const BAD_REQUEST: {
    [key in BadRequestType]: IErrorCodes
} = {
    GENERAL: {
        status: 400,
        errorCode: 'BAD_REQUEST_001',
        message: '잘못된 요청 입니다.'
    },
    MISSING_ACCESS_TOKEN: {
        status: 400,
        errorCode: 'BAD_REQUEST_002',
        message: '인증 토큰을 찾을 수 없습니다.'
    }
}

export const SERVER_ERROR: {
    [key in InternalServerErrorType]: IErrorCodes
} = {
    GENERAL: {
        status: 500,
        errorCode: 'SERVER_ERROR_001',
        message: '요청을 처리하던 중 오류가 발생 하였습니다'
    }
}
