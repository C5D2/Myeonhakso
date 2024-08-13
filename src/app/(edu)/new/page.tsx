import RegisterForm from '@/app/(edu)/new/RegisterForm';

function RegisterPage({ params }: { params: { type: string } }) {
  return <RegisterForm params={params} />;
}

export default RegisterPage;
