"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import { BiStar, BiSolidStar, BiSolidStarHalf } from "react-icons/bi";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";

const Star = ({rating}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const isFullStar = i < fullStars;
        const isHalfStar = hasHalfStar && i === fullStars;

        return (
          <div key={i}>
            {isFullStar ? (
              <BiSolidStar />
            ) : isHalfStar ? (
              <BiSolidStarHalf />
            ) : (
              <BiStar />
            )}
          </div>
        );
      })}
    </div>
  );
};

const useCarousel = () => {
  const [mainApi, setMainApi] = useState();
  const [thumbApi, setThumbApi] = useState();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!mainApi || !thumbApi) {
      return;
    }
    mainApi.on("select", () => {
      const index = mainApi.selectedScrollSnap();
      setCurrent(index);
      thumbApi.scrollTo(index);
    });
  }, [mainApi, thumbApi]);
  const handleClick = (index) => () => {
    return mainApi?.scrollTo(index);
  };
  const getThumbStyles = (index) => {
    return clsx("block", current === index && "opacity-60");
  };
  return {
    setMainApi,
    setThumbApi,
    handleClick,
    getThumbStyles,
  };
};

export function ProductHeader1() {
  const useActive = useCarousel();
  return (
    <header id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <Breadcrumb className="mb-6 flex flex-wrap items-center text-sm">
          <BreadcrumbList>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Explore Options</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Room</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Book Room</BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 gap-y-8 md:gap-y-10 lg:grid-cols-[1.25fr_1fr] lg:gap-x-20">
          <div className="grid grid-cols-1 md:grid-cols-[5rem_1fr] md:gap-x-4">
            <div className="relative hidden h-full md:block">
              <div className="absolute bottom-0 top-0 max-h-full overflow-y-auto">
                <Carousel
                  setApi={useActive.setThumbApi}
                  orientation="vertical"
                  opts={{
                    align: "start",
                    containScroll: "keepSnaps",
                    dragFree: true,
                  }}
                  className="m-0"
                >
                  <CarouselContent className="m-0 gap-y-4">
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(0)}
                        className={useActive.getThumbStyles(0)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 1"
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(1)}
                        className={useActive.getThumbStyles(1)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 2"
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(2)}
                        className={useActive.getThumbStyles(2)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 3"
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(3)}
                        className={useActive.getThumbStyles(3)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 4"
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
            <div className="overflow-hidden">
              <Carousel
                setApi={useActive.setMainApi}
                opts={{ loop: true, align: "start" }}
                className="m-0"
              >
                <CarouselContent className="m-0">
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 1"
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 2"
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 3"
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 4"
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <div>
            <h1 className="mb-2 text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
              Book Room
            </h1>
            <p className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">$0</p>
            <div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
              <Star rating={3.5} />
              <p className="text-sm">(4.8 stars) • 25 reviews</p>
            </div>
            <p className="mb-5 md:mb-6">
              Reserve a quiet study room for your needs. Choose your preferred
              date and time to ensure a productive environment.
            </p>
            <form className="mb-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col">
                  <Label className="mb-2">Date</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-choice">Option One</SelectItem>
                      <SelectItem value="second-choice">Option Two</SelectItem>
                      <SelectItem value="third-choice">Option Three</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label className="mb-2">Date</Label>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-4 py-2"
                    >
                      Morning Slot
                    </a>
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-4 py-2"
                    >
                      Afternoon Slot
                    </a>
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-4 py-2 pointer-events-none opacity-25"
                    >
                      Evening Slot
                    </a>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="quantity" className="mb-2">
                    Number
                  </Label>
                  <Input
                    type="number"
                    id="quantity"
                    placeholder="1"
                    className="w-16"
                  />
                </div>
              </div>
              <div className="mb-4 mt-8 flex flex-col gap-y-4">
                <Button title="Submit Reservation">Submit Reservation</Button>
                <Button title="Clear Form" variant="secondary">
                  Clear Form
                </Button>
              </div>
              <p className="text-center text-xs">No fees for reservations</p>
            </form>
            <Accordion type="multiple">
              <AccordionItem value="item-0">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Instructions
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  If you need to modify or cancel your reservation, please
                  follow the provided links. We aim to make your experience as
                  seamless as possible. Don't hesitate to contact us for further
                  assistance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Contact
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  If you need to modify or cancel your reservation, please
                  follow the provided links. We aim to make your experience as
                  seamless as possible. Don't hesitate to contact us for further
                  assistance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Help
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  If you need to modify or cancel your reservation, please
                  follow the provided links. We aim to make your experience as
                  seamless as possible. Don't hesitate to contact us for further
                  assistance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </header>
  );
}
