import { fetchQnaItem } from '@/data/fetchMypage';
import { auth } from '@/auth';
import CommentNew from '@/components/Comment';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default async function page({ params }: { params: { id: number } }) {
  //{{url}}/posts/4 상세조회
  const session = await auth();
  const questionLayout =
    session?.user?.type === 'seller' ? 'mr-auto' : 'ml-auto';
  const answerLayout = session?.user?.type === 'seller' ? 'ml-auto' : 'mr-auto';

  const resItem = await fetchQnaItem(params.id);

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-lg border-b border-gray-30 py-1 mb-3">
        질문 제목 : {resItem.title}
      </h3>

      <div className="flex flex-col px-10 mb-5">
        <div
          className={`border border-gray-30 w-[45%] ${questionLayout} bg-light-orange py-3 px-2 rounded-md mb-1`}
        >
          <div className="sm:gap-1 flex items-center gap-2 mb-3 sm:flex-col">
            {resItem.user?.image ? (
              <img
                src={`${SERVER}/${resItem.user?.image}`}
                className="w-10 h-10 border border-black rounded-full"
              />
            ) : (
              <img
                src="/teacher.svg"
                className="w-10 h-10 border border-black rounded-full"
              />
            )}
            <p className="">{resItem.user.name}</p>
          </div>
          {resItem.content}
        </div>

        {resItem.replies &&
          resItem.replies.map((item, index) =>
            item.user._id === resItem.user._id ? (
              <div
                key={index}
                className={`border border-gray-30 w-[45%] ${questionLayout} bg-light-orange py-3 px-2 rounded-md mb-1`}
              >
                <div className="sm:gap-1 flex items-center gap-2 mb-3 sm:flex-col">
                  {item.user?.image ? (
                    <img
                      src={`${SERVER}/${resItem.user?.image}`}
                      className="w-10 h-10 border border-black rounded-full"
                    />
                  ) : (
                    <img
                      src="/lesson.svg"
                      className="w-10 h-10 border border-black rounded-full"
                    />
                  )}
                  <p className="">{item.user.name}</p>
                </div>
                {item.content}
              </div>
            ) : (
              <div
                key={index}
                className={`flex flex-col gap-1 border border-gray-30 w-[45%] bg-light-green py-6 px-2 rounded-md mb-2 ${answerLayout}`}
              >
                <div className="flex items-center gap-2 mb-3 sm:flex-col">
                  {item?.user?.image ? (
                    <img
                      src={`${SERVER}/${item?.user?.image}`}
                      className="w-10 h-10 border border-black rounded-full"
                    />
                  ) : (
                    <img
                      src="/teacher.svg"
                      className="w-10 h-10 border border-black rounded-full"
                    />
                  )}
                  <p className="">{item.user.name}</p>
                  <p className="text-sm text-gray-50">선생님 답변</p>
                </div>
                <p>{item.content}</p>
              </div>
            ),
          )}
      </div>
      <CommentNew />
    </div>
  );
}
