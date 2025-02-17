"use client";
import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import TechStack from "../components/TechStack";
import WorkProcess from "../components/WorkProcess";
import Stats from "../components/Stats";
import Contact from "../components/Contact";

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
        <Hero />
        <Services />
        <TechStack />
        <WorkProcess />
        <Stats />
        <Contact />
      </main>
    </Layout>
  );
}
