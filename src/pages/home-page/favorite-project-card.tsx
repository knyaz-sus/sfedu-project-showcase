import { Link } from "react-router";

interface FavoriteProjectCardProps {
  title: string;
  description: string;
  index: number;
  imageUrl?: string;
}

export function FavoriteProjectCard({
  title,
  description,
  index,
  imageUrl,
}: FavoriteProjectCardProps) {
  return (
    <Link
      to="/"
      className="flex flex-col-reverse overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8"
    >
      <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6 line-clamp-4">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-4">{description}</p>
      </div>
      <div>
        <img
          src={imageUrl || "/img/placeholder.svg"}
          alt={`Лучший проект ${index}`}
          className="aspect-[16/9] h-full w-full object-cover object-center"
        />
      </div>
    </Link>
  );
}
