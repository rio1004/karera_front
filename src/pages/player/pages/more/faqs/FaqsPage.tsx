import { FAQs_ITEM } from "@/constant/faqsItem";
import { FaqsAccordion } from "../../../components/Accordion";

export default function FaqsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-green-600 mb-8">
          Frequently Asked Questions
        </h1>
        <FaqsAccordion items={FAQs_ITEM} />
      </div>
    </div>
  );
}
