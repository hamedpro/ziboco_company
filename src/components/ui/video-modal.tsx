"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VideoModalProps {
  videoUrl: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

export function VideoModal({ videoUrl, isOpen, onOpenChange, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsInitialLoading(true);
      setHasError(false);
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  // Event handlers
  const handleCanPlay = () => {
    setIsInitialLoading(false);
  };

  const handleError = () => {
    setIsInitialLoading(false);
    setHasError(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[800px] bg-black p-0 border-0 rounded-[16px] overflow-hidden"
        onInteractOutside={(e) => {
          // Prevent the dialog from closing when interacting with the video
          if (e.target instanceof HTMLVideoElement) {
            e.preventDefault();
          }
        }}
      >
        <div className="relative">
          <DialogClose className="absolute top-2 right-2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-black/50 border-0 text-white hover:bg-black/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
          
          {/* Video Container */}
          <div className="w-full aspect-video bg-black">
            {/* Loading Indicator - only shown during initial loading */}
            {isInitialLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                  <p className="text-white text-sm font-medium">در حال آماده‌سازی ویدیو...</p>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10 p-4">
                <div className="bg-black/80 rounded-lg p-4 text-center max-w-sm">
                  <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                  <h3 className="text-white font-medium mb-1">خطا در پخش ویدیو</h3>
                  <p className="text-white/70 text-sm">
                    متأسفانه در بارگذاری ویدیو مشکلی پیش آمده است. لطفا بعداً دوباره تلاش کنید.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-white/20 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => onOpenChange(false)}
                  >
                    بستن
                  </Button>
                </div>
              </div>
            )}
            
            {/* Video Element - visible but with loading overlay until canplay */}
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videoUrl}
              controls
              autoPlay
              playsInline
              onCanPlay={handleCanPlay}
              onError={handleError}
            >
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 