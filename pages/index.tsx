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
          content="Professional creative designer and developer specializing in brand identity, UI/UX, and web development."
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
