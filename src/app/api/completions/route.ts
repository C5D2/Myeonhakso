import { fetchLecture } from '@/data/fetchLecture';
import { Ilecture } from '@/types/lecture';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let cachedLectureList: Ilecture[] | null = null;

interface CustomChatCompletionMessage extends ChatCompletionMessage {
  lectures?: Ilecture[];
}

export async function POST(request: NextRequest) {
  try {
    if (!cachedLectureList) {
      cachedLectureList = await fetchLecture('products', {}, '0');
    }

    const { messages } = await request.json();

    const systemMessage = {
      role: 'system',
      content: `너는 교육 플랫폼인 면학소의 강의를 추천하는 챗봇이야.

강의 목록:
${JSON.stringify(cachedLectureList)}

규칙:
1. 강의 추천 시에는 실제 있는 강의만 엄격하게 3개까지만 추천, 하나밖에 없으면 하나만 추천해도 돼.
2. 각 강의는 번호를 매겨서 추천 (1. "강의명" - 설명)
3. 강의명은 정확히 큰따옴표("")로 감싸서 표시
4. 각 강의 추천 후에는 간단한 설명 추가
5. 강의가 없을 때만 "찾지 못했다"고 답변`
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [systemMessage, ...messages],
      temperature: 0.5,
    });

    const assistantMessage: CustomChatCompletionMessage = {
      ...completion.choices[0].message,
    };

    const recommendedLectureNames = (assistantMessage.content?.match(/"([^"]+)"/g) || [])
    .map(match => match.replace(/"/g, '').trim());
  
  const lectures = recommendedLectureNames
    .map(lectureName => {
      // 유사도 기준으로 강의 찾기
      return cachedLectureList?.find(lecture =>
        lecture.name.toLowerCase().includes(lectureName.toLowerCase())
      );
    })
    .filter((lecture): lecture is Ilecture => !!lecture);

    assistantMessage.lectures = lectures;

    let finalMessages = [...messages, assistantMessage];

    lectures.forEach(lecture => {
      finalMessages.push({
        role: 'function',
        name: 'retrieve',
        content: JSON.stringify(lecture),
      });
    });

    return Response.json({ messages: finalMessages });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: '강의 추천 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
