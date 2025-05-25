import { useState, useEffect } from "react";

export const ImageWithPlaceholder = ({
  mainScreenshot,
}: {
  mainScreenshot: string | null;
}) => {
  const [currentSrc, setCurrentSrc] = useState("/img/placeholder.svg");
  const [altText, setAltText] = useState("");

  useEffect(() => {
    if (!mainScreenshot) return;

    const img = new Image();
    img.src = mainScreenshot;

    img.onload = () => {
      setCurrentSrc(mainScreenshot);
      setAltText("Изображение проекта");
    };

    img.onerror = () => {
      setCurrentSrc("/img/placeholder.svg");
      setAltText("");
    };
  }, [mainScreenshot]);

  return (
    <img
      className="w-full aspect-video object-cover object-center"
      src={currentSrc}
      alt={altText}
    />
  );
};
