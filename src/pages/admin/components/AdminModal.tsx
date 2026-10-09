import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AdminModalProps {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSubmit?: (e: React.FormEvent) => void;
  saveName?: string;
  isLoading?: boolean;
  children: React.ReactNode;
  showFooter?: boolean;
  cancelText?: string;
  saveText?: string;
  onCancel?: () => void;
}

export const AdminModal = ({
  title,
  open,
  setOpen,
  handleSubmit,
  saveName = "Save",
  isLoading = false,
  children,
  showFooter = true,
  cancelText = "Cancel",
  saveText,
  onCancel,
}: AdminModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  };

  const displaySaveText = saveText || (isLoading ? "Saving..." : saveName);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {handleSubmit ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {children}
            {showFooter && (
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelClick}
                  disabled={isLoading}
                >
                  {cancelText}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {displaySaveText}
                </Button>
              </DialogFooter>
            )}
          </form>
        ) : (
          <>
            {children}
            {showFooter && (
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelClick}
                  disabled={isLoading}
                >
                  {cancelText}
                </Button>
                <Button onClick={handleClose} disabled={isLoading}>
                  {displaySaveText}
                </Button>
              </DialogFooter>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
