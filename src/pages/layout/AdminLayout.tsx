import LogoutButton from "../auth/LogoutButton";
import Image from "@/components/Image";
import { LOGIN_ASSETS } from "@/constant/image";
import { UI_COLORS } from "@/constant/colors";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminLayoutConfig } from "@/routes/AdminLayoutConfig";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const current = AdminLayoutConfig.find((page: any) =>
    location.pathname.endsWith(page.path)
  );
  const handleSectionChange = (
    url: string,
    type?: string,
    subRoute?: string
  ) => {
    if (type === "subpages" && subRoute) {
      navigate(subRoute);
      return;
    }
    navigate("/admin/" + url);
  };

  const getActiveSection = () => {
    const parts = location.pathname.split("/");
    return parts[2] || "";
  };

  const activeSection = getActiveSection();

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <div className="w-64 bg-gray-100 text-black flex flex-col border-r border-gray-300">
        <div
          className="p-4"
          style={{
            background: UI_COLORS.LINEAR.red,
          }}
        >
          <Image
            path={LOGIN_ASSETS.kareraLogo.src}
            alt="kareraLogo"
            className="w-[370px]"
          />
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {AdminLayoutConfig.map((item) => {
              const isActive = activeSection === item.path;

              return (
                <li key={item.path}>
                  <button
                    onClick={() =>
                      handleSectionChange(
                        item.path,
                        item.type,
                        item.subRoutes?.[0].path
                      )
                    }
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                      isActive
                        ? "bg-gray-200 text-black shadow-lg"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </button>

                  {item.type === "subpages" && item.path === activeSection && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.subRoutes &&
                        item.subRoutes.map((item) => (
                          <button
                            onClick={() => handleSectionChange(item.path)}
                            className={`block text-sm px-2 py-1 rounded hover:bg-gray-200 ${
                              location.pathname.includes(item.path)
                                ? "bg-gray-300 font-semibold"
                                : ""
                            }`}
                          >
                            {item.title}
                          </button>
                        ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className="px-6 py-4"
          style={{
            background: UI_COLORS.LINEAR.red,
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              {current?.title && (
                <p className="text-lg font-bold py-2 text-gray-100 mt-2.5">
                  {current.title}
                </p>
              )}
            </div>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-white text-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
