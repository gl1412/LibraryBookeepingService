"use client";

import { Button, Checkbox, Input, Label, Textarea } from "@relume_io/relume-ui";
import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export function Contact5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:grid-flow-col lg:gap-x-20 lg:gap-y-16">
          <div>
            <div className="mb-6 md:mb-8">
              <p className="mb-3 font-semibold md:mb-4">Support</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Get Help
              </h2>
              <p className="md:text-md">
                We're here to assist you with any inquiries.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 py-2">
              <div className="flex items-center gap-4">
                <BiEnvelope className="size-6 flex-none" />
                <p>support@library.com</p>
              </div>
              <div className="flex items-center gap-4">
                <BiPhone className="size-6 flex-none" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-4">
                <BiMap className="size-6 flex-none" />
                <p>456 Library Lane, Cityville, CA 90210, USA</p>
              </div>
            </div>
          </div>
          <form className="grid grid-cols-1 grid-rows-[auto_auto] gap-6">
            <div className="grid w-full items-center">
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input type="text" id="name" />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input type="email" id="email" />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="message" className="mb-2">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Enter your message..."
                className="min-h-[11.25rem] overflow-auto"
              />
            </div>
            <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="cursor-pointer">
                I agree to the Terms
              </Label>
            </div>
            <div>
              <Button title="Send">Send</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
