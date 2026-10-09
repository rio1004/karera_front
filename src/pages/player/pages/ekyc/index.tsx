import Text from "@/components/Text";
import Divider from "@/components/Divider";
import { Button } from "@/components/ui/button";
import Card from "./Card";
import { useLocation, useNavigate } from "react-router-dom";

const EKYC = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const handleStartEKYC = async () => {
    const isFromRegister = location.pathname.includes("/auth/register") || 
                          location.state?.from === "register";
    if (isFromRegister) {
      navigate("/auth/register/document-type", {
        state: location.state 
      });
    } else {
      navigate("document-type");
    }
  };

  return (
    <div className="flex justify-between  flex-col min-h-full relative">
      <div>
        <Text
          text="Verification Process"
          type="p1"
          weight="bold"
          color="black"
          align="left"
        />
        <div className="flex flex-col gap-4 mt-4">
          <Card
            description="Choose a valid ID and take a picture
of the ID or upload from the album"
            icon="/EKYC/picture.png"
            title="Step 1 Upload ID Picture"
          />
          <Divider width="100%" />
          <Card
            description="Review and update personal details
as needed for verification"
            icon="/EKYC/id.png"
            title="Step 2 Confirm Information"
          />
          <Divider width="100%" />
          <Card
            description="Upload a selfie holding your ID
for verification"
            icon="/EKYC/capture.png"
            title="Step 3 Upload Selfie"
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full px-4 pb-4 bg-white z-50">
        <Button className="w-full" variant="green" onClick={handleStartEKYC}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default EKYC;
