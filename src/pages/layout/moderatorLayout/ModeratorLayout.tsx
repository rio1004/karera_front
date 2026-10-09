import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LOGIN_ASSETS } from "@/constant/image";

export default function ModeratorLayout() {
  return (
    <div
      className="relative h-[450px] w-full bg-cover bg-center flex flex-col gap-12 items-center justify-center"
      style={{ backgroundImage: `url(${LOGIN_ASSETS.redBg.src})` }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="fixed bottom-0">
        <Footer />
      </footer>
    </div>
  );
}
