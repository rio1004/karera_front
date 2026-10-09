 
import Header from "./Header";
import CustomSidebar from "./Sidebar";
import Content from "./Content";

const BetTransactions = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <CustomSidebar />
        <Content />
      </div>
    </>
  );
};

export default BetTransactions;
