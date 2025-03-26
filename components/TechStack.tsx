import { motion } from "framer-motion";
import Image from "next/image";

const technologies = [
  {
    name: "Frontend",
    tools: [
      { name: "HTML", icon: "/icons/flaticon/html.png" },
      { name: "CSS", icon: "/icons/flaticon/css.png" },
      { name: "React", icon: "/icons/flaticon/react.png" },
      { name: "Next.js", icon: "/icons/flaticon/nextjs.png" },
      { name: "Tailwind", icon: "/icons/flaticon/tailwind.png" },
      { name: "Bootstrap", icon: "/icons/flaticon/bootstrap.png" },
    ],
  },
  {
    name: "Languages",
    tools: [
      { name: "JavaScript", icon: "/icons/flaticon/javascript.png" },
      { name: "TypeScript", icon: "/icons/flaticon/typescript.png" },
    ],
  },
  {
    name: "Backend",
    tools: [
      { name: "MongoDB", icon: "/icons/flaticon/mongodb.png" },
      { name: "Supabase", icon: "/icons/flaticon/supabase.png" },
      { name: "Firebase", icon: "/icons/flaticon/firebase.png" },
      { name: "SQL", icon: "/icons/flaticon/sql.png" },
    ],
  },
  {
    name: "Design",
    tools: [
      { name: "Figma", icon: "/icons/flaticon/figma.png" },
      { name: "Photoshop", icon: "/icons/flaticon/photoshop.png" },
      { name: "Illustrator", icon: "/icons/flaticon/illustrator.png" },
      { name: "Canva", icon: "/icons/flaticon/canva.png" },
    ],
  },
  {
    name: "Tools",
    tools: [
      { name: "Git", icon: "/icons/flaticon/git.png" },
      { name: "GitHub", icon: "/icons/flaticon/github.png" },
      { name: "Vercel", icon: "/icons/flaticon/vercel.png" },
      { name: "NPM", icon: "/icons/flaticon/npm.png" },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#00FF00 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF00]/20 blur-lg rounded-full" />
              <div className="relative bg-black border border-[#00FF00] rounded-full px-4 py-1.5">
                <span className="text-[#00FF00] font-mono text-sm uppercase tracking-wider">
                  Tech Stack
                </span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technologies & Tools
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            A comprehensive toolkit for building modern web applications
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="space-y-8">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="relative bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Category Name */}
                <div className="md:w-48 shrink-0">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                    {category.name}
                  </h3>
                </div>

                {/* Tools Grid */}
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {category.tools.map((tool, index) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group"
                      >
                        <div
                          className="relative bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-sm rounded-lg p-3
                                      border border-white/5 hover:border-[#00FF00]/30 transition-all duration-300"
                        >
                          {/* Icon */}
                          <div className="relative h-10 mb-2 flex items-center justify-center">
                            <div
                              className="absolute inset-0 bg-[#00FF00]/5 rounded-lg filter blur-lg 
                                          group-hover:bg-[#00FF00]/10 transition-all duration-300"
                            />
                            <Image
                              src={tool.icon}
                              alt={tool.name}
                              width={28}
                              height={28}
                              className="relative z-10 w-7 h-7 object-contain transition-all duration-300 
                                       group-hover:scale-110 group-hover:brightness-110"
                            />
                          </div>

                          {/* Name */}
                          <p
                            className="text-center text-xs text-white/70 group-hover:text-white
                                      transition-colors duration-300 truncate px-1"
                          >
                            {tool.name}
                          </p>

                          {/* Subtle Glow */}
                          <div
                            className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100
                                        transition-all duration-300 bg-[#00FF00]/5"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
