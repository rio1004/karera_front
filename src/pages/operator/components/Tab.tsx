import clsx from "clsx";
import { startTransition, useState } from "react";

type TabType = {
  label: string;
  value: string;
};

type Props = {
  tabs: TabType[];
  onSwitch: (tab: string) => void;
  defaultTab?: string;
  activeTab?: string; // controlled mode if provided
  spacing?: "around" | "between" | "center" | "end" | "start";
  className?: string;
};

const Tab = ({
  tabs,
  onSwitch,
  defaultTab = "all",
  activeTab: controlledActiveTab,
  spacing = "around",
  className,
}: Props) => {
  const [internalTab, setInternalTab] = useState<string>(defaultTab);

  // use parent’s activeTab if given, else fall back to internal state
  const activeTab = controlledActiveTab ?? internalTab;

  const handleSwitchTab = (tab: string) => {
    startTransition(() => {
      if (controlledActiveTab === undefined) {
        // uncontrolled: manage own state
        setInternalTab(tab);
      }
      // always notify parent
      onSwitch(tab);
    });
  };

  return (
    <div
      className={clsx(
        "border-b pb-3 flex",
        spacing === "start" && "justify-start",
        spacing === "end" && "justify-end",
        spacing === "between" && "justify-between",
        spacing === "center" && "justify-center",
        spacing === "around" && "justify-around",
        className
      )}
    >
      {tabs.map((item) => (
        <p
          key={item.value}
          className={clsx(
            "cursor-pointer select-none transition-colors",
            activeTab === item.value
              ? "text-success font-bold"
              : "text-gray-500 hover:text-success"
          )}
          onClick={() => handleSwitchTab(item.value)}
        >
          {item.label}
        </p>
      ))}
    </div>
  );
};

export default Tab;
