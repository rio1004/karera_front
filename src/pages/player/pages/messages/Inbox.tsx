import Divider from "@/components/Divider";
import Text from "@/components/Gamesites/Text";
import { Button } from "@/components/ui/button";

const Inbox = () => {
  return (
    <div className="flex flex-col p-10 items-start justify-center gap-3 rounded-[15px] shadow-[0px_0px_5px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col items-center justify-center w-[100%] gap-3">
        <Text text="May 04, 2024 11:06 AM" type="p2" color="disabled" />
        <Text
          text="Welcome to Karera.Live!"
          type="h8"
          color="primary"
          weight="bold"
        />
        <Divider width="100%" />
      </div>
      <Text
        text="Get Ready To Roll And Win!"
        type="h8"
        color="primary"
        weight="bold"
        align="left"
      />
      <Text
        text="Mag-deposit na sa iyong Karera.Live wallet!"
        type="p1"
        color="primary"
        align="left"
      />
      <Text
        text="Umpisahan na ang saya!"
        type="p1"
        color="primary"
        align="left"
        width={"100%"}
      />
      <Text
        text="Tumaya na at manalo, baka ikaw na ang susunod na milyonaryo!"
        type="p1"
        color="primary"
        align="left"
      />
      <Button variant={"green"} className="w-[unset] px-[30px] self-center">
        Go to Deposit
      </Button>
    </div>
  );
};

export default Inbox;
