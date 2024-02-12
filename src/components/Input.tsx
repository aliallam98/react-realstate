import { LegacyRef, forwardRef } from "react";

interface IProps {
  type: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string | number;
}

const Input = forwardRef(
  (
    { type, name, className, defaultValue, ...props }: IProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className="relative">
        <input
          {...props}
          defaultValue={defaultValue}
          ref={ref}
          className={`block w-full pb-1 px-6 pt-3 border  border-gray-400 outline-none disabled:bg-transparent/10 ${className}`}
          type={type}
          name={name}
          id={name}
        />
        <label
          className="capitalize absolute left-6 -top-[14px] bg-white border-x-4 border-white"
          htmlFor={name}
        >
          {name}
        </label>
      </div>
    );
  }
);

export default Input;
