const Header = () => {
  return (
    <div className="flex flex-col items-center justify-start p-5  bg-cover">
      <div className="relative w-full flex justify-between mb-5">
        <div className="flex-1 flex items-center">
          <img
            src="/loginAssets/KARERA_LIVE_LOGO.png"
            alt="Secured Login"
            className="h-[70px] m-[-20px]"
          />
        </div>
        <img
          src="/homepageAssets/burger.png"
          alt="Secured Login"
          className="h-[31px]"
        />
      </div>
    </div>
  );
};

export default Header;
