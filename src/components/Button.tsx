export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
  type?: "button" | "submit" | "reset";
  bgColor?: "green" | "black" | "gray" | "red";
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg"
}


function Button({ children, type = "button", bgColor = "green", size = "md", radius="sm", ...rest}: ButtonProps) {

  let buttonColor = {
    gray: `bg-main-gray`,
    green: `bg-main-green`,
    red: "bg-red-500",
    black: "bg-black",  
  };

  let buttonSize = {
    sm: "py-1 px-2 text-sm",
    md: "py-1 px-4 text-base",
    lg: "py-4 px-8 text-lg",
  };

  let buttonRadius = {
    sm: "rounded",
    md: "rounded-lg",
    lg: "rounded-2xl px-4"
  }

  return (
    <button
      type={type}
      className={`${buttonColor[bgColor]} ${buttonSize[size]} text-white  ml-2 text-base hover:bg-main-yellow ${buttonRadius[radius]}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
