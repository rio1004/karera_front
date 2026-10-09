
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Card from "../Card";

const UploadSelfie = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <Card
        description="Upload a selfie holding your valid identification document."
        icon="/EKYC/capture.png"
        descStyle={{ color: "black", fontSize: "14px" }}
      />
      <Card
        description="Ensure that the environment is 
well-lit and your face is clear."
        icon="/EKYC/lamp.png"
        descStyle={{ color: "black", fontSize: "14px" }}
      />
      <Card
        description="Please do not wear hats, masks,
or eyeglasses that may cover
your face."
        icon="/EKYC/cap.png"
        descStyle={{ color: "black", fontSize: "14px" }}
      />
      <Button
        variant={"green"}
        className="mt-10"
        onClick={() => navigate("selfie")}
      >
        {" "}
        Proceed
      </Button>
    </div>
  );
};

export default UploadSelfie;
