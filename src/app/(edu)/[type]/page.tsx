import { fetchCategory } from '@/data/fetchLecture';
import { Metadata } from 'next';

import Filter from './Filter';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';

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

async function Page({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { page: string; custom: string; sort: string; keyword: string };
}) {
  let customParams;
  let sortParams;
  let keywordParmas;

  customParams = { 'extra.type': params.type };
  if (searchParams.custom) {
    customParams = JSON.parse(searchParams.custom);
    console.log('searchParams==2==>', JSON.parse(searchParams.custom));
  }
  if (searchParams.sort) {
    sortParams = JSON.parse(searchParams.sort);
    console.log('searchParams==3==>', JSON.parse(searchParams.sort));
  }

  const data = await fetchCategory(
    customParams,
    searchParams.page,
    sortParams,
    searchParams.keyword,
  );

  let list = data?.item?.map((item, index) => (
    <div className="sm:w-[250px] w-[300px] h-[320px] rounded-xl" key={index}>
      <Card item={item} key={index} />
    </div>
  ));

  return (
    <>
      <div className="my-10">
        <Search />
      </div>
      <div className="flex gap-x-10 gap-y-20 sm:gap-x-5">
        <Filter />
        <div className="flex flex-col gap-10 w-full max-w-[1320px]">
          <div className="flex flex-wrap content-start gap-10 max-w-[1400px]">
            {list}
          </div>
          <Pagination
            page={data?.pagination?.page}
            totalPages={data?.pagination?.totalPages}
          />
        </div>
      </div>
    </>
  );
}

export default Page;
