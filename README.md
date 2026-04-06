# SketchLink — 창작자의 낙서에서 완벽한 레퍼런스로



## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Light%20Bulb.png" width="25"> 프로젝트 개요
AI 기반 창작자 전용 레퍼런스 검색 엔진. 러프 스케치를 업로드하면 구도·포즈를 분석하여 CC0/퍼블릭 도메인 이미지 중 가장 유사한 레퍼런스를 즉시 매칭합니다.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Artist%20Palette.png" width="25"> 컬러 팔레트

| 역할 | 색상 |
|------|------|
| 배경 (Base) | `rgb(251, 247, 238)` — 베이지 크림 |
| 중간색 (Mid) | `rgb(210, 224, 173)` — 연두 |
| 진한색 (Deep) | `rgb(127, 145, 83)` — 올리브 |
| 카드 배경 | `rgb(255, 252, 245)` |
| 푸터 | `#2c2e1e` (다크 올리브) |

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Check%20Mark%20Button.png" width="25"> 완성된 기능

### 랜딩 페이지 섹션
- **Hero** — 스케치 드로잉 캔버스 + 실시간 파티클 배경 + 히어로 배경 동영상 (`videos/hero-sketch.mp4`)
- **Problem** — 창작자 3대 고통 카드 (저작권 위험 / 낮은 매칭 정확도 / 시간 낭비)
- **Solution** — 기존 방식 vs Sketch-Link 시각 비교
- **How It Works** — 3단계 플로우 (업로드 → AI 분석 → 매칭)
- **Features** — MVP / Phase‑2 / Phase‑3 기능 그리드
- **Data Sources** — Unsplash, Pexels, Met Museum, Europeana 등
- **Roadmap** — Phase 1~4 타임라인
- **Compare** — 경쟁사 비교표 (Google / Pinterest / Midjourney / Stable Diffusion)
- **Pricing** — Free / Creator Pro / Studio 플랜
- **Waitlist** — 얼리 액세스 신청 폼 (REST API 저장)

### 인터랙션
- 커스텀 커서 (올리브 닷 + 링)
- 파티클 네트워크 배경 (마우스 반응)
- 히어로 비디오 배경 (세피아 필터 + 팔레트 오버레이)
- 자동 스케치 드로잉 애니메이션
- 스크롤 카운터 애니메이션
- Intersection Observer 기반 fade-in 애니메이션
- 반응형 모바일 네비게이션

---

## 파일 구조

```
index.html          — 메인 랜딩 페이지
css/
  style.css         — 전체 스타일시트 (커스텀 팔레트 테마)
js/
  main.js           — 인터랙션, 파티클, 스케치 애니메이션, 폼 처리
videos/
  hero-sketch.mp4   — 히어로 배경 동영상
README.md
```

---

## REST API 데이터 테이블

| 테이블 | 용도 |
|--------|------|
| `waitlist` | 얼리 액세스 신청자 정보 저장 |

---

## 진입 URI

| 경로 | 설명 |
|------|------|
| `/` | 메인 랜딩 페이지 |
| `/#problem` | 문제 섹션 |
| `/#solution` | 솔루션 섹션 |
| `/#how` | 작동 방식 섹션 |
| `/#features` | 기능 섹션 |
| `/#roadmap` | 로드맵 섹션 |
| `/#compare` | 경쟁 비교 섹션 |
| `/#waitlist` | 얼리 액세스 신청 섹션 |

---

## 미완료 / 향후 개발 과제

- [ ] 실제 AI 스케치 매칭 API 연동 (백엔드 필요)
- [ ] 실제 CC0 DB 검색 기능 구현
- [ ] 사용자 인증 및 마이페이지
- [ ] 레퍼런스 보드 / 무드보드 기능
- [ ] Procreate·Figma 플러그인 개발
- [ ] 모바일 앱 버전

---

## 배포

**Publish 탭**에서 원클릭 배포 가능합니다.

![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)
![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)
![Adobe Photoshop](https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white)
