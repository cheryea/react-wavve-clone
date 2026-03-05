# 🎬 Wavve Clone (React OTT Project)

TMDB API를 활용하여 영화와 TV 콘텐츠를 탐색하고  
관심 콘텐츠를 저장할 수 있는 **React 기반 OTT 서비스 클론 프로젝트**입니다.

**모바일 / 태블릿 / 데스크탑 환경을 고려한 반응형 UI**로 구현하여  
다양한 디바이스에서 자연스럽게 콘텐츠를 탐색할 수 있도록 설계했습니다.

단순한 UI 구현을 넘어  
**API 데이터 흐름 이해**, **상태 관리 설계**, **컴포넌트 구조 설계**를 목표로  
1인 개발로 진행했습니다.

---

## 🔗 Live Demo

📱 **Responsive Web (Mobile / Tablet / Desktop)**  

반응형으로 구현된 실제 서비스 화면을 확인할 수 있습니다.  

👉 https://cheryea.github.io/react-wavve-clone

---

## 🎯 Project Overview

- **Type**: Personal Project (1인 개발)
- **Frontend**
  - React
  - React Router
  - Axios
  - Swiper
- **API**
  - TMDB Open API
- **Deployment**
  - GitHub Pages
- **UI**
  - Responsive Web (모바일 / 태블릿 / 데스크탑 대응)

---

## 💡 Key Features

### 🎬 TMDB API 연동
- 현재 상영작, 인기 영화, 평점 높은 영화, 개봉 예정작 등 카테고리별 데이터 조회
- `axios.all`과 `axios.spread`를 활용한 **다중 API 요청 처리**

### 🎞 OTT 스타일 콘텐츠 UI
- **Swiper 라이브러리**를 활용한 콘텐츠 슬라이드 UI
- OTT 서비스와 유사한 **콘텐츠 탐색 경험 구현**

### 📱 반응형 UI 구현
- 모바일 / 태블릿 / 데스크탑 환경 대응
- Swiper **breakpoints** 설정을 통한 화면 크기별 슬라이드 조정
- 다양한 디바이스에서 자연스러운 콘텐츠 탐색 경험 제공

### ⭐ My List 기능
- 영화 / TV 콘텐츠 즐겨찾기 추가 및 제거
- 여러 페이지에서 동일한 관심 목록 데이터 공유

### 🧭 라우팅 기반 페이지 구조
- Main / TV / Search / Detail / My List 페이지 구성
- URL 파라미터를 활용한 상세 페이지 데이터 조회

---

## 🚀 Problem Solving

### 문제

관심 목록 기능 구현 과정에서  
여러 페이지(Main, Detail, MyList)에서 동일한 상태를 공유해야 했습니다.

**상태를 어디에서 관리해야 하는지 결정하는 것이 가장 어려웠습니다.**

---

### 해결

관심 목록 데이터를 전역처럼 사용해야 한다는 점을 고려하여  

상태(`favlist`)와 관련 로직을  
**커스텀 훅 `useFavListData`로 분리**하고  

App 컴포넌트에서 상태를 관리하도록 설계했습니다.

이를 통해  
- 상태 관리 책임을 명확하게 분리하고
- props를 통해 필요한 컴포넌트에 데이터 전달 구조를 만들었습니다.

---

### 결과

- 상태 관리 책임을 한 곳으로 집중
- 데이터 흐름 구조에 대한 이해 향상
- 로직 재사용성과 유지보수성 개선

---

## 📎 Summary

- TMDB API를 활용한 **실전형 React 프로젝트**
- OTT 스타일 **콘텐츠 탐색 UI 구현**
- **Responsive Web** 기반 다양한 디바이스 대응
- 커스텀 훅을 활용한 **상태 관리 구조 설계 경험**
- API → UI → 상태 공유까지 **프론트엔드 전체 흐름 경험**
