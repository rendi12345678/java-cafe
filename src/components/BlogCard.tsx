import { Blog } from "@/types";
import Image from "next/legacy/image";
import { memo, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function BlogCard({
  title,
  description,
  imgUrl,
}: Omit<Blog, "id">): ReactElement {
  return (
    <Card className="bg-transparent space-y-6 shadow-none rounded-lg overflow-hidden">
      <CardHeader className="relative aspect-video">
        <Image
          src={imgUrl}
          alt="Blog"
          objectFit="cover"
          loading="eager"
          layout="fill"
        />
      </CardHeader>
      <CardContent className="p-0">
        <CardTitle>{title}</CardTitle>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

export default memo(BlogCard);
