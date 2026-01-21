import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Sun, Moon } from 'lucide-react';
import ImmansBot from './components/ImmansBot.jsx';

const HeroCanvas = lazy(() => import('./components/HeroCanvas.jsx').then(m => ({ default: m.HeroCanvas })));

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const prefersReducedMotion = useReducedMotion();
  const navItems = useMemo(
    () => [
      { href: '#hero', label: 'Home' },
      { href: '#about', label: 'About' },
      { href: '#skills', label: 'Skills' },
      { href: '#projects', label: 'Projects' },
      { href: '#experience', label: 'Experience' },
      { href: '#achievements', label: 'Achievements' },
      { href: '#contact', label: 'Contact' },
    ],
    [],
  );

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  useEffect(() => {
    const next = theme === 'light' ? 'theme-light' : 'theme-dark';
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(next);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen ${isLight ? 'bg-white text-slate-900' : 'bg-background text-slate-100'}`}
    >
      {/* Top Nav */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur ${
          isLight ? 'border-slate-200/80 bg-white/80' : 'border-slate-900/70 bg-background/70'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-600 text-slate-950 shadow-soft flex items-center justify-center text-sm font-extrabold tracking-tight">
              IS
            </div>
      <div>
              <p className="text-sm font-semibold text-white leading-none">
                Immanuvel S
              </p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
                Full Stack Dev
              </p>
            </div>
          </div>
          <nav
            className={`hidden items-center gap-5 text-sm font-medium md:flex ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1 transition ${
                  isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-300'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                isLight
                  ? 'border-slate-200 bg-white text-slate-800 hover:border-cyan-300 hover:text-cyan-600'
                  : 'border-slate-800 bg-slate-900/70 text-slate-100 hover:border-cyan-300 hover:text-cyan-200'
              }`}
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="rounded-full bg-cyan-400 px-4 py-2 text-slate-950 shadow-soft transition hover:bg-cyan-300"
            >
              Hire Me
            </a>
          </nav>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-slate-100 transition md:hidden ${
              isLight
                ? 'border-slate-200 bg-white text-slate-800 hover:border-cyan-300 hover:text-cyan-600'
                : 'border-slate-800 bg-slate-900/70 text-slate-100 hover:border-cyan-300 hover:text-cyan-200'
            }`}
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
        {menuOpen && (
          <div
            className={`border-t md:hidden ${
              isLight ? 'border-slate-200 bg-white/95' : 'border-slate-900/70 bg-slate-950/90'
            }`}
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-4 md:px-6 lg:px-0">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isLight
                      ? 'text-slate-800 hover:bg-slate-100 hover:text-cyan-600'
                      : 'text-slate-100 hover:bg-slate-900/70 hover:text-cyan-300'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className={`mt-2 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isLight
                    ? 'border border-slate-200 bg-white text-slate-800 hover:border-cyan-300 hover:text-cyan-600'
                    : 'border border-slate-800 bg-slate-900/70 text-slate-100 hover:border-cyan-300 hover:text-cyan-200'
                }`}
              >
                {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                Toggle Theme
              </button>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-cyan-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 shadow-soft transition hover:bg-cyan-300"
              >
                Hire Me
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-24 pt-10 md:gap-32 md:px-6 lg:px-0">
        {/* HERO */}
        <section
          id="hero"
          className="grid min-h-[80vh] items-center gap-10 md:min-h-[90vh] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          aria-labelledby="hero-heading"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={sectionVariant}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Hi, I&apos;m
            </p>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-cyan-300/40 bg-slate-900/80 shadow-soft ring-4 ring-slate-900/60">
                <img
                  src="/profile.jpg"
                  alt="Portrait of Immanuvel S"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
                  Full Stack Software Developer
                </p>
                <h1
                  id="hero-heading"
                  className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
                >
                  Immanuvel S
                  <span className="block text-xl font-normal text-cyan-300 sm:text-2xl lg:text-3xl">
                    👉 Full Stack Software Developer
                  </span>
                </h1>
              </div>
            </div>
            <p className="max-w-xl text-balance text-sm text-slate-300 sm:text-base">
              I build scalable web and business applications, working with{' '}
              <span className="font-semibold text-cyan-300">Frappe</span>,{' '}
              <span className="font-semibold text-cyan-300">ERPNext</span>, React, and
              modern backend systems.
              <span className="block pt-2 text-slate-400">
                Python Full Stack Developer with a strong frontend backbone in React,
                Tailwind, and motion-first UX.
              </span>
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-medium text-slate-950 shadow-soft transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-700/80 bg-slate-900/40 px-6 py-2.5 text-sm font-medium text-slate-100 shadow-soft/40 transition hover:border-cyan-300/70 hover:bg-slate-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf"
                className="rounded-full border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-soft transition hover:from-cyan-400 hover:to-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                download
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right – 3D placeholder (actual Three.js canvas is lazy-loaded in a dedicated component later) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.23, 0.7, 0.34, 1] }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.01, rotateX: -4, rotateY: 4 }
              }
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-slate-800/80 shadow-soft"
            >
              <img
                src="/myimg.png"
                alt="3D styled portrait of Immanuvel S"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-950/70" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-4 text-[11px] text-slate-100">
                <span className="rounded-full bg-slate-900/70 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200/90">
                  3D Portrait
                </span>
                <span className="text-cyan-300/90">Static View</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <motion.section
          id="about"
          aria-labelledby="about-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
          className="space-y-6"
        >
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              About
            </p>
            <h2
              id="about-heading"
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Professional Summary
            </h2>
          </header>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Motivated and detail-oriented Full Stack Software Developer focused on{' '}
            <span className="font-semibold text-cyan-300">Frappe</span>,{' '}
            <span className="font-semibold text-cyan-300">ERPNext</span>, and modern
            React frontends. I ship scalable ERP modules, business workflows, and
            smooth web applications with strong Python and API fundamentals.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-4 text-sm shadow-soft/40">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Location
              </p>
              <p className="mt-2 font-medium text-slate-50">📍 Tamil Nadu, India</p>
            </article>
            <article className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-4 text-sm shadow-soft/40">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Education
              </p>
              <p className="mt-2 font-medium text-slate-50">
                🎓 BCA (2022 – 2025)
              </p>
            </article>
            <article className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-4 text-sm shadow-soft/40">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Role
              </p>
              <p className="mt-2 font-medium text-slate-50">
                💼 Full Stack Software Developer
              </p>
            </article>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          aria-labelledby="skills-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
          className="space-y-6"
        >
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              Skills
            </p>
            <h2
              id="skills-heading"
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Technologies I Work With
            </h2>
          </header>
          <div className="grid gap-5 md:grid-cols-2">
            <SkillGroup
              title="Frontend"
              items={[
                'HTML',
                'CSS',
                'JavaScript',
                'React.js',
                'Tailwind CSS',
                'Bootstrap',
              ]}
            />
            <SkillGroup
              title="Backend"
              items={[
                'Python',
                'Frappe Framework',
                'ERPNext',
                'Django',
                'Django REST Framework',
              ]}
            />
            <SkillGroup title="Database" items={['PostgreSQL', 'MySQL']} />
            <SkillGroup
              title="Tools"
              items={[
                'Git',
                'GitHub',
                'VS Code',
                'Postman',
                'Thunder Client',
                'Frappe Bench',
                'ERPNext Desk',
              ]}
            />
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          aria-labelledby="projects-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
          className="space-y-6"
        >
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              Projects
            </p>
            <h2
              id="projects-heading"
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Selected Work
            </h2>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              This section will mirror your previous portfolio projects exactly once those
              details are provided. For now, it&apos;s structured and styled to match the
              reference layout.
            </p>
          </header>
          <div className="grid gap-5 md:grid-cols-2">
            <ProjectCard
              title="Vehicle Rental System"
              subtitle="React · Tailwind CSS · PostgreSQL · REST APIs"
              description="Full-stack rental platform for customers/admins with booking flows, protected dashboards, and data managed via PostgreSQL APIs."
            />
            <ProjectCard
              title="Internship Management System"
              subtitle="PHP · MySQL · HTML/CSS"
              description="Academic portal for student registration, applications, and employer dashboards with role-based access."
            />
            <ProjectCard
              title="Gym Website"
              subtitle="HTML · CSS"
              description="Responsive landing experience for a gym business, focused on clean layout and clear CTAs."
            />
            <ProjectCard
              title="Portfolio Website"
              subtitle="HTML · CSS · JavaScript"
              description="Personal site with smooth animations to showcase projects and skills."
            />
          </div>
        </motion.section>

        {/* EXPERIENCE */}
        <motion.section
          id="experience"
          aria-labelledby="experience-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
          className="space-y-6"
        >
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              Experience
            </p>
            <h2
              id="experience-heading"
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Professional Journey
            </h2>
          </header>
          <div className="space-y-4">
            <ExperienceCard
              role="Full Stack Frappe & ERPNext Developer"
              company="Bosco Soft Technologies Pvt. Ltd"
              location="📍 Yelagiri Hills, Tamil Nadu"
              period="🕒 Currently Working"
              responsibilities={[
                'ERPNext module development and customization',
                'Creating custom DocTypes, workflows, scripts, and reports',
                'Backend logic using Python & Frappe',
                'Frontend customization and integrations',
              ]}
            />
            <ExperienceCard
              role="Frontend Web Developer (Intern)"
              company="Virtunexa"
              location="📍 Pune, Maharashtra (Remote)"
              period="🕒 Internship"
              responsibilities={[
                'Developed responsive UI components',
                'Worked with HTML, CSS, JavaScript, React',
                'Collaborated in a virtual development environment',
              ]}
            />
          </div>
        </motion.section>

        {/* ACHIEVEMENTS */}
        <motion.section
          id="achievements"
          aria-labelledby="achievements-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
          className="space-y-6"
        >
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              Achievements &amp; Certifications
            </p>
            <h2
              id="achievements-heading"
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Highlights
            </h2>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            <AchievementCard title="🏆 First Prize – College Science Expo (2024)" />
            <AchievementCard title="📜 Python Full Stack – Boscosoft Pvt. Ltd., Yelagiri" />
            <AchievementCard title="📜 Frontend Web Development Internship – Virtunexa" />
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          aria-labelledby="contact-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
          className="space-y-8"
        >
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Let&apos;s Build Something
            </h2>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Whether it&apos;s ERPNext customizations, full-stack applications, or
              frontend engineering, feel free to reach out.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-200">
              <ContactRow
                icon={<Mail className="h-4 w-4" aria-hidden="true" />}
                label="Email"
                value="immans358@gmail.com"
                href="mailto:immans358@gmail.com"
              />
              <ContactRow
                icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                label="Phone"
                value="+91 93632 36043"
                href="tel:+919363236043"
              />
              <ContactRow
                icon={<Linkedin className="h-4 w-4" aria-hidden="true" />}
                label="LinkedIn"
                value="linkedin.com/in/immanuvel2004"
                href="https://www.linkedin.com/in/immanuvel2004/"
              />
              <ContactRow
                icon={<Github className="h-4 w-4" aria-hidden="true" />}
                label="GitHub"
                value="github.com/IMMANUVEL-WEB"
                href="https://github.com/IMMANUVEL-WEB"
              />
            </div>

            <motion.form
              action="https://formsubmit.co/immans358@gmail.com"
              method="POST"
              className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 shadow-soft"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="name" label="Name" type="text" autoComplete="name" />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                />
              </div>
              <FormField id="subject" label="Subject" type="text" />
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-cyan-400/0 transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-400/60"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.02, boxShadow: '0 20px 35px rgba(34,211,238,0.35)' }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-soft transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span>Send Message</span>
              </motion.button>
            </motion.form>
          </div>
        </motion.section>
      </div>

      {/* Imman's Bot */}
      <ImmansBot isLight={isLight} />
    </div>
  );
}

