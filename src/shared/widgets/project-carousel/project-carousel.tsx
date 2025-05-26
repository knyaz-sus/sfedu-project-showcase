import "./project-carousel.css";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/shared/lib/cn";
import { DotButton } from "./project-carousel-dot-buttons";
import { NextButton, PrevButton } from "./project-carousel-next-buttons";
import { useDotButton, usePrevNextButtons } from "./hooks";

type ProjectCarouselProps =
  | {
      images: File[] | null;
      imagesType: "file";
      className?: string;
      children?: React.ReactNode;
      showControls: boolean;
    }
  | {
      images: string[] | null;
      imagesType: "url";
      className?: string;
      children?: React.ReactNode;
      showControls: boolean;
    };

export function ProjectCarousel(props: ProjectCarouselProps) {
  const { images, imagesType, children, className, showControls } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={cn("embla", className)}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {children}
          {images?.map((image, index) => {
            const src =
              imagesType === "file" && image instanceof File
                ? URL.createObjectURL(image)
                : typeof image === "string"
                ? image
                : "";

            const key =
              imagesType === "file" && image instanceof File
                ? image.name
                : image;

            return (
              <div className="embla__slide" key={`${key}-${index}`}>
                <img
                  className={cn("embla__slide__img", {
                    "border-4 border-primary":
                      index === 0 && imagesType === "file",
                  })}
                  src={src}
                  alt={`Изображение проекта ${index + 1}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/img/placeholder.svg";
                  }}
                />
                {index === 0 && imagesType === "file" && (
                  <span className="text-center text-muted-foreground block">
                    Главное изображение проекта
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showControls && (
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
