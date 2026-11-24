'use client';
// 운영자 로그아웃: 세션 쿠키를 지우고 로그인 화면으로

export default function LogoutButton() {
  const logout = async () => {
    await fetch('/api/console/logout', { method: 'POST', body: '{}', headers: { 'Content-Type': 'application/json' } });
    window.location.assign('/console/login');
  };
  return (
    <button type="button" onClick={logout} className="rounded-[9px] border border-[#E3E7ED] px-3 py-1.5 text-[13px] font-semibold text-ink-2 hover:bg-[#F5F6F8]">
      로그아웃
    </button>
  );
}
