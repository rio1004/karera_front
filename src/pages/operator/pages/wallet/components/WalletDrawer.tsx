import Divider from "@/components/Divider";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import CustomDrawer from "@/pages/player/components/Drawer";
import { formatToPeso } from "@/utils/utils.helper";

type listType = {
  label: string;
  value: string;
};

type Props = {
  amount: number;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  lists: listType[];
  onSubmit: () => void;
};

const OperatorWalletDrawer = ({
  amount,
  title,
  open,
  setOpen,
  lists,
  onSubmit,
}: Props) => {
  const handleSubmit = () => {
    console.log("test");
    onSubmit();
  };

  return (
    <CustomDrawer setShowDrawer={setOpen} showDrawer={open}>
      <div className="py-10 px-5 ">
        <div className="!space-y-3">
          <Text type="h6" text={title} />
          <Text
            type="h5"
            text={formatToPeso(amount)}
            color="success"
            weight="medium"
          />
        </div>
        <Divider
          type="dashed"
          width="100%"
          borderWidth="1px"
          className="mt-5"
        />
        <div className="py-5 space-y-2">
          {lists &&
            lists.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <Text text={item.label + ":"} type="h8" color="#5B5B5B" />
                <Text text={item.value} type="h7" color="#000" weight="bold" />
              </div>
            ))}
        </div>
        <Button
          variant={"green"}
          className="mt-5"
          onClick={handleSubmit}
          type="button"
        >
          Confirm
        </Button>
      </div>
    </CustomDrawer>
  );
};

export default OperatorWalletDrawer;
