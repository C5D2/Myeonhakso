import { fetchCategory } from '@/data/fetchLecture';
import { Metadata } from 'next';

import Filter from './Filter';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';

export function generateMetadata({
  params,
}: {
  params: { type: string };
}): Metadata {
  const boardName = params.type;
  return {
    title: `면학소 ${boardName} 교육 리스트`,
    description: `면학소 ${boardName} 교육 리스트를 확인해보세요.`,
    openGraph: {
      title: `면학소 ${boardName} 교육 리스트`,
      description: `면학소 ${boardName} 교육 리스트를 확인해보세요.`,
      url: `/${params.type}`,
    },
  };
}

async function Page({ params, searchParams }: { params: { type: string }, searchParams: {page: string} }) {
  console.log(params.type);

  const customParams = { extra: { type: params.type } };

  const data = await fetchCategory('products', customParams, searchParams.page);
  console.log('data', data);

  const list = data?.item?.map((item, index) => (
    <div className="w-[300px] h-[320px] rounded-xl" key={index}>
      <Card item={item} key={index} />
    </div>
  ));

  return (
    <div className="flex gap-x-10 gap-y-20 ">
      <Filter />
      <div className='flex flex-col gap-10 w-full max-w-[1320px]'>
        <div className="flex flex-wrap content-start gap-10 max-w-[1400px]">
          {list}
        </div>
      <Pagination page={data?.pagination?.page} totalPages={data?.pagination?.totalPages}/>
      </div>
    </div>
  );
}

export default Page;
