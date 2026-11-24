// 관리자 화면 문구(한국어·일본어)와 언어 쿠키: 서버·클라이언트 공용
export const CONSOLE_LANGS = ['ko', 'ja'] as const;
export type ConsoleLang = (typeof CONSOLE_LANGS)[number];
export const CONSOLE_LANG_COOKIE = 'console_lang';
export const LANG_NAMES: Record<ConsoleLang, string> = { ko: '한국어', ja: '日本語' };

export const toConsoleLang = (v: string | undefined | null): ConsoleLang => (v === 'ja' ? 'ja' : 'ko');

const ko = {
  brand_tag: '운영',
  nav_dashboard: '대시보드',
  nav_applicants: '신청자',
  nav_other: '기타 운영',
  nav_inbox: '문의 · 구독',
  nav_tools: '학비 · 환율',
  nav_settings: '설정',
  nav_operators: '관리자 관리',
  nav_account: '내 계정',
  soon: '준비 중',
  logout: '로그아웃',
  lang: '언어',

  login_title: '운영자 로그인',
  id: '아이디',
  password: '비밀번호',
  code: '인증 앱 코드 (6자리)',
  code_ph: '처음 로그인이면 비워 두세요',
  login_btn: '로그인',
  checking: '확인 중…',
  saving: '저장 중…',

  setup_title: '처음 로그인 설정',
  setup_lead: '새 비밀번호를 정하고, 휴대폰 인증 앱(Google Authenticator, Microsoft Authenticator, 1Password 등)을 등록해 주세요. 다음부터는 로그인할 때 앱에 보이는 6자리 코드를 함께 넣습니다.',
  setup_step1: '1. 인증 앱에 등록하기',
  setup_step1_text: '앱에서 "설정 키 입력"을 고르고 아래 키를 넣어 주세요. 계정 이름은 aah! 운영으로 하면 됩니다.',
  setup_link: '휴대폰에서 보고 있다면 여기를 눌러 앱으로 바로 등록',
  setup_step2: '2. 앱에 보이는 6자리 코드',
  setup_step3: '3. 새 비밀번호 (10자 이상)',
  new_password_again: '새 비밀번호 한 번 더',
  setup_btn: '설정 마치고 들어가기',

  err_wrong: '아이디, 비밀번호 또는 인증 코드가 맞지 않습니다.',
  err_locked: '로그인을 여러 번 틀려 15분 동안 잠겼습니다. 잠시 뒤에 다시 해 주세요.',
  err_server: '서버에 연결하지 못했습니다. 잠시 뒤에 다시 해 주세요.',
  err_setup_expired: '설정 시간이 지났습니다. 처음부터 다시 로그인해 주세요.',
  err_weak_password: '새 비밀번호는 10자 이상이어야 합니다.',
  err_same_password: '지금 비밀번호와 다른 비밀번호를 정해 주세요.',
  err_bad_code: '인증 코드가 맞지 않습니다. 앱에 보이는 6자리 숫자를 넣어 주세요.',
  err_mismatch: '새 비밀번호 두 칸이 서로 다릅니다.',
  err_current_wrong: '지금 비밀번호가 맞지 않습니다.',
  err_bad_id: '아이디는 영어 소문자, 숫자, 점(.), 밑줄(_), 하이픈(-)으로 3~32자입니다.',
  err_bad_name: '이름을 넣어 주세요.',
  err_id_taken: '이미 있는 아이디입니다.',
  err_forbidden: '최고 관리자만 할 수 있습니다.',
  err_not_found: '없는 관리자입니다.',
  err_self: '본인 비밀번호는 내 계정에서 바꿔 주세요.',

  dash_title: '대시보드',
  dash_lead: '신청자 관리와 할 일 목록은 다음 단계에서 여기에 붙습니다.',
  log_title: '운영자 활동 기록',
  log_sub: '최근 50건 · 한국 시간',
  log_empty: '아직 기록이 없습니다.',
  act_login: '로그인',
  act_login_failed: '로그인 실패',
  act_login_locked: '로그인 잠김',
  act_setup_done: '처음 설정 완료',
  act_password_changed: '비밀번호 변경',
  act_operator_created: '관리자 추가',
  act_operator_reset: '임시 비밀번호 재발급',
  minutes: '{n}분',

  acct_title: '내 계정',
  role: '권한',
  role_super: '최고 관리자',
  role_admin: '관리자',
  name: '이름',
  last_login: '마지막 로그인',
  pw_title: '비밀번호 변경',
  pw_lead: '바꾸면 다른 기기에서 열려 있던 로그인은 끝납니다. 인증 앱은 그대로 씁니다.',
  pw_current: '지금 비밀번호',
  pw_new: '새 비밀번호 (10자 이상)',
  pw_btn: '비밀번호 바꾸기',
  pw_done: '비밀번호를 바꿨습니다.',

  ops_title: '관리자 관리',
  ops_lead: '관리자를 추가하면 임시 비밀번호가 한 번만 보입니다. 본인에게 직접 전해 주세요. 처음 로그인할 때 새 비밀번호와 인증 앱을 등록합니다.',
  ops_add: '관리자 추가',
  ops_id_hint: '영어 소문자, 숫자, . _ -',
  ops_add_btn: '추가하기',
  ops_temp_title: '{id} 님의 임시 비밀번호',
  ops_temp_note: '이 화면을 벗어나면 다시 볼 수 없습니다. 본인에게 직접 전해 주세요. 잊어버리면 "임시 비밀번호 재발급"으로 새로 만들 수 있습니다.',
  ops_temp_close: '전달했습니다',
  ops_list: '관리자 목록',
  status: '상태',
  st_active: '사용 중',
  st_setup: '처음 설정 전',
  st_locked: '잠김',
  ops_reset: '임시 비밀번호 재발급',
  ops_reset_confirm: '재발급하면 지금 비밀번호와 인증 앱 등록이 없어집니다. 계속할까요?',
  ops_reset_yes: '재발급',
  cancel: '취소',
  you: '나',
  never: '아직 없음',
};

