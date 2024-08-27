import Image from 'next/image';

export type ILevelType = '입문' | '초급' | '중급' | '고급';

export default function LectureLevel({ level }: { level: ILevelType }) {
  const switchLevelImage = (level: ILevelType) => {
    switch (level) {
      case '입문':
        return '/level-novice.svg';
      case '초급':
        return '/level-low.svg';
      case '중급':
        return '/level-middle.svg';
      case '고급':
        return '/level-high.svg';
      default:
        return '/level-novice.svg';
    }
  };

  return (
    <Image src={switchLevelImage(level)} width={30} height={40} alt="난이도" />
  );
}
