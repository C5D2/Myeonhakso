import RegisterForm from '@/app/(with-chatbot)/(edu)/new/RegisterForm';
import { fetchLectureDetail } from '@/data/fetchLecture';

async function EditPage({ params }: { params: { id: string; type: string } }) {
  const lectureDetailData = await fetchLectureDetail(params.id);
  return (
    <RegisterForm
      mode="edit"
      params={params}
      lectureDetailData={lectureDetailData}
    />
  );
}

export default EditPage;
