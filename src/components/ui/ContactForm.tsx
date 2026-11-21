"use client";
import { useReveal } from "../useReveal";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { availability } from "@/app/config/portfolio";
import BouncingBall from "./BouncingBall";
import GithubLogo from "@/app/images/brand-github.svg";
import LinkedinLogo from "@/app/images/brand-linkedin.svg";
import { sendContactForm } from "@/app/libs/api";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL, INSTAGRAM_URL } from "@/app/libs/data";

const initValues: {
  name: string;
  email: string;
  subject: string;
  message: string;
} = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const initialTouched: Record<keyof typeof initValues, boolean> = {
  name: false,
  email: false,
  subject: false,
  message: false,
};

const initialState = { 
  values: initValues,
  isLoading: false,
  error: ""
 };

const ContactForm = ({ showToast }: { showToast: Function }) => {
  const reveal = useReveal();
  const reduced = useReducedMotion();
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initValues, string>>>({});
  const [touched, setTouched] = useState(initialTouched);

  const { values } = state;

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = e;
    setTouched((prev) => ({ ...prev, [target.name]: true }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [target.name]: validate(target.name, target.value),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));

    if (touched[name as keyof typeof initialTouched]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validate(name, value) }));
    }
  };

  const validate = (name: string, value: string) => {
    if (!value) {
      return `${name} is required`;
    }
    return "";
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.email || !values.name || !values.subject || !values.message) {
      setErrors((prev) => ({
        ...prev,
        name: "Name is required",
        email: "Email is required",
        subject: "Subject is required",
        message: "Message is required",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await sendContactForm(values);
      setTouched(initialTouched);
      setState(initialState);
      setErrors({});
      console.log("success");
      showToast("Message sent successfully", "success");
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message,
      }));
      showToast((error as Error).message, "error");
    }
  };

  return (
    <div id="form-container" className="split">
      <div className="contact-copy">
        <motion.p {...reveal("label")} className="eyebrow">
          Contact
        </motion.p>
        <motion.h2 {...reveal("heading")}>Let’s Connect</motion.h2>
        <p>Got any Question, Project or just want to say Hi? Feel free to reach me.</p>
        <div className="availability">{availability}</div>
        <a className="text-link" href="mailto:jaydeepkhandla.work@gmail.com">
          Send me an E-mail ↗
        </a>
        <p>Want to connect on Social Media?</p>
        <div className="identity-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            <Image src={GithubLogo} alt="GitHub" width={24} height={24} />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            <Image src={LinkedinLogo} alt="LinkedIn" width={24} height={24} />
          </a>
        </div>
        <p>
          Check out my art{" "}
          <a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            account on Instagram
          </a>{" "}
          If you like to see some sketches.
        </p>
        <a className="action" href={RESUME_URL} target="_blank" rel="noreferrer">
          Resume ↗
        </a>
      </div>
      <motion.form
        {...reveal("card")}
        method="POST"
        onSubmit={onSubmit}
        className="contact-form"
        aria-busy={state.isLoading}
      >
        {(["name", "email", "subject", "message"] as const).map((field) => {
          const props = {
            id: field,
            name: field,
            value: values[field],
            onChange: handleChange,
            onBlur,
            "aria-required": true,
            "aria-invalid": Boolean(errors[field]),
            "aria-describedby": errors[field] ? field + "-error" : undefined,
          };
          return (
            <div key={field}>
              <label htmlFor={field}>{field}</label>
              {field === "message" ? (
                <textarea {...props} rows={3} placeholder="What message you want to send to me?" />
              ) : (
                <input
                  {...props}
                  type={field === "email" ? "email" : "text"}
                  autoComplete={field === "subject" ? undefined : field}
                />
              )}
              <small id={field + "-error"} aria-live="polite">
                {errors[field]}
              </small>
            </div>
          );
        })}
        <button
          className="action primary"
          type="submit"
          aria-label="Send"
          disabled={state.isLoading}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span key={state.isLoading ? "pending" : "ready"}
              initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.15 }}>
              {state.isLoading ? <BouncingBall /> : "Send"}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.form>
    </div>
  );
};

export default ContactForm;
