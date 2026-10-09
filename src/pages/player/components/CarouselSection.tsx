import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { BANNERS } from "@/constant/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const CarouselSection = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {BANNERS.map((banner, idx) => (
          <CarouselItem key={idx}>
            <Card className="border-0 shadow-none rounded-full py-0">
              <CardContent className="p-0 rounded-full">
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className="w-full object-cover rounded-2xl"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselSection;
