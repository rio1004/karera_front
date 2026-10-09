import { useNavigate, useSearchParams } from "react-router-dom";
import { SubAccordion } from "../../../components/SubAccordion";
import { FAQs_ITEM } from "@/constant/faqsItem";

export default function FaqsSubItemsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subitemId = searchParams.get("id");
  const parent = FAQs_ITEM.find((item) =>
    item.subItems?.some((sub) => sub.id === subitemId)
  );

  if (!parent || !parent.subItems) {
    return <div className="p-6">Not found</div>;
  }

  return (
    <SubAccordion
      items={parent.subItems}
      onBack={() => navigate("/player/faqs")}
      parentTitle={parent.title}
      parentBgColor={parent.bgColor}
      parentBorderColor={parent.borderColor}
    />
  );
}
