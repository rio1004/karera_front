 

type Props = {
  path: string;
  style?: React.CSSProperties;
  className?: string;
} & React.InputHTMLAttributes<HTMLImageElement>;

const Image = ({ path, style, className = "" }: Props) => {
  return (
    <div className={`flex items-center justify-center`}>
      <img src={path} alt="" style={style} className={`${className}`} />
    </div>
  );
};

export default Image;
