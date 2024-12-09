import Image from 'next/image';

export default function ImgButton({
  type = 'button',
  label,
  imageSrc,
  imageAlt,
  width = 60,
  height = 60,
  className = '',
  ...props
}: {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  imageSrc: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) {
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <button style={buttonStyle} type={type} aria-label={label} {...props}>
      <Image
        src={imageSrc}
        alt={imageAlt || label}
        width={width}
        height={height}
        className={className}
      />
    </button>
  );
}
