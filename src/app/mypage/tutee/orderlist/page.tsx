import { fetchOrderlist } from '@/data/fetchMypage';

async function Page() {
  const data = await fetchOrderlist();
  console.log(data);
  return (
    <div>
      <h2 className="font-extrabold text-[30px]">구매 내역</h2>
      <p>샬ㄹ라 샬라</p>
    </div>
  );
}

export default Page;
