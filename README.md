# 순장유형테스트 (20th 순장사관학교 · THE PACER RUN)

- `index.html` — 참여자용 테스트 (QR로 접속)
- `master.html` — 강의자용 마스터 화면 (유형별 인원수, 5초마다 자동 새로고침)
- `config.js` — 서버 주소를 넣는 곳
- `img/` — 결과 카드 이미지
- `apps-script/Code.gs` — 결과 저장 서버 (구글 Apps Script에 붙여 넣을 코드, 깃허브에는 올려도 되고 안 올려도 됨)

---

## 1단계. 결과 저장 서버 만들기 (구글 시트 + Apps Script)

1. [sheets.new](https://sheets.new) 에서 새 구글 시트를 만들고 이름을 `순장유형테스트 결과`로 바꿉니다.
2. 메뉴 **확장 프로그램 → Apps Script**를 누릅니다.
3. 열린 편집기에 있는 코드를 모두 지우고, `apps-script/Code.gs` 내용을 통째로 붙여 넣은 뒤 **저장(💾)**합니다.
4. 오른쪽 위 **배포 → 새 배포**를 누릅니다.
   - 톱니바퀴(유형 선택) → **웹 앱**
   - 다음 사용자 인증 정보로 실행: **나**
   - 액세스 권한이 있는 사용자: **모든 사용자**
5. **배포**를 누르고, 권한 요청이 나오면 내 구글 계정으로 **허용**합니다.
   - "Google에서 확인하지 않은 앱" 화면이 나오면 **고급 → (프로젝트 이름)(으)로 이동(안전하지 않음)**을 누르면 됩니다. 내가 만든 코드라 괜찮습니다.
6. 나온 **웹 앱 URL** (`https://script.google.com/macros/s/.../exec`)을 복사합니다.
7. `config.js`를 열어 따옴표 안에 붙여 넣습니다.

```js
window.PACER_API = 'https://script.google.com/macros/s/....../exec';
```

> 코드를 수정해서 다시 배포할 때는 **배포 → 배포 관리 → 연필(수정) → 버전: 새 버전**으로 해야 URL이 바뀌지 않습니다.

## 2단계. 깃허브에 올리기 (GitHub Pages)

1. [github.com/new](https://github.com/new) 에서 저장소를 만듭니다. 이름 예: `pacer-test`, **Public** 선택.
2. 저장소 화면에서 **Add file → Upload files**를 누르고, 이 폴더의 파일과 `img` 폴더를 통째로 끌어다 놓은 뒤 **Commit changes**.
   - `index.html`, `master.html`, `config.js`, `img/` 4장이 꼭 있어야 합니다.
3. 저장소 **Settings → Pages**로 가서
   - Source: **Deploy from a branch**
   - Branch: **main**, 폴더 **/(root)** → **Save**
4. 1~2분 뒤 화면 위쪽에 주소가 나옵니다. 예:
   - 참여자용: `https://아이디.github.io/pacer-test/`
   - 마스터용: `https://아이디.github.io/pacer-test/master.html`

## 3단계. 강의 전 점검

- [ ] 휴대폰으로 참여자용 주소에 들어가 테스트를 끝까지 해 본다
- [ ] 구글 시트 `결과` 탭에 한 줄이 생겼는지 확인한다
- [ ] 마스터 화면에서 인원수가 1로 올라가는지 확인한다
- [ ] **점검용 결과는 시트에서 행을 지워** 0명으로 시작한다 (머리글 줄은 남기기)

## 강의 중 사용법

- 마스터 화면을 프로젝터에 띄우면 오른쪽 위에 **참여용 QR**이 자동으로 나옵니다.
- 인원수는 처음에 흐리게 가려져 있습니다. 공개할 타이밍에 **결과 공개** 버튼을 누르세요.
- 같은 휴대폰에서 테스트를 다시 하면 마지막 결과만 셉니다.
