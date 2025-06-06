export function UrlSlide({ url, index }: { url: string; index: number }) {
  return (
    <div className="embla__slide" key={`${url}-${index}`}>
      <div className="relative inline-block group rounded-[0.5rem] overflow-hidden">
        <img
          className="embla__slide__img"
          src={url}
          alt={`Изображение проекта ${index + 1}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/img/placeholder.svg";
          }}
        />
      </div>
    </div>
  );
}