type Dict = Record<keyof typeof ko, string>;

const ja: Dict = {
  brand_tag: '運営',
  nav_dashboard: 'ダッシュボード',
  nav_applicants: '申請者',
  nav_other: 'その他',
  nav_inbox: 'お問い合わせ・購読',
  nav_tools: '学費・為替',
  nav_settings: '設定',
  nav_operators: '管理者管理',
  nav_account: 'マイアカウント',
  soon: '準備中',
  logout: 'ログアウト',
  lang: '言語',

  login_title: '運営者ログイン',
  id: 'ID',
  password: 'パスワード',
  code: '認証アプリのコード（6桁）',
  code_ph: '初回ログインの場合は空欄のまま',
  login_btn: 'ログイン',
  checking: '確認中…',
  saving: '保存中…',

  setup_title: '初回ログイン設定',
  setup_lead: '新しいパスワードを決めて、スマートフォンの認証アプリ（Google Authenticator、Microsoft Authenticator、1Password など）を登録してください。次回からはログイン時にアプリに表示される6桁のコードも入力します。',
  setup_step1: '1. 認証アプリに登録',
  setup_step1_text: 'アプリで「セットアップキーを入力」を選び、下のキーを入力してください。アカウント名は aah! 運営 で構いません。',
  setup_link: 'スマートフォンで見ている場合はここを押すとアプリに直接登録できます',
  setup_step2: '2. アプリに表示される6桁のコード',
  setup_step3: '3. 新しいパスワード（10文字以上）',
  new_password_again: '新しいパスワード（確認）',
  setup_btn: '設定を完了してログイン',

  err_wrong: 'ID、パスワード、または認証コードが正しくありません。',
  err_locked: 'ログインに何度も失敗したため、15分間ロックされました。しばらくしてからもう一度お試しください。',
  err_server: 'サーバーに接続できませんでした。しばらくしてからもう一度お試しください。',
  err_setup_expired: '設定の有効時間が過ぎました。最初からもう一度ログインしてください。',
  err_weak_password: '新しいパスワードは10文字以上にしてください。',
  err_same_password: '現在のパスワードとは別のパスワードにしてください。',
  err_bad_code: '認証コードが正しくありません。アプリに表示されている6桁の数字を入力してください。',
  err_mismatch: '新しいパスワードが一致しません。',
  err_current_wrong: '現在のパスワードが正しくありません。',
  err_bad_id: 'IDは半角英小文字・数字・ピリオド(.)・アンダースコア(_)・ハイフン(-)で3〜32文字です。',
  err_bad_name: '名前を入力してください。',
  err_id_taken: 'このIDはすでに使われています。',
  err_forbidden: '最高管理者のみ操作できます。',
  err_not_found: 'この管理者は存在しません。',
  err_self: 'ご自身のパスワードはマイアカウントで変更してください。',

  dash_title: 'ダッシュボード',
  dash_lead: '申請者管理とやることリストは次の段階でここに追加されます。',
  log_title: '運営者の操作履歴',
  log_sub: '直近50件・韓国時間',
  log_empty: 'まだ履歴がありません。',
  act_login: 'ログイン',
  act_login_failed: 'ログイン失敗',
  act_login_locked: 'ログインロック',
  act_setup_done: '初回設定完了',
  act_password_changed: 'パスワード変更',
  act_operator_created: '管理者追加',
  act_operator_reset: '仮パスワード再発行',
  minutes: '{n}分',

  acct_title: 'マイアカウント',
  role: '権限',
  role_super: '最高管理者',
  role_admin: '管理者',
  name: '名前',
  last_login: '最終ログイン',
  pw_title: 'パスワード変更',
  pw_lead: '変更すると、他の端末で開いているログインは終了します。認証アプリはそのまま使えます。',
  pw_current: '現在のパスワード',
  pw_new: '新しいパスワード（10文字以上）',
  pw_btn: 'パスワードを変更',
  pw_done: 'パスワードを変更しました。',

  ops_title: '管理者管理',
  ops_lead: '管理者を追加すると、仮パスワードが一度だけ表示されます。ご本人に直接お伝えください。初回ログイン時に新しいパスワードと認証アプリを登録します。',
  ops_add: '管理者を追加',
  ops_id_hint: '半角英小文字・数字・. _ -',
  ops_add_btn: '追加する',
  ops_temp_title: '{id} さんの仮パスワード',
  ops_temp_note: 'この画面を離れると二度と表示されません。ご本人に直接お伝えください。忘れた場合は「仮パスワード再発行」で新しく作れます。',
  ops_temp_close: '伝えました',
  ops_list: '管理者一覧',
  status: '状態',
  st_active: '利用中',
  st_setup: '初回設定前',
  st_locked: 'ロック中',
  ops_reset: '仮パスワード再発行',
  ops_reset_confirm: '再発行すると、現在のパスワードと認証アプリの登録が無効になります。続けますか？',
  ops_reset_yes: '再発行',
  cancel: 'キャンセル',
  you: '自分',
  never: 'まだなし',
};

export type ConsoleKey = keyof typeof ko;
const DICTS: Record<ConsoleLang, Dict> = { ko, ja };

export const ct = (lang: ConsoleLang, key: ConsoleKey, vars: Record<string, string | number> = {}): string =>
  (DICTS[lang][key] ?? key).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

/** API error code → sentence */
export const errorText = (lang: ConsoleLang, code: unknown): string => {
  const key = `err_${typeof code === 'string' ? code : 'server'}`;
  return key in ko ? ct(lang, key as ConsoleKey) : ct(lang, 'err_server');
};

/** A moment in Korean time, written the operator's way */
export const consoleTime = (lang: ConsoleLang, iso: string) =>
  new Date(iso).toLocaleString(lang === 'ja' ? 'ja-JP' : 'ko-KR', {
    month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Seoul',
  });
