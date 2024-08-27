const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export function normalizeImageUrl(url: string): string {
  if (!url) return '';
  if (!SERVER) return url;
  
  // URL이 이미 서버 주소를 포함하고 있다면, 그대로 반환
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // 서버 주소가 이미 포함되어 있다면 중복 제거
  if (url.startsWith(SERVER)) {
    return url.replace(SERVER, '');
  }
  
  // 서버 주소가 없다면 추가
  return url.startsWith('/') ? `${SERVER}${url}` : `${SERVER}/${url}`;
}