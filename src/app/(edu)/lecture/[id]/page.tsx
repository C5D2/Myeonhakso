import LectureState from './LectureState';

function page({ params }: { params: { id: number } }) {
  console.log('id', params.id);
  return (
    <div>
      zustand를 할거야 localStorage에
      <LectureState id={params.id} />
    </div>
  );
}

export default page;
