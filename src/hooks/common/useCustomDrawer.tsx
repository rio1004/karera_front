import CustomDrawer from "@/pages/player/components/Drawer";

interface UseCustomDrawerProps {
  content: React.ReactNode;
  show: boolean; 
  onClose?: () => void;
}

export const useCustomDrawer = ({
  content,
  show,
  onClose,
}: UseCustomDrawerProps) => {
  const closeDrawer = () => onClose?.();

  const DrawerComponent = (
    <CustomDrawer
      showDrawer={show}
      setShowDrawer={(val: boolean) => {
        if (!val) onClose?.(); 
      }}
    >
      {content}
    </CustomDrawer>
  );

  return { DrawerComponent, closeDrawer };
};
