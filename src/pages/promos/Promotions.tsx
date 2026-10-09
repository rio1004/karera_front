import   { useState } from "react";
import "./Promotions.css";
import { usePromoStore } from "@/store/admin/usePromoStore";

const Promotions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"unclaimed" | "claimed" | "voucher">("unclaimed");

  const {
    unclaimedPromos,
    claimedPromos,
    expandedPromoIds,
    claimPromo,
    togglePromoDescription,
  } = usePromoStore();

  const promosToShow =
    activeTab === "unclaimed"
      ? unclaimedPromos
      : activeTab === "claimed"
      ? claimedPromos
      : [];

  return (
    <div className="promotions-container">
      {/* Tabs */}
      <div className="promo-tabs-text">
        <span
          className={activeTab === "unclaimed" ? "tab-text active" : "tab-text"}
          onClick={() => setActiveTab("unclaimed")}
        >
          Unclaimed
        </span>
        <span
          className={activeTab === "claimed" ? "tab-text active" : "tab-text"}
          onClick={() => setActiveTab("claimed")}
        >
          Claimed
        </span>
        <span
          className={activeTab === "voucher" ? "tab-text active" : "tab-text"}
          onClick={() => setActiveTab("voucher")}
        >
          Voucher
        </span>
      </div>

      {/* Promos */}
      {promosToShow.map((promo) => {
        const isExpanded = expandedPromoIds.has(promo.id);

        // Button text
        const buttonText =
          activeTab === "claimed"
            ? `CLAIM DATED: ${promo.claimedDate || ""}`
            : isExpanded
            ? "CLICK TO CLAIM THIS OFFER"
            : "CHECK THIS OFFER!";

        return (
          <div key={promo.id}>
            <div className="promo-card">
              <img
                src={
                  activeTab === "claimed" && promo.claimedImage
                    ? promo.claimedImage
                    : promo.image
                }
                alt="Promo"
                className="promo-image"
              />
              <button
                className={`promo-transparent-btn ${
                  activeTab === "claimed" || promo.textColor === "white"
                    ? "white-text"
                    : ""
                }`}
                onClick={() => {
                  if (activeTab === "unclaimed") {
                    if (isExpanded) {
                      claimPromo(promo.id);
                      setActiveTab("claimed");
                    } else {
                      togglePromoDescription(promo.id);
                    }
                  } else {
                    togglePromoDescription(promo.id);
                  }
                }}
              >
                {buttonText}
              </button>
            </div>

            {/* Show description for both Unclaimed & Claimed */}
            {isExpanded && (
              <div
                className="promo-description-below"
                dangerouslySetInnerHTML={{ __html: promo.description }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Promotions;