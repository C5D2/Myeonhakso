import { FieldError } from 'react-hook-form';

export default function InputError({
  target,
}: {
  target: FieldError | undefined;
}) {
  if (!target) return null;
  return <p className="text-main-red">{target.message}</p>;
}
