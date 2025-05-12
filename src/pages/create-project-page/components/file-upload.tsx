import { PlusCircleIcon } from "lucide-react";

export default function FileUpload({
  image,
  updateImage,
}: {
  image: string | null;
  updateImage: (image: string | null) => void;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-[520px] h-[285px] rounded-md max-w-lg object-cover mt-2"
          />
        )}
        <button className="w-[520px] h-[285px] bg-gray-100 rounded-md">
          <label className="flex items-center justify-center w-full h-full">
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <PlusCircleIcon />
          </label>
        </button>
      </div>
    </div>
  );
}
