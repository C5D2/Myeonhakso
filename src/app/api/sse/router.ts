import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  const sendEvent = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // 나중에 사용하기 위해 sendEvent 함수 저장
  (req as any).sendEvent = sendEvent

  // 연결 유지
  const intervalId = setInterval(() => {
    sendEvent({ type: 'ping' })
  }, 30000)

  req.on('close', () => {
    clearInterval(intervalId)
  })
}