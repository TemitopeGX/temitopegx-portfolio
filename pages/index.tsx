"use client";
import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import TechStack from "../components/TechStack";
import WorkProcess from "../components/WorkProcess";
import Stats from "../components/Stats";
import Contact from "../components/Contact";
import { motion } from "framer-motion";
import ScrollAnimation from "@/components/ScrollAnimation";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faPalette,
  faCode,
  faMobileScreen,
  faLaptopCode,
  faGlobe,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Service {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: 1,
    icon: faPalette,
    title: "Brand Identity",
    description:
      "Create unique and memorable brand identities that resonate with your audience",
  },
  {
    id: 2,
    icon: faCode,
    title: "Web Development",
    description: "Build modern, responsive websites and web applications",
  },
  {
    id: 3,
    icon: faMobileScreen,
    title: "UI/UX Design",
    description:
      "Design intuitive and engaging user interfaces and experiences",
  },
  {
    id: 4,
    icon: faLaptopCode,
    title: "Frontend Dev",
    description: "Develop responsive and interactive web interfaces",
  },
  {
    id: 5,
    icon: faGlobe,
    title: "Digital Marketing",
    description: "Implement effective digital marketing strategies",
  },
  {
    id: 6,
    icon: faRocket,
    title: "Product Launch",
    description: "Launch and scale your digital products successfully",
  },
];

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>TemitopeGX - Creative Designer & Developer</title>
        <meta
          name="description"
          content="Expert creative designer and full-stack developer specializing in brand identity, UI/UX design, web development, and digital solutions."
        />
      </Head>

      <main>
        <ScrollAnimation>
          <Hero />
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <Services />
        </ScrollAnimation>

        <ScrollAnimation delay={0.3}>
          <TechStack />
        </ScrollAnimation>

        <ScrollAnimation delay={0.4}>
          <WorkProcess />
        </ScrollAnimation>

        <ScrollAnimation delay={0.5}>
          <Stats />
        </ScrollAnimation>

        <ScrollAnimation delay={0.6}>
          <Contact />
        </ScrollAnimation>
      </main>
    </Layout>
  );
}
