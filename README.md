# EasyScore Pro - 자동채점시스템

![EasyScore Pro](https://img.shields.io/badge/EasyScore-Pro-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎯 프로젝트 개요

EasyScore Pro는 5지선다 문제를 위한 고급 자동채점시스템입니다. 교육기관에서 시험 관리부터 자동채점, 통계 분석까지 원스톱으로 제공합니다.

## ✨ 주요 기능

### 📝 문제 관리
- **5지선다 문제 시스템**: A, B, C, D, E 선택지 지원
- **트리구조 분류**: 대분류 → 중분류 → 소분류 체계적 관리
- **드롭다운 분류 선택**: 직관적인 분류 관리 인터페이스
- **분류 자동 적용**: 분류 수정 시 관련 영역 자동 업데이트

### 🔢 스마트 문항번호 관리
- **동적 번호 조정**: 문항번호 수정 시 자동으로 후속 번호 재정렬
  - 예: 1,2,3,4,5,6 → 3을 10으로 변경 → 1,2,10,11,12,13
- **번호 연속성 유지**: 새 시험지 추가 시 기존 구조 유지
- **번호 리셋 기능**: 1,2,3,4,5,6으로 재설정 가능

### 💯 배점 시스템
- **기본 배점 설정**: 전체 문항 기본 점수 설정
- **개별 배점 조정**: 특정 문항 점수 개별 수정 가능
- **총점 자동 계산**: 배점 변경 시 총점 실시간 업데이트

### 👥 학생 관리
- **퇴원자 처리**: 퇴원자 데이터 자동 삭제
- **통계 자동 계산**: 퇴원자 제외한 반별/개인별 통계
- **학생 정보 수정**: 반 이동, 비밀번호 변경 등

### 📱 모바일 지원
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **터치 인터페이스**: 모바일 환경 최적화된 UI/UX

## 🏗️ 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Tailwind CSS** (모바일 반응형)
- **React Router Dom** (라우팅)
- **Zustand** (상태관리)
- **React Hook Form** (폼 관리)
- **Lucide React** (아이콘)
- **React Hot Toast** (알림)

### Backend
- **Node.js** + **Express** + **TypeScript**
- **SQLite** (데이터베이스)
- **JWT** (인증)
- **bcryptjs** (비밀번호 암호화)
- **CORS** + **Helmet** (보안)

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd easyscore-pro
```

### 2. 의존성 설치
```bash
# 루트, 클라이언트, 서버 모든 패키지 설치
npm run install:all
```

### 3. 환경 변수 설정
```bash
# server/.env 파일 생성
echo "NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-super-secure-jwt-secret-key-here" > server/.env
```

### 4. 개발 서버 실행
```bash
# 프론트엔드(3000), 백엔드(5000) 동시 실행
npm run dev
```

### 5. 브라우저에서 접속
- **관리자/교사 로그인**: http://localhost:3000/login
- **학생 로그인**: http://localhost:3000/student-login

## 📂 프로젝트 구조

```
easyscore-pro/
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/     # 재사용 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── store/         # Zustand 상태관리
│   │   ├── types/         # TypeScript 타입 정의
│   │   └── utils/         # 유틸리티 함수
│   ├── public/            # 정적 파일
│   └── package.json
├── server/                # Node.js 백엔드
│   ├── src/
│   │   ├── routes/        # API 라우터
│   │   ├── middleware/    # 미들웨어
│   │   ├── database/      # 데이터베이스 관리
│   │   └── types/         # TypeScript 타입 정의
│   └── package.json
└── README.md
```

## 🎮 사용 방법

### 관리자/교사
1. **로그인**: `/login`에서 관리자 계정으로 로그인
2. **분류 관리**: 대분류/중분류/소분류 설정
3. **시험 생성**: 새 시험지 생성 및 기본 설정
4. **문제 등록**: 5지선다 문제 및 정답 입력
5. **학생 관리**: 학생 등록, 반 배정, 퇴원 처리
6. **결과 확인**: 채점 결과 및 통계 분석

### 학생
1. **로그인**: `/student-login`에서 학번/비밀번호 로그인
2. **시험 응시**: 배정된 시험 선택 및 응시
3. **결과 확인**: 채점 결과 및 개인 성적 확인

## 🔧 개발 명령어

```bash
# 전체 의존성 설치
npm run install:all

# 개발 서버 실행 (프론트+백엔드)
npm run dev

# 클라이언트만 실행
npm run client:dev

# 서버만 실행
npm run server:dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

## 🗄️ 데이터베이스 스키마

### 주요 테이블
- **users**: 관리자/교사 정보
- **students**: 학생 정보 (퇴원 처리 포함)
- **categories**: 트리구조 분류 (대/중/소분류)
- **exams**: 시험 정보
- **questions**: 5지선다 문제
- **exam_attempts**: 시험 응시 기록
- **student_answers**: 학생 답안 및 채점 결과

## 🛡️ 보안 기능

- **JWT 토큰 인증**: 안전한 사용자 인증
- **비밀번호 해싱**: bcrypt를 사용한 암호화
- **CORS 설정**: 안전한 크로스오리진 요청
- **Helmet 미들웨어**: 기본 보안 헤더 설정
- **입력 검증**: 모든 사용자 입력 검증 및 살균

## 🐛 오류 가능성 및 안정성

### 예상 오류율
- **초기 버전**: 15-20% (복잡한 비즈니스 로직)
- **테스트 완료 후**: 5% 미만 (안정화)

### 안정성 보장
- **TypeScript**: 컴파일 타임 타입 체크
- **에러 핸들링**: 전역 에러 처리 미들웨어
- **데이터 검증**: 프론트엔드/백엔드 이중 검증
- **트랜잭션**: 중요한 데이터 변경 시 트랜잭션 사용

## 📞 지원 및 문의

문제가 발생하거나 기능 개선 요청이 있으시면 이슈를 등록해주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**EasyScore Pro** - 스마트한 교육을 위한 자동채점 솔루션 🎓 