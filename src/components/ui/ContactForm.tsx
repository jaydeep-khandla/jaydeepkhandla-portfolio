"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BouncingBall from "./BouncingBall";
import GithubLogo from "@/app/images/brand-github.svg";
import LinkedinLogo from "@/app/images/brand-linkedin.svg";
import InstagramLogo from "@/app/images/brand-instagram.svg";
import DownloadLogo from "@/app/images/download.svg";
import { sendContactForm } from "@/app/libs/api";
import { fadeIn, scaleUp } from "@/utils/variants";
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
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initValues, string>>>({});
  const [touched, setTouched] = useState(initialTouched);

  const { values } = state;

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = e;
    setTouched((prev) => ({ ...prev, [target.name]: true }));
    setErrors((prevErrors) => ({ ...prevErrors, [target.name]: validate(target.name, target.value) }));
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
    }))

    try {
      await sendContactForm(values);
      setTouched(initialTouched);
      setState(initialState)
      setErrors({})
      console.log("success");
      showToast("Message sent successfully", "success");
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        error: (error as Error).message,
      }))
      showToast("Message sent successfully", "success");
    }
  }

  return (
    <div id="form-container" className="">
      <div className="overflow-hidden">
        <motion.h3 initial="hidden" whileInView={"visible"} variants={scaleUp()} viewport={{once:false, amount:0.1}} className="text-left text-6xl pb-5 font-anton lg:text-8xl lg:w-[70rem]">
          Let{"'"}s Connect
        </motion.h3>
      </div>
      <div className="mx-auto grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-2 gap-20 !px-0 !m-0 py-5">
        <motion.form initial="hidden" whileInView={"visible"} variants={scaleUp(0.3)} viewport={{once:false, amount:0.1}} method="POST" action="" onSubmit={onSubmit}>
          <div className="mx-auto rounded-xl border-2 border-white backdrop-blur-3xl px-10 py-8 w-full">
            <div className="grid grid-cols-1  gap-6 label">
              <label htmlFor="name" className="block">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={values.name}
                  placeholder={errors.name ? errors.name : "Name"}
                  onChange={handleChange}
                  onBlur={onBlur}
                  className={`bg-transparent w-full border-2 ${ errors.name ? 'border-red-300 placeholder-red-300' : 'border-white'} mr-3 py-3 px-2 leading-tight focus:outline-none font-fira text-base`}
                />
              </label>

              <label htmlFor="email" className="block">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder={errors.email ? errors.email : "Email"}
                  onChange={handleChange}
                  onBlur={onBlur}
                  pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"
                  className={`appearance-none bg-transparent w-full border-2 ${ errors.email ? 'border-red-300 placeholder-red-300' : 'border-white'} mr-3 py-3 px-2 leading-tight focus:outline-none font-fira text-base`}
                />
              </label>

              <label htmlFor="subject" className="block">
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={values.subject}
                  placeholder={errors.subject ? errors.subject : "Subject"}
                  onChange={handleChange}
                  onBlur={onBlur}
                  className={`bg-transparent w-full border-2 ${ errors.subject ? 'border-red-300 placeholder-red-300' : 'border-white'} mr-3 py-3 px-2 leading-tight focus:outline-none font-fira text-base`}
                />
              </label>

              <label className="block">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  placeholder={errors.message ? "You haven't write any message yet" : "What message you want to send to me?"}
                  onChange={handleChange}
                  onBlur={onBlur}
                  className={`bg-transparent w-full border-2 ${ errors.message ? 'border-red-300 placeholder-red-300' : 'border-white'} rounded-md mr-3 py-3 px-2 leading-tight resize-none focus:outline-none font-fira text-base`}
                ></textarea>
              </label>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="flex items-center w-full justify-center gap-2 px-2 py-3 text-base font-fira bg-transparent border-2 border-white"
                  // disabled={!values.email || !values.name || !values.subject || !values.message}
                >
                  {state?.isLoading ? <BouncingBall /> : "Send"}
                  
                </motion.button>
              </div>
            </div>
          </div>
        </motion.form>

        {/* --------------------------------------------
          Right Side
        ----------------------------------------- */}

        <motion.div initial="hidden" whileInView={"visible"} variants={scaleUp(0.6)} viewport={{once:false, amount:0.1}} className="flex flex-col text-left text-2xl font-fira">
          <h3>
            Got any Question, Project or just want to say Hi? Feel free to reach
            me.
          </h3>
          <a
            href="mailto:jaydeepkhandla.work@gmail.com"
            className="w-fit my-3 border-white border-b-2 font-mono tracking-tight"
          >
            Send me an E-mail
          </a>
          <h3>
            Want to connect on Social Media?
          </h3>
          <div className="flex gap-8 w-fit my-3">
            <a href={GITHUB_URL} target="_blank">
              <Image src={GithubLogo} alt="GH" width={45} height={45} />
            </a>
            <a href={LINKEDIN_URL} target="_blank">
              <Image src={LinkedinLogo} alt="GH" width={45} height={45} />
            </a>
            {/* <motion.a href="" initial="hidden" animate="visible">
              <Image src={InstagramLogo} alt="GH" width={45} height={45} />
            </motion.a> */}
          </div>
          <h3>
            Check out my art{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              className="border-white border-b-2 font-mono tracking-tighter"
            >
              account on Instagram
            </a>{" "}
            If you like to see some sketches.
          </h3>
          <motion.button
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1 }}
            className=" w-fit flex items-center justify-center gap-2 my-3 px-3 py-2 text-lg font-fira bg-transparent border-2 border-white"
          >
            <a
              href={RESUME_URL}
              target="_blank"
            >
              Resume
            </a>
            <Image src={DownloadLogo} alt="Download" width={20} height={20} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
