import { fetchCategory } from '@/data/fetchLecture';
import { Metadata } from 'next';

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

async function Page({ params }: { params: { type: string } }) {
  console.log(params.type);
  const customParams = { 'extra.type': ' it' };

  // console.log('stringify', JSON.stringify(customParams));

  const data = await fetchCategory('products', customParams);
  console.log('data', data);

  // {{url}}/products?custom={"extra.isNew": true} -> 조건부 목록 생성
  return <div>Page</div>;
}

export default Page;
