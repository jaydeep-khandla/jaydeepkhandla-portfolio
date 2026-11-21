import React from "react";
import ContactForm from "../ui/ContactForm";

export default function ContactSection({ showToast, removeToast }: { showToast: Function; removeToast: Function}) {
  return (
    <section id="contact" className="section">
        <ContactForm showToast={showToast} />
    </section>
  );
}
