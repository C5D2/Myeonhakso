import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function sendMessage(
  url: string,
  { arg }: { arg: ChatCompletionMessageParam[] }
) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: arg }),
    });
    
    if (!res.ok) {
      console.error('API Error:', {
        status: res.status,
        statusText: res.statusText,
      });
      throw new Error('강의 정보를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    
    const data = await res.json();
    if (!data.messages) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response structure');
    }
    return data.messages;
  } catch (error) {
    throw error;
  }
}
