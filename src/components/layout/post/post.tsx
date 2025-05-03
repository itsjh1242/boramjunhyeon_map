/**
 * Instagram Post Aspect Ratio: 4:5
 * Instagram Post Size: 1080 x 1350
 * Instagram Post Size (Mobile): 640 x 800
 */

import { PostModel } from "@/api/model/postModel";
import { formatKoreanDate } from "@/hook/date/\bformat";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import { Dropdown } from "./dropdonw";

interface InstagramPostProps {
  post: PostModel;
}
export const InstagramPost: React.FC<InstagramPostProps> = ({ post }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!api) return;

    setTotal(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col">
      {/* head */}
      <div className="flex justify-between">
        <div className="flex flex-col p-2">
          <p className="break-keep text-sm font-bold">{post.location}</p>
          <p className="break-keep text-xs text-gray-400">
            {post.address.address}
          </p>
        </div>
        <Dropdown post={post} />
      </div>

      {/* post image */}
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="relative -ml-0 aspect-[4/5] h-auto w-full max-w-[430px]">
          {post.images.map((image, index) => {
            return (
              <CarouselItem key={index} className="h-full w-full pl-0">
                <img
                  src={image.url}
                  alt={`${image.id}-${index}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/50 px-2 py-1 text-xs text-white">
          <p>{`${current} / ${total}`}</p>
        </div>
      </Carousel>

      {/* context */}
      <div className="flex flex-col gap-2 p-2 text-xs">
        <p className="text-gray-400">{formatKoreanDate(post.date)}</p>
        <p className="break-keep">{post.description}</p>
      </div>
    </div>
  );
};
