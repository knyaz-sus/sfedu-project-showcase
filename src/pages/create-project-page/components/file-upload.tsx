import { PlusCircleIcon } from "lucide-react";

export function FileUpload({
  updateImages,
}: {
  updateImages: (image: File | null) => void;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) if (files) updateImages(Array.from(files).at(-1) ?? null);
  };

  return (
    <div className="embla__slide">
      <label className="embla__slide__img flex justify-center items-center h-full bg-accent">
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <PlusCircleIcon />
      </label>
    </div>
  );
}
