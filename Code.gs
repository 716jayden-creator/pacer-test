/**
 * 순장유형테스트 — 결과 저장 서버 (Google Apps Script)
 * 구글 시트의 [확장 프로그램 → Apps Script]에 이 코드를 통째로 붙여 넣으세요.
 *
 * - doPost: 참여자 결과 1건 저장
 * - doGet : 유형별 인원수 반환 (같은 휴대폰에서 다시 하면 마지막 결과만 셉니다)
 */
const SHEET_NAME = '결과';
const TYPE_NAMES = { C: '코치형', R: '러닝메이트형', H: '치어리더형', N: '내비게이터형' };

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['시간', '참여자ID', '유형코드', '유형', '코치', '러닝메이트', '치어리더', '내비게이터']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const t = String(d.type);
    if (!TYPE_NAMES[t]) return json_({ ok: false, error: 'bad type' });
    const id = String(d.id || '').slice(0, 64);
    const s = d.scores || {};
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet_().appendRow([new Date(), id, t, TYPE_NAMES[t],
        Number(s.C) || 0, Number(s.R) || 0, Number(s.H) || 0, Number(s.N) || 0]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  const rows = getSheet_().getDataRange().getValues().slice(1);
  const latest = {};
  rows.forEach(function (r, i) {
    const key = r[1] || ('row' + i);
    latest[key] = r[2];
  });
  const counts = { C: 0, R: 0, H: 0, N: 0 };
  Object.keys(latest).forEach(function (k) {
    if (counts[latest[k]] !== undefined) counts[latest[k]]++;
  });
  const total = counts.C + counts.R + counts.H + counts.N;
  return json_({ counts: counts, total: total, updated: new Date().toISOString() });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
