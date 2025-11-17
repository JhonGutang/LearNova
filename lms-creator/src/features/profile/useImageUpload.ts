import { useRef, useState, MutableRefObject } from "react";

const DEFAULT_PROFILE_IMAGE_URL =
  "https://ui-avatars.com/api/?name=John+Doe&background=random";

type UseImageUploadResult = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  fileError: string | null;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  handleImageClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useImageUpload(
  defaultUrl: string = DEFAULT_PROFILE_IMAGE_URL
): UseImageUploadResult {
  const [imageUrl, setImageUrl] = useState<string>(defaultUrl);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Simple validation: allow image files only & max size 5MB
      if (!file.type.startsWith("image/")) {
        setFileError("Please select an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size too large (max 5MB).");
        return;
      }
      setFileError(null);
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        if (readerEvent.target && typeof readerEvent.target.result === "string") {
          setImageUrl(readerEvent.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    imageUrl,
    setImageUrl,
    fileError,
    fileInputRef,
    handleImageClick,
    handleFileChange,
  };
}
