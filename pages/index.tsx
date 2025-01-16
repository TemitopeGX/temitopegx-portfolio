"use client";
import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
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
        <About />
        <Testimonials />
        <Contact />
      </main>
    </Layout>
  );
}
