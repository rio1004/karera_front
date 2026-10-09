
interface DrawerActionButtonProps {
  icon: string; // image path
  label: string;
  onClick: () => void;
}

const DrawerActionButton = ({
  icon,
  label,
  onClick,
}: DrawerActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-between items-center w-full py-3 px-4 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <img src={icon} alt={label} className="w-6 h-6" />
        <span className="text-black font-medium">{label}</span>
      </div>
      <span className="text-gray-400 text-xl">›</span>
    </button>
  );
};

export default DrawerActionButton;
