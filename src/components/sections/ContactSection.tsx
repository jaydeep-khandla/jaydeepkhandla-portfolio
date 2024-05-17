import React from "react";
import ContactForm from "../ui/ContactForm";

export default function ContactSection({ showToast, removeToast }: { showToast: Function; removeToast: Function}) {
  return (
    <section id="contact" className="h-fit w-full flex px-8 py-10 mt-10 flex-col gap-5 lg:px-16 xl:px-40 ">
        <ContactForm showToast={showToast} />
    </section>
  );
}
