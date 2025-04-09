/**
 * Instagram Post Aspect Ratio: 4:5
 * Instagram Post Size: 1080 x 1350
 * Instagram Post Size (Mobile): 640 x 800
 */

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const FAKE_IMAGE = [
  "https://motorshow-uploads.s3.amazonaws.com/program/1743570494616_b12944f6-0876-4571-af4d-273915fea136.png",
  "https://motorshow-uploads.s3.amazonaws.com/program/1743570494496_9944081b-22e0-4246-8a91-3ed08a7dd9d7.png",
];

export const InstagramPost: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* post image */}
      <Carousel className="w-full">
        <CarouselContent className="-ml-0 aspect-[4/5] h-auto w-full">
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
      </Carousel>
      {/* context */}
      <div className="flex flex-col"></div>
    </div>
  );
};
