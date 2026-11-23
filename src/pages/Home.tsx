import { useState } from 'react';
import { CodeVortex } from '@/components/CodeVortex';
import { RotatingTypeWriter } from '@/components/RotatingTypeWriter';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { terminalSounds } from '@/utils/sounds';

const suggestedCommands = [
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'about', desc: 'Display information about me', link: '/about' },
  { cmd: 'skills', desc: 'List technical skills', link: '/skills' },
  { cmd: 'projects', desc: 'Browse project portfolio', link: '/projects' },
  { cmd: 'contact', desc: 'Get in touch', link: '/contact' },
  { cmd: 'cat resume.pdf', desc: 'Download resume', action: 'download' },
];

export default function Home() {
  const [vortexPaused, setVortexPaused] = useState(false);

  const handleLinkClick = () => {
    terminalSounds.playClick();
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-10 animate-fade-in">
      {/* Hero */}
      <div className="space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-8">
        <section
          aria-labelledby="portfolio-name"
          className="relative isolate left-1/2 flex min-h-[100svh] w-[100vw] -translate-x-1/2 items-center justify-center overflow-hidden bg-[#000703] px-5 py-20 text-center sm:px-12"
        >
          <CodeVortex paused={vortexPaused} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,7,3,.92)_0%,rgba(0,7,3,.68)_34%,transparent_74%)]"
          />
          <div className="relative mx-auto w-full max-w-6xl">
            <h1 id="portfolio-name" className="text-[clamp(2.1rem,7.5vw,7rem)] font-bold leading-none tracking-[-0.07em] text-[#edfff2] [text-shadow:0_0_30px_rgba(43,255,121,.38)]">
              SAM RANJITH PAUL
            </h1>
            <div className="mt-5 min-h-[3em] text-base text-[#b8fbd0] sm:text-xl">
              <div className="motion-reduce:hidden">
                <RotatingTypeWriter
                  texts={['Full-Stack Developer', 'Web Developer', 'Building Interactive Experiences']}
                  typingDelay={100}
                  deletingDelay={50}
                  pauseDelay={2000}
                  enableSound={false}
                />
              </div>
              <span className="hidden motion-reduce:inline">Full-Stack Developer</span>
            </div>
            <Link
              to="/projects"
              onClick={handleLinkClick}
              className="inline-flex min-h-11 items-center border border-[#43ed86] bg-[#00190d] px-5 py-2 text-sm font-semibold text-[#d9ffe6] transition-colors hover:bg-[#0b4025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8fbd0]"
            >
              View projects
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setVortexPaused((paused) => !paused)}
            className="absolute bottom-5 right-5 min-h-11 rounded border border-[#316047] bg-[#00140a] px-3 text-xs text-[#e0ffea] hover:bg-[#0b4025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8fbd0] motion-reduce:hidden"
          >
            {vortexPaused ? 'Resume animation' : 'Pause animation'}
          </button>
        </section>

        {/* Commands section */}
        <div className="space-y-6 sm:space-y-8 md:space-y-4 lg:space-y-6 xl:space-y-8">
          <div className="text-terminal-text mb-4 sm:mb-6 md:mb-3 text-sm md:text-base lg:text-xl xl:text-2xl">
            Type a command to begin:
          </div>

          {/* Commands list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-3 lg:gap-5 xl:gap-6 pl-3 sm:pl-4 md:pl-4 lg:pl-6">
            {suggestedCommands.map(({ cmd, desc, link, action }) => (
              <div 
                key={cmd} 
                className="flex items-start gap-2 md:gap-3 lg:gap-4 group text-sm md:text-base lg:text-lg xl:text-xl"
              >
                <span className="text-terminal-accent-dim flex-shrink-0">$</span>
                {link ? (
                  <Link
                    to={link}
                    onClick={handleLinkClick}
                    className="flex-1 hover:text-terminal-accent transition-all terminal-glow break-words"
                  >
                    <span className="text-terminal-accent font-semibold">{cmd}</span>
                    <span className="text-terminal-text-dim ml-2 md:ml-3">// {desc}</span>
                  </Link>
                ) : action === 'download' ? (
                  <a
                    href="/resume.pdf"
                    download
                    onClick={handleLinkClick}
                    className="flex-1 hover:text-terminal-accent transition-all terminal-glow flex items-center gap-2 break-words"
                  >
                    <span className="text-terminal-accent font-semibold">{cmd}</span>
                    <span className="text-terminal-text-dim ml-2 md:ml-3">// {desc}</span>
                    <Download className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 ml-2" />
                  </a>
                ) : (
                  <div className="flex-1 break-words">
                    <span className="text-terminal-accent font-semibold">{cmd}</span>
                    <span className="text-terminal-text-dim ml-2 md:ml-3">// {desc}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
