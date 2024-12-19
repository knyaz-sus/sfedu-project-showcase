import { CardContent } from "@/components/Card/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Carousel";

export function ScreenshotsCarousel({
  screenshots,
}: {
  screenshots?: string[];
}) {
  console.log(screenshots);
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {screenshots?.map((screenshot) => (
          <CarouselItem key={screenshot}>
            <div className="p-1">
              <div>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img src={screenshot} alt="Материалы проекта" />
                </CardContent>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