function SkillGroup({ title, items }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 shadow-soft/40">
      <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function ProjectCard({ title, subtitle, description }) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 shadow-soft/40 transition hover:border-cyan-300/70 hover:bg-slate-900/70">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
        <p className="text-xs font-medium text-cyan-300/90">{subtitle}</p>
        <p className="text-xs text-slate-300">{description}</p>
      </div>
    </article>
  );
}

function ExperienceCard({ role, company, location, period, responsibilities }) {
  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 shadow-soft/40">
      <header className="mb-3 space-y-1">
        <h3 className="text-sm font-semibold text-slate-50">{role}</h3>
        <p className="text-xs text-slate-300">{company}</p>
        <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
          <span>{location}</span>
          <span>•</span>
          <span>{period}</span>
        </div>
      </header>
      <ul className="space-y-1.5 text-xs text-slate-300">
        {responsibilities.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full bg-cyan-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function AchievementCard({ title }) {
  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 text-sm text-slate-100 shadow-soft/40">
      {title}
    </article>
  );
}

function ContactRow({ icon, label, value, href }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-100 shadow-soft/30 transition hover:border-cyan-300/80 hover:bg-slate-900/70"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/90 text-cyan-300">
          {icon}
        </div>
        <div className="space-y-0.5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            {label}
          </p>
          <p className="text-xs font-medium text-slate-100">{value}</p>
        </div>
      </div>
    </a>
  );
}

function FormField({ id, label, type, autoComplete }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-slate-200">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-cyan-400/0 transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-400/60"
      />
    </div>
  );
}

export default App;

