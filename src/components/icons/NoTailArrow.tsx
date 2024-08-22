export default function NoTailArrow({
  className = '',
  width,
  height,
  fill,
  alt = '',
}: {
  className?: string;
  width: number;
  height: number;
  fill: string;
  alt: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 26 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={alt}
    >
      <path
        d="M8.69342 27.5L6.77051 25.2813L15.6809 15L6.77051 4.71875L8.69342 2.5L19.5268 15L8.69342 27.5Z"
        fill={fill}
      />
    </svg>
  );
}
