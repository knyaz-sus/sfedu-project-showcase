import { Card, CardContent } from "@/components/Card/Card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/Carousel";

export function ScreenshotsCarousel({
  screenshots,
}: {
  screenshots?: string[];
}) {
  console.log(screenshots);
  return (
    <Carousel className="max-w-none md:max-w-lg mb-4">
      <CarouselContent>
        {Array(3)
          .fill(0)
          .map(() => (
            <CarouselItem>
              <Card>
                <CardContent className="flex rounded-xl aspect-video items-center justify-center">
                  <img
                    className="rounded-xl w-full aspect-video object-cover object-center"
                    src="https://cataas.com/cat"
                    alt="Материалы проекта"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
