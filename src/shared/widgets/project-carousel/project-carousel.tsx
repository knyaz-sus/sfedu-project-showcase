import "./project-carousel.css";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/shared/lib/cn";
import { DotButton } from "./project-carousel-dot-buttons";
import { NextButton, PrevButton } from "./project-carousel-next-buttons";
import { useDotButton, usePrevNextButtons } from "./hooks";

type ProjectCarouselProps = {
  images: File[] | null;
  className?: string;
  children?: React.ReactNode;
  showControls: boolean;
};

export function ProjectCarousel(props: ProjectCarouselProps) {
  const { images, children, className, showControls } = props;
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
          {images?.map((image, index) => (
            <div className="embla__slide" key={image.name + index}>
              <img
                className={cn("embla__slide__img", {
                  "border-4 border-primary": index === 0,
                })}
                src={URL.createObjectURL(image)}
                alt={`Загруженное изображение ${index + 1}`}
              />
              {index === 0 && (
                <span className="text-center text-muted-foreground block">
                  Главное изображение проекта
                </span>
              )}
            </div>
          ))}
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
