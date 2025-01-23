import { useModalStore } from "@/hooks/use-modal-store";
import { useUpdateProfileMutation } from "@/hooks/use-update-profile-mutation";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { updateProfileSchema, UpdateProfileValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { toast } from "sonner";
import Avatar from "../avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ImageCropModal from "./image-crop-modal";
import { CircularProgressBar } from "../circular-progress-bar";

export default function EditProfileModal() {
  const { onClose, isOpen, data, type } = useModalStore();
  const { mutate, isPending } = useUpdateProfileMutation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  function handleOpenChange() {
    if ((!isOpen && type === "editProfile") || !isPending) {
      onClose();
    }
  }

  const { user } = data;

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      image: "",
      coverPhoto: "",
    },
  });

  const image = form.getValues("image");
  const coverPhoto = form.getValues("coverPhoto");

  const onSubmit = (values: UpdateProfileValues) => {
    mutate(values);
  };

  useEffect(() => {
    if (data.user) {
      const { name, username, bio, image, coverPhoto } = data.user;
      form.reset({
        name,
        username,
        bio: bio || undefined,
        image: image || undefined,
        coverPhoto: coverPhoto || undefined,
      });
    }
  }, [data.user, form, isOpen]);

  form.watch("image");
  form.watch("coverPhoto");

  if (!user) return;

  return (
    <Dialog
      open={isOpen && type === "editProfile"}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="gap-0 overflow-y-auto p-0">
        <DialogHeader className="py-4 pl-4">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="thin-scrollbar max-h-[80vh] overflow-y-auto">
          <div className="relative">
            <CoverPhoto
              onUploadComplete={setIsUploadingImage}
              src={coverPhoto}
              onChange={(value) => form.setValue("coverPhoto", value)}
            />
            <AvatarInput
              onUploadComplete={setIsUploadingImage}
              image={image}
              onChange={(value) => form.setValue("image", value)}
            />
          </div>
          <Form {...form}>
            <form
              className="mt-28 flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6 px-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          label="Enter your full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          label="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          label="Write a bio"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sticky bottom-[1px] flex justify-end bg-background px-5 py-2">
                <Button
                  disabled={isPending || isUploadingImage}
                  className="rounded-full"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AvatarInputProps {
  image?: string;
  onChange: (image?: string) => void;
  onUploadComplete: (isUploading: boolean) => void;
}

const AvatarInput = ({
  image,
  onChange,
  onUploadComplete,
}: AvatarInputProps) => {
  const [uploadProgress, setUploadProgress] = useState<number>();
  const { startUpload } = useUploadThing("singlePhoto", {
    onUploadProgress: setUploadProgress,
  });
  const [isPending, startTransition] = useTransition();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageToCrop, setImageToCrop] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | undefined>(image);

  const handleUpload = (file: File) => {
    onUploadComplete(true);
    setPreviewImage(URL.createObjectURL(file));
    startTransition(async () => {
      try {
        const res = await startUpload([file]);
        const uploadedImage = res?.[0].serverData.imageUrl;

        if (uploadedImage) {
          onChange(uploadedImage);
          onUploadComplete(false);
          setUploadProgress(undefined);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error while uploading the image. Please try again.");
      }
    });
  };

  const handleSelectImage = (image: File | undefined) => {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (value) => setImageToCrop(value as File),
      "file",
    );
  };

  return (
    <div className={cn("absolute ml-4", isPending && "opacity-70")}>
      <input
        ref={imageInputRef}
        className="sr-only"
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleSelectImage(e.target.files?.[0]);
          if (imageInputRef.current) {
            imageInputRef.current.value = "";
          }
        }}
      />
      <Avatar
        src={previewImage}
        className="size-40 -translate-y-1/2 border-[5px]"
      />
      {!!uploadProgress && (
        <CircularProgressBar
          value={uploadProgress}
          strokeWidth={4}
          className="z-50 -translate-y-full"
        />
      )}
      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 gap-1">
        <Button
          onClick={() => imageInputRef.current?.click()}
          variant="ghost"
          disabled={isPending}
          size="icon"
          className="bg-neutral-900/40"
        >
          <CameraIcon />
        </Button>
        {image && (
          <Button
            onClick={() => {
              onChange(undefined);
              setPreviewImage(undefined);
            }}
            variant="ghost"
            disabled={isPending}
            size="icon"
            className="bg-neutral-900/40"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      {imageToCrop && (
        <ImageCropModal
          onCrop={handleUpload}
          onClose={() => {
            setImageToCrop(undefined);
          }}
          src={URL.createObjectURL(imageToCrop)}
        />
      )}
    </div>
  );
};

export const CoverPhoto = ({
  src,
  onChange,
  onUploadComplete,
}: {
  src?: string;
  onChange: (src?: string) => void;
  onUploadComplete: (isUploading: boolean) => void;
}) => {
  const { startUpload } = useUploadThing("singlePhoto");
  const [isPending, startTransition] = useTransition();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageToCrop, setImageToCrop] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | undefined>(src);

  const handleSelectImage = (image: File | undefined) => {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (value) => setImageToCrop(value as File),
      "file",
    );
  };

  const handleUpload = (file: File) => {
    onUploadComplete(true);
    setPreviewImage(URL.createObjectURL(file));
    startTransition(async () => {
      try {
        const res = await startUpload([file]);
        const uploadedImage = res?.[0].serverData.imageUrl;

        if (uploadedImage) {
          onChange(uploadedImage);
          onUploadComplete(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error while uploading the image. Please try again.");
      }
    });
  };

  return (
    <div className="relative flex h-44 items-center justify-center bg-accent">
      <input
        ref={imageInputRef}
        className="sr-only"
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleSelectImage(e.target.files?.[0]);
          if (imageInputRef.current) {
            imageInputRef.current.value = "";
          }
        }}
      />
      <div className="relative z-10 flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="relative z-10 bg-neutral-900/40"
          disabled={isPending}
          onClick={() => imageInputRef.current?.click()}
        >
          <ImagePlus className="size-4" />
        </Button>
        {src && (
          <Button
            className="bg-neutral-900/40"
            size="icon"
            variant="ghost"
            disabled={isPending}
            onClick={() => {
              onChange(undefined);
              setPreviewImage(undefined);
            }}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      {imageToCrop && (
        <ImageCropModal
          onClose={() => setImageToCrop(undefined)}
          onCrop={handleUpload}
          src={URL.createObjectURL(imageToCrop)}
          aspectRatio={2.5}
        />
      )}
      {previewImage && (
        <Image
          src={previewImage}
          alt="Cover photo"
          fill
          className="object-cover"
        />
      )}
    </div>
  );
};
