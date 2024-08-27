<div align=center>
  
# 🙋‍♂면학소 
면학소는 **'학생'** 과 **'강사'** 를 이어주는 **교육 과외 플랫폼** 입니다.

IT, 어학, 취미 카테고리로 강의를 나누어져있으며, 강의는 **👩‍👩‍👦대면강의 or 🧑‍💻화상강의** 중 선택해서 진행될 수 있어요.

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=1000&color=FFFFFF&width=435&lines='면학'과+'장소'를+합쳐+'면학하는+곳'+이라는+뜻이에요)](https://git.io/typing-svg)

</div>


  
## 목차
1. [프로젝트 팀 소개](#프로젝트-팀-소개)
2. [프로젝트 개요](#-프로젝트-개요)
3. [기술 스택](#%EF%B8%8F-기술-스택)
4. [컨벤션](#-컨벤션)
5. [담당 페이지 및 기능](#-담당-페이지-및-기능)
6. [주요 기능 화면 구성 - 웹](#%EF%B8%8F주요-기능-화면-구성---웹)
7. [주요 기능 화면 구성 - 모바일](#주요-기능-화면-구성---모바일)
8. [프로젝트 소감](#프로젝트-소감)
9. [관련 문서](#관련-문서)


<br />
<br />



## 프로젝트 팀 소개
### 뱅쿄시요 (Bankyoshiyo) 

일본어로 '공부하자' 는 뜻의 뱅쿄시요, 일본어에 친숙한 팀원 3명이 모여 짓게 되었습니다. 
| [류채영(팀장)](https://github.com/chaeyoungg) | [김나라](https://github.com/C5D2) | [홍설아](https://github.com/sulahhong) |
|---|---|---|
|<img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/profile.png" width="200" height="200">| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/메타몽.jpg" width="200" height="200" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/KakaoTalk_20240826_163751761.png"  width="200" height="200"/> |

<br />

## 📑 프로젝트 개요
📆 전체 프로젝트 기간 : 2024.07.29 ~ 2024.08.27

- 07.26 ~ 08.01 : 컨셉 기획, 초기 UI 설계 및 프로젝트 세팅
- 08.02 ~ 08.23 : 기능 구현
- 08.24 ~ 08.27 : QA, 배포

<br />

## ⚙️ 기술 스택
<img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge" /><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
### Library
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=blue"><img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"><img src="https://img.shields.io/badge/swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white"><img src="https://img.shields.io/badge/kakao Map-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">
### Tools
<img src="https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white" /><img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" /><img src="https://img.shields.io/badge/MongoDBCompass-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /><img src="https://img.shields.io/badge/Bruno-F4AA41?style=for-the-badge&logo=Bruno&logoColor=white"> <img src="https://img.shields.io/badge/chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white">
### Settings
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"><img src="https://img.shields.io/badge/Prettier-20B2AA?style=for-the-badge&logo=Prettier&logoColor=white">

<br />

---

<br />


## 📢 컨벤션
### Git

```JavaScript
Feat : 새로운 기능을 추가한 경우
Fix : 버그를 고친 경우
Design : 사용자 UI 디자인
Style : 코드 포맷 변경, 세미 콜론 누락 등 코드 수정이 없는 경우
Comment : 주석 추가 및 변경
Docs: 문서를 수정한 경우
Chore : 패키지 매니저 설정
Refactor : 코드 리팩토링
Rename : 파일, 폴더명을 수정하거나 옮기는 작업만 수행한 경우
Remove : 파일을 삭제하는 작업만 수행하는 경우

✔️ 팀원들 확인 받고 커밋, 푸쉬 진행
✔️ 본인이 PR 요청한 건 본인이 merge
✔️ PR 시 코드리뷰 진행
✔️ 최대한 작업 겹치지 않게…!!! → 겹치면 로컬vsc에서 머지하는 것으로
```

### Code
```JavaScript
- 리액트 컴포넌트는 `파스칼 케이스`
    
    →  const Form =()⇒ {}
    
- 리액트 컴포넌트는 `일반함수`, 그외 함수는 `화살표 함수`
- 일반 함수나 표현식 함수는 `카멜 케이스`
    
    → function getBoardList () {}, const postBoard = () ⇒ {} 
    
- 이벤트 핸들러 함수 같은 경우  `카멜 케이스` 기반
    
    `handle로 시작하며 명사와 동사(이벤트 이름)`로 적음
    
    → const handleFormSubmit = () ⇒ {}
    
- 변수의 경우 `카멜 케이스`
- 커스텀 훅을 만들 시 `use~`로 시작하며 `카멜 케이스`
- 폴더명은 `카멜 케이스`로 하되, 컴포넌트 폴더는 `파스칼 케이스`
- 함수의 경우 동사로 시작하며, 반대되는 함수를 만들 경우

      `반의어`를 확인하고 함수 네이밍을 작성

- 변수와 함수는 직관적으로 작성. 네이밍을 보고 어떤 역할인지 파악이 되어야 함
- 코드가 실행되기 전부터 값을 알고 있는(하드코딩한) 상수는 대문자 상수로 작성
→ const URL, const BASE_URL
- 약어 지양
- Typescript 인터페이스 사용 시 `‘I 접두어 붙이기’`
- 모든 타입 정의 시 `파스칼케이스`
```

<br />
<br />



## 🍕 담당 페이지 및 기능

- 류채영
  - 메인페이지
  - 헤더, 푸터, 페이지네이션
  - 카테고리별 상품 목록, 상품 정렬
  - 구매, 판매 목록, 수강 후기
  - 1:1 질의응답
  - (강사, 학생) 대시보드
 
- 김나라
  - (결제 전, 결제 후) 상품 상세 조회
  - 강의 결제 기능
  - 강의 등록, 수정, 삭제 (Kakao API)
  - (상품, 강사) 북마크, 북마크 목록
  - 북마크 강사의 신규 강의 알림 (Socket IO)
 
    
- 홍설아
  - 로그인, 구글, 카카오 SNS 로그인 (Oauth)
  - 회원가입, 이메일 중복 체크
  - 회원 정보 수정
  - 상품 검색
  - 전역 모달

<br />
<br />


## 🖥️주요 기능 화면 구성 - 웹
### 1. 회원가입 및 로그인 (SNS 로그인)
|회원가입|로그인|로그아웃|
|---|---|---|
|<img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%9D%BC%EB%B0%98%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif" width="400" />| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%9D%BC%EB%B0%98%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif"  width="400"/>| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83.gif" width="400"/>

|카카오 로그인|구글 로그인|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif"  width="400" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EA%B5%AC%EA%B8%80%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif"  width="400"/>|

### 2. 메인페이지, 상품 목록
|메인페이지|상품 목록|상품정렬, 상품검색|
|---|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.gif" width="400" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%83%81%ED%92%88%EB%AA%A9%EB%A1%9D.gif" width="400" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%83%81%ED%92%88%EC%A0%95%EB%A0%AC%2C%EA%B2%80%EC%83%89.gif" width="400" /> |

### 3. 강의 상세페이지
|상세페이지|수강하기|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%83%81%ED%92%88%EC%83%81%EC%84%B8.gif"  width="400"/> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%88%98%EA%B0%95%EC%8B%A0%EC%B2%AD(%EA%B2%B0%EC%A0%9C).gif" width="400" /> |

### 4. (강사) 강의등록, 강의관리
|강의등록|강의수정|강의삭제|
|---|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%83%81%ED%92%88%EB%93%B1%EB%A1%9D.gif" width="400" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EA%B0%95%EC%9D%98%20%EC%88%98%EC%A0%95.gif" width="400" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EA%B0%95%EC%9D%98%20%EC%82%AD%EC%A0%9C.gif" width="400" /> |

### 5. 북마크
|강의, 강사 북마크|북마크 목록|
|---|---|
|  <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%B6%81%EB%A7%88%ED%81%AC.gif" width="400" />  |   <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%B6%81%EB%A7%88%ED%81%AC%EB%AA%A9%EB%A1%9D.gif" width="400" /> |

### 6. 판매목록, 구매목록, 후기
|(강사)구매목록|(학생)구매목록, 후기 작성|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EC%83%81%ED%92%88%20%ED%9B%84%EA%B8%B0.gif" width="400" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%ED%8C%90%EB%A7%A4%EB%82%B4%EC%97%AD.gif" width="400" /> |

### 7. 1:1 질의응답
|(학생)1:1 질의응답 작성|(강사)문의 응답|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AC%B8%EC%9D%98%ED%95%98%EA%B8%B0.gif" width="400" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AC%B8%EC%9D%98%EB%8B%B5%EB%B3%80%EC%99%84%EB%A3%8C.gif" width="400" /> |

### 8. (강사, 회원) 대시보드
|(강사)대시보드|(회원)대시보드|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EA%B0%95%EC%82%AC%20%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C.gif" width="400" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%ED%95%99%EC%83%9D%20%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C.gif" width="400" /> |

<br />
<br />

## 📱주요 기능 화면 구성 - 모바일
### 1. 회원가입 및 로그인 (SNS 로그인)
|회원가입|로그인|
|---|---|
|<img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif" width="280" />| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif"  width="280"/>|

### 2. 메인페이지, 상품 목록
|메인페이지|상품 목록, 상품정렬|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%A9%94%EC%9D%B8.gif" width="280" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%AA%A9%EB%A1%9D.gif" width="280" /> |

### 3. 강의 상세페이지
|상세페이지|수강하기|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EC%83%81%EC%84%B8.gif"  width="280"/> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EA%B2%B0%EC%A0%9C.gif" width="280" /> |

### 4. (강사) 강의등록, 강의관리
|강의등록|강의수정|강의삭제|
|---|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EA%B0%95%EC%9D%98%EB%93%B1%EB%A1%9D.gif" width="280" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EA%B0%95%EC%9D%98%EC%88%98%EC%A0%95.gif" width="280" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%20%EA%B0%95%EC%9D%98%20%EC%82%AD%EC%A0%9C.gif" width="280" /> |

### 5. 북마크
|강의, 강사 북마크|북마크 목록|
|---|---|
|  <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%B6%81%EB%A7%88%ED%81%AC.gif" width="280" />  |   <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%B6%81%EB%A7%88%ED%81%AC%EB%AA%A9%EB%A1%9D.gif" width="280" /> |

### 6. 판매목록, 구매목록, 후기
|(강사)판매목록|(학생)구매목록, 후기 작성|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%ED%8C%90%EB%A7%A4%EB%AA%A9%EB%A1%9D.gif" width="280" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%20%ED%9B%84%EA%B8%B0.gif" width="280" /> |

### 7. 알림 기능
|북마크한 강사의 신규 강의 알림|
|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%20%EC%95%8C%EB%A6%BC.gif" width="300" /> |

### 8. 1:1 질의응답
|(학생)1:1 질의응답 작성|(강사)문의 응답|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EC%A7%88%EC%9D%98%EC%9D%91%EB%8B%B5%EC%9E%91%EC%84%B1.gif" width="280" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EC%A7%88%EC%9D%98%EC%9D%91%EB%8B%B5%EB%8B%B5%EB%B3%80.gif" width="280" /> |

### 9. (강사, 회원) 대시보드
|(강사)대시보드|(회원)대시보드|
|---|---|
| <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%EA%B0%95%EC%82%AC%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C.gif" width="280" /> | <img src="https://github.com/chaeyoungg/Myeonhakso/blob/dev/public/readme/%EB%AA%A8%EB%B0%94%EC%9D%BC%ED%95%99%EC%83%9D%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C.gif" width="280" /> |

<br />
<br />

## 😻프로젝트 소감
🐁 류채영
``` html
SSR과 CSR을 모두 경험해볼 수 있는 뜻깊은 프로젝트였습니다! 밤낮없이 기능 개발하고 회의하면서
초보 팀장이었던 저를 믿고 프로젝트에 열정적으로 임해주신 뱅쿄시요 팀원들에게 너무 감사합니다! ♥ :D
앞으로 더 많이 성장한 모습으로 또 만나요!
```

🇰🇷 김나라
``` html
교육 도메인은 예전부터 하고 싶었었는데 이번에 할 수 있게 되어서 감개무량합니다.
거기에 마음 맞는 팀원들과 함께 할 수 있어 더욱 뜻 깊었던 프로젝트라고 생각합니다.
이번 프로젝트에서는 평소에 도전하고 싶었던 기능을 경험할 수 있어서 좋았습니다. 
이 자리를 빌려 난관에 빠질 때마다 많은 도움을 주었던 저희 팀원들(객원 팀원인 길용쌤 포함!!)께 감사의 인사를 전합니다.
```

❄️홍설아
``` html
blah blah
```


<br />
<br />

## 📁관련 문서
[유저플로우, 화면 정의서](https://www.figma.com/design/uB7RPFGDbdejMkgmQGD8SG/MyeonHakSo?node-id=0-1&t=tcdw3SmsRPJIg7G4-1)

[API 문서](https://api.fesp.shop/apidocs/)
