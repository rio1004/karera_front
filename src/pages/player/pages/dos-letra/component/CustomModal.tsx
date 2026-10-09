import * as React from "react";
import Image from "@/components/Image";

interface CustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function CustomModal({
  open,
  onOpenChange,
  imageSrc,
  icon,
  title,
  description,
  children,
}: CustomModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)} // close when clicking overlay
      />

      {/* Modal Content */}
      <div className="relative z-50 max-w-sm w-full rounded-2xl text-center shadow-xl bg-yellow-50 px-6 pt-16 pb-6">
        {/* Decorative sparkles/hearts */}
        <span className="absolute -top-2 left-6 text-yellow-400 select-none">✨</span>
        <span className="absolute -top-3 right-8 text-yellow-400 select-none">✨</span>
        <span className="absolute top-6 right-4 text-yellow-400 select-none">💛</span>

        {/* Close button (optional) */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={() => onOpenChange(false)}
        >
          ✕
        </button>

        {/* Header avatar/icon, floating */}
        {imageSrc ? (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden shadow-md bg-white">
              <Image
                path={imageSrc}
                alt="Modal Image"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          icon && <div className="text-5xl flex justify-center">{icon}</div>
        )}

        {title && (
          <h2 className="mt-2 text-lg font-bold text-gray-800">{title}</h2>
        )}
        {description && (
          <p className="mt-2 text-gray-700 leading-relaxed">{description}</p>
        )}

        {/* Footer */}
        <div className="flex justify-center mt-4 space-x-2">{children}</div>
      </div>
    </div>
  );
}
