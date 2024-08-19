export default function Footer() {
  return (
    <div className="p-10 h-[120px] border mt-auto flex-shrink-0 bg-main-light-green sm:hidden">
      <ul className="flex gap-6 text-gray-50 font-thin">
        <li className="">면학소 소개</li>
        <li>사용자 이용 약관</li>
        <li>개인정보 처리 방침</li>
      </ul>
      <p className="font-thin">(주) 면학소 | 대표자 : 뱅쿄시요</p>
    </div>
  );
}
