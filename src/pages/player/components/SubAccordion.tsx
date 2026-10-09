import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/utils/cn";

interface SubAccordionData {
  id: string;
  title: string;
  content: string;
}

interface SubAccordionProps {
  items: SubAccordionData[];
  onBack: () => void;
  parentTitle: string;
  parentBgColor: string;
  parentBorderColor: string;
}

export const SubAccordion = ({
  items,
  parentBgColor,
  parentBorderColor,
}: SubAccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { subitemId } = useParams();

  useEffect(() => {
    if (subitemId) {
      setOpenItems([subitemId]);
    }
  }, [subitemId]);

  const toggleItem = (id: string) => {
    const isOpen = openItems.includes(id);
    setOpenItems(isOpen ? [] : [id]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="space-y-2">
          {items.map((item) => {
            const isOpen = openItems.includes(item.id);

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: parentBgColor,
                  borderLeft: parentBorderColor
                    ? `10px solid ${parentBorderColor}`
                    : undefined,
                }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
                >
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                  {isOpen ? (
                    <ChevronDown size={20} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500" />
                  )}
                </button>

                {isOpen && (
                  <div className={cn("px-4 pb-4 bg-[#F6F6F6BF]")}>
                    <div className="whitespace-pre-line">{item.content}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
