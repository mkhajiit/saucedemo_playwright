const fs = require('fs');

// 1. Playwright 테스트 결과 읽기
const raw = fs.readFileSync('playwright-report.json', 'utf-8');
const report = JSON.parse(raw);

const results = [];

for (const suite of report.suites) {
  for (const test of suite.specs) {
    for (const run of test.tests) {
      const title = Array.isArray(run.title) ? run.title.join(' ') : run.title; // 배열 아닌 경우도 대비
      const status = run.results[0]?.status === 'passed' ? 'PASSED' : 'FAILED';

      // 2. 테스트 이름에서 이슈 키 찾기 (예: CALC-101)
      const match = title.match(/([A-Z]+-\d+)/);
      if (match) {
        results.push({
          testKey: match[1],
          status,
        });
      }
    }
  }
}

// 3. Xray용 JSON 저장
fs.writeFileSync('xray-result.json', JSON.stringify({ tests: results }, null, 2));

console.log('✅ xray-result.json 파일 생성 완료');
