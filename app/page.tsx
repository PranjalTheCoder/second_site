export default function Home() {
  return (
    <main className="page">
      <nav className="navbar">
        <h2>My Website</h2>

        <div className="navLinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="heroContent">
          <p className="subtitle">Welcome to my website</p>

          <h1>
            Building simple and beautiful
            <span> web experiences.</span>
          </h1>

          <p className="description">
            This is a simple static website built using Next.js and deployed on
            GitHub Pages.
          </p>

          <a href="#about" className="button">
            Explore
          </a>
        </div>
      </section>

      <section id="about" className="section">
        <h2>About</h2>

        <p>
          This is a simple static page created with Next.js. You can replace
          this content with your own information.
        </p>
      </section>

      <section id="contact" className="section">
        <h2>Contact</h2>

        <p>example@email.com</p>
      </section>
    </main>
  );
}
