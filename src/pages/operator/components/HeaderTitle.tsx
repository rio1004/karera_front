type Props = {
  icon: string;
  label: string;
};

const HeaderTitle = ({ icon, label }: Props) => {
  return (
    <div className="flex items-center space-x-2 text-gray-500 font-medium mb-4">
      <img src={icon} alt="Ways" className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );
};

export default HeaderTitle;
