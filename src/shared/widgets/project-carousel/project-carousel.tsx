import "./project-carousel.css";
import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton } from "./project-carousel-dot-buttons";
import { NextButton, PrevButton } from "./project-carousel-next-buttons";
import { useDotButton, usePrevNextButtons } from "./hooks";
import { cn } from "@/shared/lib/cn";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  children?: ReactNode;
  className?: string;
};

export const ProjectCarousel: React.FC<PropType> = (props) => {
  const { slides, options, children, className } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

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
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <img className="embla__slide__img" src="/img/bro.png" />
            </div>
          ))}
          {children}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
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
    </section>
  );
};
