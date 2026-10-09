import Image from "@/components/Gamesites/Image";
import Text from "@/components/Gamesites/Text";

type Props = {
  bg: string;
  icon: string;
  multiplier: string;
  amount: string;
  submit: () => void;
  active: boolean;
};

const BetCard = ({ bg, multiplier, icon, amount, submit, active }: Props) => {
  return (
    <div
      style={{ background: bg, border: active ? "4px solid yellow" : "none" }}
      className="flex justify-center items-center flex-col max-h-[200px] w-full h-[15vw] rounded-[15px]"
      onClick={submit}
    >
      <Image
        path={icon}
        style={{
          width: "70px",
        }}
      />
      <Text type="h5" text={amount} weight="medium" />
      <Text type="h6" text={multiplier} weight="medium" color="#ECC440" />
    </div>
  );
};

export default BetCard;
