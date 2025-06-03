// Playwright 리포트 json 을 xray의 json에 맞는 형태로 변환해주는 컨버터
const fs = require('fs');

const raw = fs.readFileSync('playwright-report.json', 'utf-8');
const report = JSON.parse(raw);

const results = [];

for (const suite of report.suites) {
  for (const spec of suite.specs) {
    const title = spec.title || '';
    // title에서 이슈 키 (예: ST-6) 추출
    const match = title.match(/([A-Z]+-\d+)/);
    if (!match) continue; // 이슈키 없으면 건너뛰기

    const testKey = match[1];

    // spec.tests 안에 여러 테스트 결과 있을 수 있으니 모두 처리
    for (const test of spec.tests) {
      const status = test.results[0]?.status === 'passed' ? 'PASSED' : 'FAILED';

      results.push({
        testKey,
        status,
      });
    }
  }
}

fs.writeFileSync('xray-result.json', JSON.stringify({ tests: results }, null, 2));
console.log('✅ xray-result.json 파일 생성 완료');
