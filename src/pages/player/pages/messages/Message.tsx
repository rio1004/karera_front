import { useState } from "react";
import Text from "@/components/Gamesites/Text";
import { dummyData } from "@/constant/fakeMessages";
import { ICONS } from "@/constant/image";
import { dateFormatter, truncateText } from "@/utils/utils.helper";
import Pagination from "./components/Pagination";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const Message = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = dummyData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {currentItems.map((item, index) => {
          const isRead = item.status === "read";
          return (
            <div
              key={index}
              className="border-b border-[#C4C4C4] flex flex-col gap-1 py-4"
              onClick={() => navigate("inbox")}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 justify-between">
                  <div
                    className={`w-[5px] h-[5px] rounded ${
                      isRead ? "bg-white" : "bg-red-500"
                    }`}
                  ></div>
                  <img
                    src={ICONS.mail.src}
                    alt="mail"
                    className={`h-[18px] object-contain ${
                      isRead ? "opacity-50" : ""
                    }`}
                  />
                </div>
                <Text
                  text={truncateText(item.header, 25)}
                  type="p1"
                  color={isRead ? "disabled" : "primary"}
                  weight="bold"
                  className="flex-1"
                  align="left"
                />
                <Text
                  text={dateFormatter(item.date)}
                  type="p2"
                  color={isRead ? "disabled" : "primary"}
                />
              </div>
              <Text
                type="p2"
                text={truncateText(item.message, 96)}
                color={isRead ? "disabled" : "primary"}
                align="left"
                style={{ marginLeft: "10px" }}
              />
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Message;
