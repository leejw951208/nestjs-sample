export interface IErrorCodes {
  errorCode: string;
  statusCode: number;
  message: string;
}

export const NOT_FOUND: {
  [key: string]: IErrorCodes;
} = {
  GENERAL: {
    errorCode: 'NOT_FOUND_001',
    statusCode: 404,
    message: '요청 리소스를 찾을 수 없습니다.',
  },
};

export const UNAUTHORIZED: {
  [key: string]: IErrorCodes;
} = {
  GENERAL: {
    errorCode: 'UNAUTHORIZED_001',
    statusCode: 401,
    message: '권한이 없습니다.',
  },
  INVALID_ACCESS_TOKEN: {
    errorCode: 'UNAUTHORIZED_002',
    statusCode: 401,
    message: '유효하지 않은 인증 토큰입니다.',
  },
  PASSWORD_NOT_MATCHED: {
    errorCode: 'UNAUTHORIZED_003',
    statusCode: 401,
    message: '비밀번호가 일치하지 않습니다.',
  },
};

export const FORBIDDEN: {
  [key: string]: IErrorCodes;
} = {
  GENERAL: {
    errorCode: 'FORBIDDEN_001',
    statusCode: 403,
    message: '요청 리소스에 접근 권한이 없습니다.',
  },
};

export const BAD_REQUEST: {
  [key: string]: IErrorCodes;
} = {
  GENERAL: {
    errorCode: 'BAD_REQUEST_001',
    statusCode: 400,
    message: '잘못된 요청 입니다.',
  },
  MISSING_ACCESS_TOKEN: {
    errorCode: 'BAD_REQUEST_002',
    statusCode: 400,
    message: '인증 토큰을 찾을 수 없습니다.',
  },
};

export const INTERNAL_SERVER_ERROR: {
  [key: string]: IErrorCodes;
} = {
  GENERAL: {
    errorCode: 'INTERNAL_SERVER_ERROR_001',
    statusCode: 500,
    message: '요청을 처리하던 중 오류가 발생 하였습니다',
  },
};
