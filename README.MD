# 🧪 SauceDemo 자동화 테스트 프로젝트

- 테스트 대상: [https://www.saucedemo.com/](https://www.saucedemo.com/)
- 사용 기술: Jira, Xray, Playwright, GitHub Actions
- 테스트 케이스: [https://docs.google.com/spreadsheets/d/1E8UB69p-Km2rbGIKfofNvAbe_UEX3BcL/edit?usp=sharing&ouid=109584807367731844865&rtpof=true&sd=true](https://docs.google.com/spreadsheets/d/1E8UB69p-Km2rbGIKfofNvAbe_UEX3BcL/edit?usp=sharing&ouid=109584807367731844865&rtpof=true&sd=true)

---

## 📂 프로젝트 개요

Playwright를 기반으로 한 E2E 테스트를 GitHub Actions와 연동하여 자동화 했으며,

테스트 결과를 Xray API를 통해 Jira에 테스트 실행 이슈로 자동 등록하는 CI 파이프라인을 구축했습니다.

---

## 🐞 문제 상황 및 해결 과정

### 1번 문제

GitHub Actions에서 컨버터 파일(convert-to-xray-json.js) 실행 중 run.title을 읽지 못하는 이슈

#### 원인

1. 작성한 컨버터는 JSON 파일을 받아서 처리하지만 Playwright 실행 결과 리포트를 JUnit 형식으로 출력하도록 설정해서

2. run.title 이라는 코드가 결과 리포트 파일에 없어서 컨버터 파일이 읽지 못했음

#### 해결 방법

- playwright.config.ts 파일 reporter 설정을 수정해 json 파일로 저장되도록 수정함
- 결과 리포트 파일을 직접 확인해서 run.title 을 spec.title 로 수정함

### 2번 문제

값이 Promise로 할당 되는 문제

#### 원인

비동기 문제로 아직 값이 처리 되기전에 변수에 할당해 발생하는 문제

#### 해결 방법

await를 추가

## 🚀 마무리

- Selenium 과 다르게 병렬 처리로 테스트를 수행해서 속도가 6배 이상 빨랐음 1분 이상 걸리던 테스트가 Playwright 에서는 19초만에 수행 되었음

- Selenium은 간단한 테스트인데도 타이밍 이슈로 인한 타임 아웃을 방지하기 위해 신경 쓸게 많았는데 Playwright 는 타이밍 이슈 자체가 발생하지 않았음

- 미리 작성해둔 실행에 덮어쓰기가 아니라 템플릿 유지해서 결과만 붙여 새로운 실행을 만드는게 아쉬움
