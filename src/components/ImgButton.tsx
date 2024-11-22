import Image from "next/image";


export default function ImgButton({
  type='button', label, imageSrc, imageAlt, width = 30, height = 30, ...props}: {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  imageSrc: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  disabled?: boolean;}) {

    const buttonStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  
    return (
    <button style={buttonStyle} type={type} aria-label={label} {...props}>
      <Image src={imageSrc} alt={imageAlt || label} width={width} height={height} />
    </button>
  );

}