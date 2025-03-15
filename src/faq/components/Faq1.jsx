"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Find answers to your most common questions about reserving study
            rooms at our library.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do I reserve?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              To reserve a study room, visit our booking page. Select your
              desired date and time, then fill out the form. Once submitted,
              you'll receive a confirmation email.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              What if I need to cancel?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              You can cancel your reservation by following the link in your
              confirmation email. Alternatively, visit the booking page and
              select 'Cancel Booking.' Please note our cancellation policy for
              any fees.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              Can I modify my booking?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, you can modify your booking through the confirmation email
              link. Simply select 'Modify Booking' and adjust your details.
              Ensure to save your changes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What are the hours?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our library is open from 8 AM to 10 PM, Monday through Friday.
              Weekend hours may vary, so please check our website for updates.
              Reservations can be made during all open hours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              Who can reserve rooms?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Any registered library patron can reserve a study room. This
              includes students, faculty, and community members. Ensure you have
              a valid library account to proceed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">
            We're here to help you with any inquiries.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
