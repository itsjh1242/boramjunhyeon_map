/**
 * Instagram Post Aspect Ratio: 4:5
 * Instagram Post Size: 1080 x 1350
 * Instagram Post Size (Mobile): 640 x 800
 */

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

const FAKE_IMAGE = [
  "https://motorshow-uploads.s3.amazonaws.com/program/1743570494616_b12944f6-0876-4571-af4d-273915fea136.png",
  "https://motorshow-uploads.s3.amazonaws.com/program/1743570494496_9944081b-22e0-4246-8a91-3ed08a7dd9d7.png",
];

export const InstagramPost: React.FC = () => {
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
      {/* post image */}
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="relative -ml-0 aspect-[4/5] h-auto w-full">
          {FAKE_IMAGE.map((image, index) => {
            return (
              <CarouselItem key={index} className="h-full w-full pl-0">
                <img
                  src={image}
                  alt={`${image}-${index}`}
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
      <div className="flex flex-col gap-2 py-3 text-xs">
        <div>
          <p className="font-montserrat">대전 한밭수목원</p>
          <p>대전 한밭수목원에 다녀온 이야기</p>
        </div>
        <p className="text-gray-400">2025년 4월 10일</p>
      </div>
    </div>
  );
};
