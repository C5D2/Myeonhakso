import RegisterForm from '@/app/(with-chatbot)/(edu)/new/RegisterForm';

function RegisterPage({ params }: { params: { type: string } }) {
  return (
    <RegisterForm mode="register" params={params} lectureDetailData={null} />
  );
}

export default RegisterPage;
