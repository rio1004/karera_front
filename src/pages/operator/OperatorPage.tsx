import SideBar from "@/components/SideBar/SideBar";
import NetCard from "./components/NetCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TransactionTypeCard } from "./pages/wallet/components/TransactionTypeCard";
import Autoplay from "embla-carousel-autoplay";
import Text from "@/components/Text";
import Image from "@/components/Image";
import Footer from "./components/Footer";
import HeaderTitle from "./components/HeaderTitle";
import Header from "./components/Header";
import { createSearchParams, useNavigate } from "react-router-dom";
import { OPERATOR_ICON } from "@/constant/image";
import { useAuthStore } from "@/store/auth/useAuth";
import { useEffect } from "react";
import { useWalletOp } from "@/hooks/operator/useOperatorWallet";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";
import { formatToPeso } from "@/utils/utils.helper";
import OperatorSideBar from "./components/OperatorSidebar";

const OperatorDashboard = () => {
  const navigate = useNavigate();
  const { getOperatorWalletBalannce } = useWalletOp();
  const { wallets, totalBalance } = useOperatorWalletStore();
  const { isAuthenticated } = useAuthStore();
  console.log(wallets, "WALLETS");
  const walletTypes = [
    {
      id: "commission",
      title: "Commission",
      amount: wallets.commission.balance,
      variant: "commission" as const,
    },
    {
      id: "credits",
      title: "Game Credits",
      amount: wallets.game.balance,
      variant: "credits" as const,
    },
    {
      id: "load",
      title: "Load",
      amount: wallets.load.balance,
      variant: "load" as const,
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      getOperatorWalletBalannce();
    }
  }, [isAuthenticated]);

  return (
    <div className=" bg-gray-100">
      <OperatorSideBar />
      <Header />
      <div className="px-4 py-4 min-h-[90vh] space-y-4 border-1 border-white rounded-3xl mt-[-18px] bg-white pb-[100px]">
        <div
          className="flex justify-between bg-cover bg-no-repeat rounded-2xl p-4 bg w-full bg-center
"
          style={{
            backgroundImage: `url(${OPERATOR_ICON.walletBG.src})`,
          }}
        >
          <div className="flex flex-col items-start text-left">
            <Text text="Overall Balance" type="h8" color="#fff" />
            <Text
              text="Updated as of February 07, 2025"
              type="p2"
              color="#fff"
            />
          </div>
          <div className="flex gap-2">
            <Text
              text={formatToPeso(totalBalance)}
              type="h5"
              color="#fff"
              className="font-semibold"
            />
            <Image
              path={OPERATOR_ICON.refreshYellow.src}
              className="w-4"
              onClick={() => getOperatorWalletBalannce()}
            />
          </div>
        </div>
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {walletTypes.map((wallet) => (
              <CarouselItem key={wallet.id}>
                <TransactionTypeCard
                  title={wallet.title}
                  amount={wallet.amount}
                  variant={wallet.variant}
                  width="w-full"
                  height="h-[149px]"
                  onClick={() => {}}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div>
          <HeaderTitle
            icon={OPERATOR_ICON.commision1.src}
            label="Monthly Earnings"
          />
          <div
            className="bg-gray-100 rounded-xl p-4"
            onClick={() =>
              navigate({
                pathname: "commission",
                search: createSearchParams({ filter: "monthly" }).toString(),
              })
            }
          >
            <div className="flex justify-end text-xs text-gray-500 mb-2">
              Year 2025
            </div>
            <img
              src={OPERATOR_ICON.commisionGraph.src}
              alt="Earnings Chart"
              className="w-full h-auto"
            />
          </div>
        </div>

        <section className="bg-white rounded-lg">
          <div>
            <HeaderTitle icon={OPERATOR_ICON.network.src} label="My Network" />
            <NetCard
              active={100}
              borderColor="#1DD5E6"
              goTo="representatives"
              inactive={200}
              label="Representatives"
              total={500}
            />
            <NetCard
              active={340}
              borderColor="#FFEA00"
              goTo="player"
              inactive={200}
              label="Direct Players"
              total={500}
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default OperatorDashboard;
