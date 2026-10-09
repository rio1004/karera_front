import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useEKYCStore } from "@/store/player/useEKYCStore";

const Selfie = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const { setCapturedImage } = useEKYCStore();

  const videoConstraints = {
    width: { ideal: 300 },
    height: { ideal: 300 },
    facingMode: { ideal: facingMode },
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        navigate("/player/ekyc-settings/upload-selfie/confirm-selfie", {
          state: {
            from: "selfie",
          },
        });
      }
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="flex items-center justify-between flex-col absolute top-0 left-0 h-full w-full bg-[#5B5B5B]">
      {" "}
      <div className="mt-[12vh]">
        {ready && (
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            videoConstraints={videoConstraints}
            style={{ border: "2px solid #00A24A", borderRadius: "20px" }}
            onUserMediaError={(err) => {
              console.error("Camera error", err);
              alert("Camera access failed. Please check permissions.");
            }}
          />
        )}
      </div>
      <div className="flex justify-between items-center w-[300px]">
        <div>
          <img src="/EKYC/upload.png" alt="" />
        </div>
        <button
          onClick={() => capture()}
          className="w-[70px] h-[70px] rounded-full transition-transform duration-150 active:scale-90 mb-10"
        >
          <img
            src={"/EKYC/capture_btn.png"}
            alt="Capture"
            className="w-full h-full object-contain"
          />
        </button>
        <div onClick={toggleCamera}>
          <img src="/EKYC/change_cam.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Selfie;
