import { useRef } from "react";
import { Button } from "../ui/button";
import "cropperjs/dist/cropper.css";
import { Cropper, ReactCropperElement } from "react-cropper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ImageCropModal({
  src,
  onCrop,
  onClose,
  aspectRatio = 1,
}: {
  src: string;
  onCrop: (file: File) => void;
  onClose: () => void;
  aspectRatio?: number
}) {
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas().toBlob((blob) => {
      if (blob === null) return;
      const fileName = `${src.split("/")[src.split('/').length - 1]}.webp`;
      const file = new File([blob], fileName, {
        type: blob.type,
      });
      onCrop(file);
      onClose();
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop Image?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <Cropper
          src={src}
          aspectRatio={aspectRatio}
          guides={false}
          zoomable={false}
          ref={cropperRef}
          className="mx-auto size-fit object-cover max-h-[70vh]"
        />
        <DialogFooter>
          <Button onClick={handleCrop}>Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
