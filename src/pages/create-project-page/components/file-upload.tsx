import { PlusCircleIcon } from "lucide-react";

export function FileUpload({
  images,
  updateImages,
}: {
  images: File[] | null;
  updateImages: (image: File[] | null) => void;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) updateImages(files);
  };

  return (
    <>
      {images?.map((image) => (
        <div className="embla__slide">
          <img
            src={URL.createObjectURL(image)}
            alt="Предпросмотр"
            className="embla__slide__img"
          />
        </div>
      ))}
      <button className="embla__slide">
        <label className="embla__slide__img flex justify-center items-center h-full bg-accent">
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <PlusCircleIcon />
        </label>
      </button>
    </>
  );
}
