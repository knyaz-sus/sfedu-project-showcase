import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

export function ScreenshotsCarousel({
  screenshots,
}: {
  screenshots?: string[] | null;
}) {
  console.log(screenshots);
  return (
    <Carousel className="max-w-none md:max-w-lg mb-4">
      <CarouselContent>
        <CarouselItem>
          <div className="rounded-xl border border-border bg-card text-card-foreground shadow">
            <div className="flex rounded-xl aspect-video items-center justify-center">
              <img
                className="rounded-xl w-full aspect-video object-cover object-center"
                src="/img/img5.png"
                alt="Материалы проекта"
              />
            </div>
          </div>
        </CarouselItem>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <CarouselItem key={i}>
              <div>
                <div className="flex rounded-xl aspect-video items-center justify-center">
                  <img
                    className="rounded-xl w-full aspect-video object-cover object-center"
                    src="https://placehold.co/600x400/dc2626/white"
                    alt="Материалы проекта"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
