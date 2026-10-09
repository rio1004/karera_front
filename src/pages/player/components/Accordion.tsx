import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { SubAccordion } from "./SubAccordion";
import { useAccordionStore } from "@/store/player/useAccordionStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { AccordionData, CustomAccordionProps } from "@/constant/faqsItem";

export function FaqsAccordion({ items }: CustomAccordionProps) {
  const { openItem, setOpenItem } = useAccordionStore();
  const [selectedItem, setSelectedItem] = useState<AccordionData | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const subitemId = searchParams.get("id");

  useEffect(() => {
    if (!subitemId) {
      setSelectedItem(null);
      return;
    }

    const parent = items.find((item) =>
      item.subItems?.some((sub) => sub.id === subitemId)
    );
    if (parent) {
      setSelectedItem(parent);
    }
  }, [subitemId, items]);

  const handleItemClick = (item: AccordionData, event: React.MouseEvent) => {
    if (!item.subItems?.length) return;
    event.preventDefault();
    event.stopPropagation();
    navigate(`/player/faqs/subItems?id=${item.subItems[0].id}`);
  };

  const handleBack = () => {
    navigate("/player/faqs");
    setSelectedItem(null);
  };

  if (selectedItem?.subItems) {
    return (
      <SubAccordion
        items={selectedItem.subItems}
        onBack={handleBack}
        parentTitle={selectedItem.title}
        parentBgColor={selectedItem.bgColor}
        parentBorderColor={selectedItem.borderColor}
      />
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={openItem || ""}
      onValueChange={(value) => setOpenItem(value || null)}
      className="w-full space-y-3"
    >
      {items.map((item) => {
        const hasSubItems = !!item.subItems?.length;
        return (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="rounded-md border px-4"
            style={{
              backgroundColor: item.bgColor,
              borderLeft: `10px solid ${item.borderColor}`,
            }}
          >
            {hasSubItems ? (
              <button
                className="w-full px-6 py-4 flex justify-between items-center font-medium text-gray-800 transition-colors text-left"
                onClick={(event) => handleItemClick(item, event)}
              >
                <span>{item.title}</span>
                <ChevronRight size={20} className="text-gray-500 shrink-0" />
              </button>
            ) : (
              <>
                <AccordionTrigger className="w-full px-6 py-4 flex justify-between items-center font-medium text-gray-800 transition-colors text-left">
                  <span>{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-700 text-sm leading-relaxed">
                  {item.content}
                </AccordionContent>
              </>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
