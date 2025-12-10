 // src/pages/Blog.jsx
import React, { useState, useEffect } from "react";
import { FiShare2 } from "react-icons/fi";
import Footer from "../Pages/Footer.jsx";

export default function Blog() {
  const [activePost, setActivePost] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger nice entrance animations after mount
    setMounted(true);
  }, []);

  const topics = [
    "AI",
    "AI Agents",
    "GenAI Tools",
    "RAG",
    "Next.js",
    "React",
    "TypeScript",
    "Edge Computing",
    "Web3",
    "Blockchain",
    "DevOps",
    "Cloud Native",
    "Serverless",
    "Design Systems",
    "Performance",
  ];

  const posts = [
    {
      id: 1,
      date: "MAR 19 2025",
      title: "My 2025 Stack as a Frontend Developer",
      readTime: "4 min read",
      excerpt:
        "As a Frontend Developer in 2025, I’ve fine-tuned my development environment with tools that enhance productivity and creativity.",
      image:
        "https://images.pexels.com/photos/2082109/pexels-photo-2082109.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: [
        "In 2025, frontend development is less about chasing every new framework and more about building a stable, opinionated stack that lets you ship fast with confidence. Over the last year, I’ve refined my setup to focus on developer experience, performance, and maintainability.",
        "At the core of my stack is React with TypeScript. React gives me the flexibility to structure complex UIs, while TypeScript adds the type safety I need to refactor without fear. I treat types as documentation that never goes out of date, and strict mode is always enabled in my projects.",
        "For the framework layer, I lean heavily on Next.js. File-based routing, server actions, built-in image optimization, and first-class support for edge deployments make it my default choice for production apps. I use the app router, React Server Components, and incremental static regeneration to balance performance and dynamic content.",
        "Styling is handled with Tailwind CSS and a small design system of reusable components. Tailwind lets me move quickly without context switching between files, while my component library ensures spacing, typography, and interactions stay consistent across the app. For icons and micro-interactions, I add lightweight animation libraries only where they genuinely improve UX.",
        "On the tooling side, I rely on pnpm for package management, ESLint and Prettier for code quality, and a minimal but strict set of lint rules. I automate as much as possible: pre-commit hooks run type checks and linting, CI runs unit tests, and preview deployments are generated for every pull request.",
        "Finally, observability is part of the stack, not an afterthought. I integrate basic logging, performance monitoring, and error tracking from day one. This makes it much easier to understand how real users experience the product and to fix issues before they become critical.",
        "The result is a stack that feels boring in the best way: predictable, fast, and reliable. Instead of wrestling with config files, I can focus on solving real problems and crafting interfaces that people actually enjoy using.",
      ],
    },
    {
      id: 2,
      date: "JUN 28 2025",
      title: "How to Build a Blog with Next.js and MDX",
      readTime: "6 min read",
      excerpt:
        "Build a blazing fast markdown blog using Next.js and MDX with this complete walkthrough.",
      image:
        "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: [
        "Combining Next.js with MDX is one of the cleanest ways to build a modern developer blog. You get the performance and SEO benefits of a React-based framework, with the writing experience of Markdown and the flexibility of JSX in your content.",
        "The core idea is simple: each post is an MDX file stored in a content folder. Next.js reads the file system, converts MDX into React components at build time, and exposes each post as a statically generated page. This gives you fast load times and the ability to deploy anywhere.",
        "A typical setup starts with a content layer. You define a posts directory, add frontmatter for metadata like title, date, tags, and read time, and then write the article body in MDX. From there, you can create utility functions that read all MDX files, parse the frontmatter, and return a structured list of posts.",
        "On the UI side, you create two main views: a blog index and a post page. The index page lists all articles with title, date, excerpt, and a link. The post page renders the MDX content using a custom MDX provider so you can map Markdown elements to your own typography components and code blocks.",
        "What makes MDX powerful is that you can embed interactive components directly inside your articles. Want a live demo, a chart, or a call-to-action button in the middle of the post? You simply import the component and use it inline. This turns your blog into a hybrid between documentation and interactive playground.",
        "To polish the experience, I add features like automatic Open Graph images, an RSS feed, estimated reading time, and a simple search across titles and tags. Deployed on a modern edge platform, the entire blog is not only fast but also extremely cheap to run.",
        "Once the foundation is in place, publishing becomes frictionless: write MDX, commit, push, and your blog updates automatically with a new static build. No CMS panel, no heavy admin interface—just content and code working together.",
      ],
    },
    {
      id: 3,
      date: "SEP 03 2025",
      title: "Shipping AI-Powered Features without Burning Out",
      readTime: "7 min read",
      excerpt:
        "From prompt engineering to monitoring, here’s how I integrate AI features into real products with a stable workflow.",
      image:
        "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: [
        "AI features are everywhere in 2025, but shipping them sustainably is a different challenge. It’s easy to bolt an API call onto your product; it’s much harder to design a reliable experience that doesn’t drain your time, compute budget, or sanity.",
        "My process starts with clarity: I never add AI just because it’s trending. I define a specific user problem first—summarizing content, generating drafts, classifying feedback—and only then decide whether an AI model is the right tool for that job.",
        "Once the use-case is clear, I design the UX around failure states, not just the happy path. Models can be slow, wrong, or unavailable. That means building in loading states, graceful fallbacks, and clear expectations for the user. When AI is augmenting a human workflow, I always keep an easy way to edit, override, or discard the output.",
        "Technically, I treat AI calls as part of the backend domain, not random fetch requests sprinkled across the frontend. I centralize prompts, model configs, and safety checks in a dedicated service layer so I can update behavior without touching the UI for every change.",
        "Monitoring is non-negotiable. I log inputs and outputs with appropriate privacy safeguards, track latency and error rates, and tag events when users correct the AI’s response. This feedback loop is essential to refine prompts, adjust model choice, or add guardrails over time.",
        "To control costs and avoid burnout, I start small. I roll out AI features behind feature flags, test them with a narrow audience, and add limits such as daily usage caps or caching for repeated queries. This prevents surprise bills and helps me understand how people actually use the feature before scaling it up.",
        "In the end, shipping AI sustainably is about discipline: clear scope, strong UX, observable systems, and tight feedback loops. When those pieces are in place, AI stops feeling like a risky experiment and starts behaving like a dependable part of the product.",
      ],
    },
  ];

  const handleShareClick = () => {
    const rightLogo = document.querySelector(".outer-logo-right");
    if (rightLogo) {
      rightLogo.click();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="w-full min-h-screen bg-black text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          {/* Header */}
          <header
            className={`mb-12 lg:mb-16 text-center transform transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="tracking-[0.25em] text-xs uppercase text-zinc-500 mb-3">
              The Pensieve
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight inline-block">
              <span className="inline-block transform transition-transform duration-700 hover:-translate-y-1">
                Handpicked{" "}
              </span>
              <span className="bg-gradient-to-r from-pink-500 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent animate-[pulse_4s_ease-in-out_infinite]">
                Insights
              </span>
            </h1>
          </header>

          {/* Main layout */}
          <div
            className={`grid gap-12 lg:gap-16 lg:grid-cols-[290px_minmax(0,1fr)] transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* LEFT SIDEBAR */}
            <aside className="transform transition-transform duration-700 hover:-translate-y-1">
              <div className="border border-zinc-800/80 rounded-3xl px-6 py-6 bg-zinc-950/70 backdrop-blur space-y-6 shadow-[0_0_40px_rgba(236,72,153,0.05)] hover:shadow-[0_0_60px_rgba(236,72,153,0.12)] transition-shadow duration-500">
                {/* Header row: Explore + Share button */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] text-zinc-500 tracking-[0.25em] uppercase mb-1">
                      Explore
                    </p>
                    <h2 className="text-2xl font-semibold leading-none">
                      <span className="inline-block transform transition-transform duration-500 hover:translate-x-1">
                        Library
                      </span>
                    </h2>
                    <p className="mt-1 text-xs text-zinc-500">
                      Showing{" "}
                      <span className="text-pink-400 font-medium">
                        {posts.length}
                      </span>{" "}
                      posts
                    </p>
                  </div>

                  <button
                    onClick={handleShareClick}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-zinc-700/80 bg-zinc-900/80 hover:border-pink-500/80 hover:bg-zinc-800/80 transition-all duration-300 hover:-translate-y-0.5 hover:rotate-3 shadow-[0_0_20px_rgba(236,72,153,0.25)]"
                    aria-label="Share / Open Command Palette"
                  >
                    <FiShare2 className="text-sm" />
                  </button>
                </div>

                {/* Search */}
                <div className="space-y-3 pt-2 border-t border-zinc-900/80">
                  <p className="text-[11px] text-zinc-500 tracking-[0.25em] uppercase mt-4">
                    Search
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="group flex-1 flex items-center gap-3 bg-zinc-900/70 border border-zinc-800 rounded-2xl px-3 py-2 cursor-pointer transition-all duration-300 hover:border-pink-500/80 hover:bg-zinc-900 hover:-translate-y-0.5"
                      onClick={handleShareClick}
                    >
                      <span className="text-sm text-zinc-500 group-hover:text-pink-300 transition-colors">
                        ⌕
                      </span>
                      <input
                        type="text"
                        placeholder="Search posts (coming soon)"
                        className="bg-transparent outline-none w-full text-sm placeholder:text-zinc-600 cursor-pointer"
                        readOnly
                      />
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500">
                      <span className="px-2 py-1 rounded-md border border-zinc-800 bg-zinc-900/80 shadow-sm">
                        Ctrl
                      </span>
                      <span className="px-2 py-1 rounded-md border border-zinc-800 bg-zinc-900/80 shadow-sm">
                        K
                      </span>
                    </div>
                  </div>
                </div>

                {/* Viral Tech Topics */}
                <div className="space-y-3 pt-4 border-t border-zinc-900/80">
                  <p className="text-[11px] text-zinc-500 tracking-[0.25em] uppercase">
                    Viral Tech Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic, index) => (
                      <button
                        key={topic}
                        className="px-3 py-1.5 rounded-full text-xs border border-zinc-800 bg-zinc-900/70 hover:border-pink-500/80 hover:text-pink-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(236,72,153,0.25)]"
                        style={{
                          transitionDelay: `${index * 25}ms`,
                        }}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: POSTS / ARTICLE VIEW */}
            <div className="space-y-10">
              {/* If an article is open */}
              {activePost && (
                <article className="border border-zinc-800/80 rounded-3xl bg-zinc-950/70 backdrop-blur overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.12)] transform transition-all duration-500 animate-[fadeIn_0.6s_ease-out]">
                  <div className="relative h-60 md:h-72 w-full group">
                    <img
                      src={activePost.image}
                      alt={activePost.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p className="text-xs tracking-[0.22em] text-zinc-400 uppercase mb-1">
                        {activePost.date}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-2">
                        {activePost.title}
                      </h2>
                      <p className="text-sm text-zinc-300 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <span className="text-[11px]">🕒</span>
                          {activePost.readTime}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-500" />
                        <span className="opacity-80">
                          By{" "}
                          <span className="text-pink-300">
                            Karan Shekhawat
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="px-6 md:px-10 py-8 md:py-10 space-y-5 md:space-y-6">
                    {activePost.content.map((para, idx) => (
                      <p
                        key={idx}
                        className="text-sm md:text-base leading-relaxed text-zinc-300 transform transition-all duration-500"
                        style={{
                          transitionDelay: `${idx * 60}ms`,
                        }}
                      >
                        {para}
                      </p>
                    ))}

                    <div className="pt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-900 mt-4">
                      <button
                        onClick={() => setActivePost(null)}
                        className="text-sm font-medium text-zinc-100 inline-flex items-center gap-2 hover:text-pink-300 transition-colors group"
                      >
                        <span className="transform transition-transform duration-300 group-hover:-translate-x-0.5">
                          ←
                        </span>
                        <span>Back to all posts</span>
                      </button>
                      <button
                        onClick={handleShareClick}
                        className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-pink-300 transition-colors hover:-translate-y-0.5 transform"
                      >
                        <FiShare2 className="text-base" />
                        Share this article
                      </button>
                    </div>
                  </div>
                </article>
              )}

              {/* List of posts */}
              {!activePost && (
                <main className="space-y-10">
                  {posts.map((post, index) => (
                    <article
                      key={post.id}
                      className="group border border-zinc-800/80 rounded-3xl bg-zinc-950/60 backdrop-blur overflow-hidden hover:border-pink-500/60 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
                      style={{
                        transitionDelay: `${index * 70}ms`,
                      }}
                    >
                      <div className="grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-6">
                        {/* Text content */}
                        <div className="px-6 md:pl-8 md:pr-4 py-6 flex flex-col justify-center space-y-3">
                          <p className="text-xs tracking-[0.22em] text-zinc-500 uppercase">
                            {post.date}
                          </p>
                          <h3 className="text-xl md:text-2xl font-semibold leading-snug">
                            <span className="inline-block group-hover:text-pink-300 transition-colors">
                              {post.title}
                            </span>
                          </h3>
                          <p className="text-sm text-zinc-400">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 pt-2 text-sm">
                            <div className="flex items-center gap-1 text-zinc-500">
                              <span className="text-[11px]">🕒</span>
                              <span>{post.readTime}</span>
                            </div>
                            <button
                              onClick={() => setActivePost(post)}
                              className="group/read inline-flex items-center gap-1 text-sm font-medium text-zinc-100"
                            >
                              <span className="relative">
                                <span className="relative z-10">
                                  Read Article
                                </span>
                                <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-pink-500 via-fuchsia-400 to-orange-400 opacity-0 group-hover/read:opacity-100 transition-opacity duration-300" />
                              </span>
                              <span className="transition-transform duration-300 group-hover/read:translate-x-1">
                                ↗
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative h-52 md:h-full overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </article>
                  ))}
                </main>
              )}
            </div>
          </div>
        </div>

        {/* Minimal keyframes for fadeIn */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* FOOTER BELOW BLOG SECTION */}
      <Footer />
    </>
  );
}
