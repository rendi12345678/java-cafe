"use client";

import { type ReactElement } from "react";
import Image from "next/legacy/image";
import { Button } from "@/components/ui/button";
import useAppContext from "@/hooks/useAppContext";

export default function Hero(): ReactElement {
       const { pushRoute: moveRoute } = useAppContext();

  return (
    <section id="hero">
      <div className="container grid min-h-svh content-center lg:grid-cols-hero gap-6 lg:gap-20">
        <div className="justify-self-center max-[600px]:w-[0] max-[600px]:h-[0] lg:justify-self-end lg:order-2 w-[320px] h-[320px] lg:w-[350px] lg:h-[350px] xl:h-[550px] xl:w-[550px] relative">
          <Image
            src="/images/optimized-coffee-hd.png"
            alt="Coffee"
            priority
            layout="fill"
            loading="eager"
            sizes="(max-width: 380px) 250px, (max-width: 640px) 320px, (max-width: 1024px) 350px, 550px"
          />
        </div>
        <div className="lg:order-1 grid content-center justify-items-start">
          <h1>
            Keep your dreams <br /> alive with a cup <br /> of coffee
          </h1>
          <p className="max-w-[65ch]">
            Experience inspiration and our finest brew at Java Cafe. Fuel your
            journey with the warmth, aroma, and taste that keep your dreams
            alive.
          </p>
          <Button
            size="lg"
            onClick={() => moveRoute("/#about")}
            className="mt-12"
            variant="default"
          >
            Tell Me More
          </Button>
        </div>
      </div>
    </section>
  );
}
