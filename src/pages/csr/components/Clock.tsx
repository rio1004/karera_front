import { useEffect, useState } from "react";
import Text from "@/components/Gamesites/Text";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (num: number) => String(num).padStart(2, "0");

  const hours = format(time.getHours());
  const minutes = format(time.getMinutes());
  const seconds = format(time.getSeconds());

  return (
    <div className="flex items-center gap-1">
      <div>
        <Text type="h1" text={hours} color="primary" />
      </div>
      <Text type="h1" text=":" color="primary" />
      <div>
        <Text type="h1" text={minutes} color="primary" />
      </div>
      <Text type="h1" text=":" color="primary" />
      <div>
        <Text type="h1" text={seconds} color="primary" />
      </div>
    </div>
  );
}
