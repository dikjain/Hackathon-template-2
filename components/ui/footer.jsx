export const Footer = () => {
    return (
      <footer className="border-t py-6  md:py-0 ">
        <div className="container mx-auto flex pb-12 md:pb-0 flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground" style={{fontFamily: "var(--font-space-grotesk)"}}>
            Built with <span className="inline-block animate-pulse">❤️</span> for developers
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors" style={{fontFamily: "var(--font-space-grotesk)"}}>GitHub</a>
            <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors" style={{fontFamily: "var(--font-space-grotesk)"}}>Team</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" style={{fontFamily: "var(--font-space-grotesk)"}}>Contact</a>
          </div>
        </div>
      </footer>
    );
  };