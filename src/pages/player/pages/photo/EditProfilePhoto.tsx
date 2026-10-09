import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

import { useNavigate } from "react-router-dom";
import { useEditProfileStore } from "@/store/player/useEditProfileStore";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ICONS } from "@/constant/image";

export default function EditProfilePhoto() {
  const webcamRef = useRef<Webcam>(null);

  const {
    open,
    setOpen,
    showCamera,
    setShowCamera,
    capturedImage,
    setCapturedImage,
    showSuccess,
    setShowSuccess,
    savedPhoto,
    setSavedPhoto,
    facingMode,
    toggleFacingMode,
    resetCamera,
  } = useEditProfileStore();

  const navigate = useNavigate();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode,
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) setCapturedImage(imageSrc);
    }
  }, [setCapturedImage]);

  const savePhoto = () => {
    if (!capturedImage) return;
    setSavedPhoto(capturedImage);
    setShowSuccess(true);
    resetCamera();
    setShowCamera(false);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const chooseGallery = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setCapturedImage(ev.target?.result as string);
          setShowCamera(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
    setOpen(false);
  };

  const handleRoute = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <div className="p-4 max-w-2xl mx-auto">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <div className="bg-yellow-500 flex items-center justify-between p-5 rounded-lg mx-4 my-2.5 cursor-pointer hover:bg-yellow-600 transition-colors">
              <div className="flex items-center gap-3">
                <img
                  src={ICONS.camera.src}
                  alt={ICONS.camera.alt}
                  className="h-8 w-8"
                />
                <h1 className="text-white font-medium text-lg">Change Photo</h1>
              </div>
              <ChevronRight className="h-6 w-6 text-white" />
            </div>
          </DrawerTrigger>

          <DrawerContent
            aria-describedby={undefined}
            className="fixed left-0 bottom-0 w-screen h-auto flex justify-center pb-6"
          >
            <DrawerOverlay className="fixed" />

            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-center">
                  Select Photo Option
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <button
                  onClick={() => {
                    setShowCamera(true);
                    setOpen(false);
                  }}
                  className="block w-full text-lg py-4 border-b hover:text-gray-600"
                >
                  Take a Photo
                </button>
                <button
                  onClick={chooseGallery}
                  className="block w-full text-lg py-4 hover:text-gray-600"
                >
                  Choose from Gallery
                </button>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-full">
                    Cancel
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Update Info */}
        <div
          onClick={() => handleRoute("/player/edit-nickname")}
          className="bg-red-500 flex items-center justify-between p-5 rounded-lg mx-4 my-2.5 cursor-pointer hover:bg-red-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <img
              src={ICONS.editProfile.src}
              alt={ICONS.editProfile.alt}
              className="h-8 w-8"
            />
            <h1 className="text-white font-medium text-lg">
              Update Information
            </h1>
          </div>
          <ChevronRight className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 text-white">
            <button
              onClick={() => {
                setShowCamera(false);
                resetCamera();
              }}
              className="p-2 hover:bg-gray-800 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold">Take Photo</h2>
            <button
              onClick={toggleFacingMode}
              className="p-2 hover:bg-gray-800 rounded-full"
            >
              <RotateCcw className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-4 border-green-500">
              {!capturedImage ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="p-6 pb-8">
            {!capturedImage ? (
              <div className="flex justify-center">
                <button
                  onClick={capture}
                  className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                >
                  <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-400"></div>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={savePhoto}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-full text-lg"
                >
                  Save
                </button>
                <button
                  onClick={resetCamera}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-full text-lg"
                >
                  Retake
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && savedPhoto && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                src={savedPhoto}
                alt="Profile Photo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-lg font-medium">
              Profile photo updated!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
