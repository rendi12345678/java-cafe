import { type ReactElement } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { blogs } from "@/constanst";
import BlogCard from "./BlogCard";
import { Blog } from "@/types";
export interface BlogsListProps {}

export default function BlogsList(props: BlogsListProps): ReactElement {
  const renderSlide = ({ title, imgUrl, description, id }: Blog) => (
    <CarouselItem className="pl-12 md:basis-1/2 lg:basis-1/3" key={id}>
      <BlogCard title={title} imgUrl={imgUrl} description={description} />
    </CarouselItem>
  );

  return (
    <Carousel>
      <CarouselContent className="-ml-12">
        {blogs.map(({ title, description, id, imgUrl }) => {
          return renderSlide({ title, description, id, imgUrl });
        })}
      </CarouselContent>
      <CarouselPrevious className="max-lg:hidden" />
      <CarouselNext className="max-lg:hidden" />
    </Carousel>
  );
}
