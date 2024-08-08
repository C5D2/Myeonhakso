import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { ILectureRegister } from '@/types/lecture';

interface IAddressProps {
  setValue: UseFormSetValue<ILectureRegister>;
  register: UseFormRegister<ILectureRegister>;
  // errors: FieldErrors<ILectureRegister>;
  setAddress: (address: string) => void;
}

export default function AddressSearch({
  register,
  // errors,
  setValue,
  setAddress,
}: IAddressProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setValue('extra.address', fullAddress);
    setAddress(fullAddress);
    setIsOpen(false);
  };

  return (
    <>
      <div className="col-span-full relative">
        <label htmlFor="address" className="block leading-6 text-gray-900">
          주소
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            <input
              placeholder="주소를 검색해주세요."
              {...register('extra.address')}
              className="col-span-5 block rounded-lg border py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-green-400"
              onClick={() => setIsOpen(val => !val)}
              readOnly
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-10 border border-gray-300 rounded-md p-2">
            <div className="w-full">
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
