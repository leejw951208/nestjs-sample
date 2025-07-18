#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

// 환경 변수 키와 기본값 목록
const envConfig = [
    { key: 'PORT', value: '3000' },
    { key: 'DATABASE_URL', value: 'postgres://postgres:postgres@localhost:5432/database' },
    { key: 'API_PREFIX', value: 'api' },
    { key: 'API_VERSIONING', value: 'v1' },
    { key: 'JWT_SECRET_KEY', value: '' },
    { key: 'JWT_ACCESS_KEY', value: '' },
    { key: 'JWT_ACCESS_EXPIRES_IN', value: '1h' },
    { key: 'JWT_REFRESH_EXPIRES_IN', value: '7d' },
    { key: 'APP_NAME', value: 'NestJS-Sample' },
    { key: 'APP_VERSION', value: '0.0.1' },
    { key: 'LOG_DIR', value: 'logs' },
    { key: 'SWAGGER_URI', value: 'docs' }
]

function createEnvFile() {
    const envPath = path.resolve(process.cwd(), '.env')

    // .env 파일이 이미 존재하는지 확인
    if (fs.existsSync(envPath)) {
        console.log('⚠️  .env 파일이 이미 존재합니다.')
        return
    }

    // 환경 변수 키와 기본값이 포함된 .env 파일 생성
    const envContent = envConfig.map((config) => `${config.key}=${config.value}`).join('\n')

    try {
        fs.writeFileSync(envPath, envContent)
        console.log('✅ .env 파일이 성공적으로 생성되었습니다.')
        console.log('📝 다음 환경 변수들이 추가되었습니다:')
        envConfig.forEach((config) => console.log(`   - ${config.key}=${config.value}`))
        console.log('\n💡 필요에 따라 값을 수정해주세요.')
    } catch (error) {
        console.error('❌ .env 파일 생성 중 오류가 발생했습니다:', error.message)
        process.exit(1)
    }
}

// 스크립트 실행
createEnvFile()
