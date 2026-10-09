import { ICONS, SOCIAL_MEDIA } from "@/constant/image";
import { Link } from "react-router-dom";

const BottomSection = () => {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-gray-700 font-semibold mb-2">Payment Method</h3>
        <img src={ICONS.qrphlogo.src} alt="QRPh" className="h-10" />
      </div>
      <div className="mb-6">
        <h3 className="text-gray-700 font-semibold mb-2">Let's Connect!</h3>
        <div className="flex gap-4">
          <Link to="#">
            <img
              src={SOCIAL_MEDIA.facebook.src}
              alt={SOCIAL_MEDIA.facebook.alt}
              className="h-8 w-8"
            />
          </Link>
          <Link to="#">
            <img
              src={SOCIAL_MEDIA.instagram.src}
              alt={SOCIAL_MEDIA.instagram.alt}
              className="h-8 w-8"
            />
          </Link>
          <Link to="#">
            <img
              src={SOCIAL_MEDIA.tiktok.src}
              alt={SOCIAL_MEDIA.tiktok.alt}
              className="h-8 w-8"
            />
          </Link>
        </div>
      </div>
      <hr className="my-6" />
      <div className="mb-6">
        <h3 className="text-gray-700 font-semibold mb-2">About Us</h3>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link to="#" className="hover:underline">
            FAQs
          </Link>
        </div>
      </div>
      <hr className="my-6" />
      <div className="mb-10">
        <h3 className="text-gray-700 font-semibold mb-2">Responsible Gaming</h3>
        <div className="flex gap-4 items-center">
          <img
            src={ICONS.pagcorlogo.src}
            alt={ICONS.pagcorlogo.alt}
            className="h-8"
          />
        </div>
      </div>
    </section>
  );
};

export default BottomSection;
