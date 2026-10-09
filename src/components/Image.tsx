import type { CSSProperties, InputHTMLAttributes } from "react";

type Props = {
  path: string;
  style?: CSSProperties;
  className?: string;
} & InputHTMLAttributes<HTMLImageElement>;

const Image = ({ path, style, className = "", ...rest }: Props) => {
  return (
    <div className={`flex items-center justify-center`} {...rest}>
      <img src={path} alt="" style={style} className={`${className}`} />
    </div>
  );
};

export default Image;
