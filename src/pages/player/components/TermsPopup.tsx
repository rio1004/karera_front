import Modal from "@/components/Modal";
import Text from "@/components/Text";
import { ICONS } from "@/constant/image";
import { TOI } from "@/constant/TermsAndConditions";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { X } from "lucide-react";
import { useState, Fragment } from "react";

type Props = {};

type ListProps = {
  bullets?: string[];
  numbers?: string[];
  letters?: string[];
  romans?: string[];
  nestedNumbers?: { parent: string; child?: string }[];
};

const ListRenderer = ({
  bullets,
  numbers,
  letters,
  nestedNumbers,
  romans,
}: ListProps) => {
  if (bullets?.length) {
    return (
      <ul className="list-none space-y-1 text-[13px] text-justify">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="relative pl-4">
            <span className="absolute left-0 text-[15px]">º</span>
            {bullet}
          </li>
        ))}
      </ul>
    );
  }
  if (romans?.length) {
    return (
      <ul className="list-none space-y-1 text-[13px] text-justify">
        {romans.map((roman, idx) => (
          <li key={idx} className="relative pl-4">
            <span className="absolute left-0 text-[13px]">
              {["I", "II", "III", "IV"][idx] || `${idx + 1}`}.
            </span>
            {roman}
          </li>
        ))}
      </ul>
    );
  }

  if (numbers?.length) {
    return (
      <ul className="list-none space-y-1 text-[13px] text-justify">
        {numbers.map((bullet, idx) => (
          <li key={idx} className="relative pl-4">
            <span className="absolute left-0 text-[13px]">{idx + 1}.</span>
            {bullet}
          </li>
        ))}
      </ul>
    );
  }

  if (letters?.length) {
    return (
      <ul className="list-none space-y-1 text-[13px] text-justify">
        {letters.map((bullet, idx) => (
          <li key={idx} className="relative pl-5">
            <span className="absolute left-0 text-[13px] font-medium">
              {String.fromCharCode(97 + idx)}.
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    );
  }

  if (nestedNumbers?.length) {
    return (
      <ul className="list-none space-y-1 text-[13px] text-justify">
        {nestedNumbers.map((bullet, idx) => (
          <Fragment key={idx}>
            <li className="relative pl-5">
              <span className="absolute left-0 text-[13px] font-medium">
                {idx + 1}.
              </span>
              {bullet.parent}
            </li>
            {bullet.child && (
              <ul className="ml-6 list-none space-y-1">
                <li className="relative pl-5">
                  <span className="absolute left-0 text-[13px] font-medium">
                    a.
                  </span>
                  {bullet.child}
                </li>
              </ul>
            )}
          </Fragment>
        ))}
      </ul>
    );
  }

  return null;
};

const TermsPopup = () => {
  const { showTOU, setShowTOU } = usePlayerStore();

  return (
    <div>
      <Modal
        type="custom"
        isOpen={showTOU}
        contentStyle=" !font-[Roboto] relative"
      >
        <div
          className="absolute top-0 right-0"
          onClick={() => setShowTOU(false)}
        >
          <X color="#000" />
        </div>
        <Text text="Terms & Conditions" type="h7" weight="medium" />

        <div className="max-h-[600px] overflow-y-auto">
          {" "}
          <div className="flex flex-col gap-2 mt-4">
            <p className="font-medium text-[13px]">Terms of Use</p>

            {TOI.map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[13px]">
                    {(() => {
                      const toRoman = (num: number) => {
                        const roman = [
                          ["IX", 9],
                          ["V", 5],
                          ["IV", 4],
                          ["I", 1],
                        ] as [string, number][];
                        let result = "";
                        for (const [letter, n] of roman) {
                          while (num >= n) {
                            result += letter;
                            num -= n;
                          }
                        }
                        return result;
                      };
                      return `${toRoman(i + 1)}.`;
                    })()}
                  </span>
                  <p className="font-medium text-[13px]">{item.header}</p>
                </div>
                {item.description && (
                  <p className="text-justify text-[13px]">{item.description}</p>
                )}
                <ListRenderer
                  bullets={item.bullets}
                  numbers={item.numbers}
                  letters={item.letters}
                  nestedNumbers={item.nestedNumbers}
                  romans={item.romans}
                />
                <p className="text-justify text-[13px]">{item.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TermsPopup;
