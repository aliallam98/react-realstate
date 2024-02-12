import { ReactNode } from "react";

interface IProps {
  className?: string;
  title?: string;
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?:ReactNode
  disabled?:boolean
}

const Button = ({ title, className, value, onClick ,children, disabled }: IProps) => {
  return (
    <button className={`${className} ${disabled ? "opacity-20" :""}`} value={value} onClick={onClick} disabled={disabled} >
      {title || children }
    </button>
  );
};

export default Button;
