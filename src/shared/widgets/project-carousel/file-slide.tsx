import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { Star, Trash } from "lucide-react";

interface FileSlideProps {
  file: File;
  index: number;
  onDeleteImage: (index: number) => void;
  onSetMainImage: (index: number) => void;
}

export function FileSlide({
  file,
  index,
  onDeleteImage,
  onSetMainImage,
}: FileSlideProps) {
  const src = URL.createObjectURL(file);
  const isMobile = useIsMobile();
  const isMain = index === 0;
  return (
    <div className="embla__slide" key={`${file.name}-${index}`}>
      <div className="relative inline-block group rounded-[0.5rem] overflow-hidden">
        <img
          className={cn("embla__slide__img", {
            "border-4 border-primary": isMain,
          })}
          src={src}
          alt={`Изображение проекта ${index + 1}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/img/placeholder.svg";
          }}
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            {
              "opacity-100": isMobile,
              "group-hover:opacity-100": !isMobile,
            }
          )}
        />
        <div
          className={cn(
            "absolute inset-0 flex justify-center items-center gap-2 z-10 invisible group-hover:visible",
            {
              visible: isMobile,
            }
          )}
        >
          <Button
            size="icon"
            variant="secondary"
            disabled={isMain}
            onClick={() => onSetMainImage(index)}
          >
            <Star />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onDeleteImage(index)}
          >
            <Trash />
          </Button>
        </div>
      </div>

      {isMain && (
        <span className="text-center text-muted-foreground">
          Главное изображение проекта
        </span>
      )}
    </div>
  );
}
