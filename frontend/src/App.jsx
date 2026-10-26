import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ANNOUNCEMENTS,
  CONTACT_PERSONS,
  DEADLINES,
  PREVIOUS_CONFERENCES,
  PUBLICATIONS,
  REGISTRATION_URL,
  THEMES,
  FEES
} from "./content.js";

const brochureUrl = "/Brochure_Chembioen_2027_with_contacts.pdf";
const registrationUrl = REGISTRATION_URL.trim();
const registrationUrlIsValid = /^https:\/\/(?:[a-z\d-]+\.)+[a-z\d-]+(?::\d+)?(?:\/[^\s]*)?$/i.test(registrationUrl);

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-shell container" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="ChemBioEN 2027 home">
          <span className="brand-symbol" aria-hidden="true"><span>CB</span><i /></span>
          <span className="brand-words"><strong>ChemBioEN <em>2027</em></strong><small>4th International Conference</small></span>
        </Link>
        <div className="host-placeholder" aria-label="Organized by Chemical Engineering, NIT Jalandhar">
          <span aria-hidden="true">N</span><small>Chemical Engineering<br />NIT Jalandhar</small>
        </div>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}>
          <span /><span /><span />
        </button>
        <div className={`nav-content${menuOpen ? " is-open" : ""}`} id="main-navigation">
          <div className="nav-links">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <NavLink to="/thematic-areas" onClick={closeMenu}>Thematic Areas</NavLink>
            <NavLink to="/publications" onClick={closeMenu}>Publications</NavLink>
            <NavLink to="/invited-speakers" onClick={closeMenu}>Invited Speakers</NavLink>
            <NavLink to="/previous-conferences" onClick={closeMenu}>Previous Conferences</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </div>
          <div className="nav-actions">
            <RegistrationAction className="button button-primary button-small">Register</RegistrationAction>
          </div>
        </div>
      </nav>
    </header>
  );
}

function RegistrationAction({ children, className = "button button-primary", label }) {
  const [message, setMessage] = useState("");
  const accessibleLabel = label || (typeof children === "string" ? children : undefined);

  return (
    <div className="registration-action-wrap">
      {registrationUrlIsValid ? (
        <a className={className} href={registrationUrl} target="_blank" rel="noopener noreferrer" aria-label={accessibleLabel}>{children}</a>
      ) : (
        <button
          className={className}
          type="button"
          aria-label={accessibleLabel}
          onClick={() => setMessage(registrationUrl ? "The registration link has not been configured with a valid HTTPS URL yet." : "The registration form link will be added when it is available.")}
        >
          {children}
        </button>
      )}
      {message && <span className="registration-status" role="status">{message}</span>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><span className="heading-rule" /><p>{children}</p></div>;
}

function AnnouncementTicker() {
  const [paused, setPaused] = useState(false);
  const announcements = [
    "4th International Conference on Chemical, Bio & Environmental Engineering",
    "Hybrid mode",
    "Abstracts invited in Biofuels and Biomaterials",
    "Conference dates to be announced"
  ];
  return (
    <div className={`announcement${paused ? " is-paused" : ""}`} role="region" aria-label="Conference announcements">
      <span className="sr-only">Conference dates, programme details and registration information are to be confirmed.</span>
      <div className="ticker-viewport">
        <div className="ticker-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className={`ticker-group${copy ? " ticker-group-duplicate" : ""}`} key={copy}>
              {announcements.map((announcement) => <span className="ticker-item" key={announcement}><i>★</i>{announcement}</span>)}
            </div>
          ))}
        </div>
      </div>
      <button className="ticker-toggle" type="button" aria-label={paused ? "Resume moving announcements" : "Pause moving announcements"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "▶" : "Ⅱ"}</button>
    </div>
  );
}

function AnnouncementsBlock() {
  const latest = ANNOUNCEMENTS.find((announcement) => announcement.latest);
  const previous = ANNOUNCEMENTS.filter((announcement) => !announcement.latest);

  return (
    <section className="homepage-updates section" id="announcements" aria-labelledby="announcements-title">
      <div className="container homepage-updates-grid">
        <article className="brochure-card">
          <p className="eyebrow">Conference information</p>
          <h2>Brochure</h2>
          <p>Read or download the ChemBioEN 2027 conference brochure, including the contact information addendum.</p>
          <a className="button button-outline" href={brochureUrl} target="_blank" rel="noopener noreferrer">View brochure <span aria-hidden="true">↗</span></a>
          <a className="brochure-download" href={brochureUrl} download>Download the brochure</a>
        </article>
        <article className="announcements-card">
          <div className="announcements-heading">
            <div><p className="eyebrow">Conference updates</p><h2 id="announcements-title">Announcements</h2></div>
            <span className="placeholder-badge">Dates to be confirmed</span>
          </div>
          {latest && <div className="latest-announcement">
            <span className="latest-label">Latest announcement · placeholder</span>
            <h3>{latest.title}</h3>
            <p>{latest.body}</p>
          </div>}
          <div className="deadline-list" aria-label="Conference deadlines">
            {DEADLINES.map(({ label, value }) => <p className="deadline-item" key={label}><strong>{label}:</strong><span>{value}</span></p>)}
          </div>
          <details className="previous-announcements">
            <summary>Previous announcements <span aria-hidden="true">⌄</span></summary>
            {previous.length ? (
              <ol>{previous.map((item) => <li key={item.id}><strong>{item.title}</strong><span>{item.body}</span></li>)}</ol>
            ) : (
              <p>No previous official announcements have been published.</p>
            )}
          </details>
        </article>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <section className="hero hero-reference" id="home">
        <div className="hero-title container">
          <p className="hero-kicker"><span /> 4TH INTERNATIONAL CONFERENCE · HYBRID MODE</p>
          <h1>4th International Conference on<br className="hero-title-break" />{" "}<span>Chemical, Bio &amp; Environmental Engineering</span></h1>
          <p className="hero-acronym">(CHEMBIOEN-2027)</p>
        </div>
        <div className="container ticker-wrap"><AnnouncementTicker /></div>
        <div className="hero-content-grid container">
          <article className="hero-detail-card">
            <p className="eyebrow">Hosted by Chemical Engineering</p>
            <h2>Dr. B. R. Ambedkar NIT Jalandhar</h2>
            <p className="hero-detail-lead">Jalandhar-144008, Punjab, India · Hybrid mode</p>
            <div className="hero-detail-item"><span aria-hidden="true">◷</span><div><strong>Conference dates</strong><p>[TO BE ANNOUNCED]</p></div></div>
            <div className="hero-detail-item"><span aria-hidden="true">✳</span><div><strong>Abstract submissions</strong><p>Biofuels and Biomaterials, and related topics</p></div></div>
            <div className="hero-detail-actions"><Link className="button button-primary" to="/announcements">Important updates <span aria-hidden="true">→</span></Link><Link className="button button-outline" to="/registration">Registration fees</Link></div>
          </article>
          <div className="hero-registration">
            <RegistrationAction className="registration-image-link" label="Register for ChemBioEN 2027">
              <div className="hero-showcase" role="img" aria-label="ChemBioEN illustration representing chemistry, biology and engineering">
                <div className="showcase-orbit showcase-orbit-one" /><div className="showcase-orbit showcase-orbit-two" />
                <div className="showcase-node node-one">C</div><div className="showcase-node node-two">B</div><div className="showcase-node node-three">E</div>
                <div className="showcase-core"><span>C</span><i>×</i><span>B</span></div>
                <div className="showcase-caption"><span>CHEMISTRY</span><i /><span>BIOLOGY</span><i /><span>ENGINEERING</span></div>
              </div>
            </RegistrationAction>
            <div className="registration-callout">
              <h2>Register for ChemBioEN 2027</h2>
              <p>Click the link below to access the ChemBioEN 2027 registration form.</p>
              <RegistrationAction className="button button-gold">Click Here to Register <span aria-hidden="true">↗</span></RegistrationAction>
            </div>
          </div>
        </div>
      </section>
      <AnnouncementsBlock />
      <section className="section home-pages">
        <div className="container home-pages-grid">
          <Link className="home-page-card" to="/about"><span className="eyebrow">The conference</span><h2>About ChemBioEN</h2><p>Learn about the conference and its interdisciplinary focus.</p><span className="inline-link">Explore About <span aria-hidden="true">→</span></span></Link>
          <Link className="home-page-card" to="/thematic-areas"><span className="eyebrow">Conference scope</span><h2>Thematic Areas</h2><p>Explore the research themes from the conference brochure.</p><span className="inline-link">Explore themes <span aria-hidden="true">→</span></span></Link>
          <Link className="home-page-card" to="/publications"><span className="eyebrow">For authors</span><h2>Publications</h2><p>View publication information and author resources.</p><span className="inline-link">Explore publications <span aria-hidden="true">→</span></span></Link>
          <Link className="home-page-card" to="/previous-conferences"><span className="eyebrow">Conference archive</span><h2>Previous Conferences</h2><p>Browse the 2020, 2021, and 2023 conference pages.</p><span className="inline-link">View past conferences <span aria-hidden="true">→</span></span></Link>
        </div>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="The conference" title="About ChemBioEN 2027">An interdisciplinary forum for chemical, bio, and environmental engineering research.</PageIntro>
      <section className="section about-section"><div className="container about-layout">
        <div className="about-visual"><div className="visual-orbit" /><div className="visual-mark">C<span>×</span>B</div><p>INTERDISCIPLINARY<br />BY NATURE</p></div>
        <div className="about-copy"><p className="eyebrow">The conference</p><h2>Chemical, Bio &amp;<br /><span>Environmental Engineering</span></h2><p>The 4th International Conference on Chemical, Bio &amp; Environmental Engineering brings academic scientists, researchers, scholars, practitioners and educators together to exchange research and discuss current innovations, trends, concerns, practical challenges and solutions in chemical and environmental engineering.</p><p className="placeholder-note">Organized by the Department of Chemical Engineering, Dr. B. R. Ambedkar National Institute of Technology Jalandhar, Punjab, India.</p><Link className="inline-link" to="/thematic-areas">Explore the conference topics <span>→</span></Link></div>
      </div></section>
      <section className="programme-section"><div className="container programme-layout"><div><p className="eyebrow eyebrow-light">Conference objectives</p><h2>Research that<br />moves fields forward.</h2><p>The conference is an interdisciplinary forum to present research, exchange results and discuss recent innovations, practical challenges and solutions across chemical and environmental engineering.</p><a className="button button-gold" href={brochureUrl} target="_blank" rel="noopener noreferrer">Read the brochure <span>↗</span></a></div>
        <div className="programme-list"><article><span>01</span><div><h3>Exchange research results</h3><p>Academic scientists, researchers and scholars</p></div><b>↗</b></article><article><span>02</span><div><h3>Present abstracts and full papers</h3><p>Abstract acceptance followed by peer review</p></div><b>↗</b></article><article><span>03</span><div><h3>Discuss engineering challenges</h3><p>Chemical, bio and environmental engineering</p></div><b>↗</b></article></div>
      </div></section>
    </main>
  );
}

function ThematicAreasPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Conference scope" title="Thematic Areas">The brochure lists the following conference topics, including but not limited to these areas.</PageIntro>
      <section className="section themes-section"><div className="container theme-grid">
        {THEMES.map(([title, description], index) => <article className="theme-card" key={title}><span className="theme-number">0{index + 1}</span><span className="theme-icon" aria-hidden="true">{["⌬", "◈", "⌘", "♧", "✳", "⊕"][index % 6]}</span><h2>{title}</h2><p>{description}</p></article>)}
      </div></section>
    </main>
  );
}

function InvitedSpeakersPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Conference speakers" title="Invited Speakers">Speaker names and affiliations will be added here when officially announced.</PageIntro>
      <section className="section"><div className="container speaker-placeholder">[INVITED SPEAKERS TO BE ANNOUNCED]</div></section>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Get in touch" title="Contact &amp; location">Contact information will be updated after official details are provided.</PageIntro>
      <section className="contact-section"><div className="container contact-layout"><div><p className="eyebrow">Conference location</p><h2>Dr. B. R. Ambedkar NIT Jalandhar</h2><p>Department of Chemical Engineering<br />Dr. B. R. Ambedkar National Institute of Technology Jalandhar-144008, Punjab, India</p><a className="inline-link" href="https://www.nitj.ac.in/" target="_blank" rel="noopener noreferrer">NIT Jalandhar website <span>↗</span></a></div><div className="contact-card contact-location"><span>⌖</span><div><strong>Getting to the institute</strong><p>15 km from Jalandhar Bus Stand · 12 km from Jalandhar City Railway Station · 18 km from Jalandhar Cantt. Railway Station, as stated in the brochure.</p></div></div></div></section>
      <section className="section"><div className="container">
        <div className="contact-people-heading"><span className="placeholder-badge">Phone numbers and emails not provided</span><h2>Conference contact persons</h2><p>Names and organizing roles below are taken from the brochure. Reddy Sahu's designation and everyone's direct contact details still need confirmation.</p></div>
        <div className="contact-people-grid">{CONTACT_PERSONS.map((person) => <article className="contact-person-card" key={person.name}><h3>{person.name}</h3><p className="contact-person-role">{person.designation}</p><dl><div><dt>Phone</dt><dd>[TO BE PROVIDED]</dd></div><div><dt>Email</dt><dd>[TO BE PROVIDED]</dd></div></dl></article>)}</div>
      </div></section>
    </main>
  );
}

function RegistrationPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Attend ChemBioEN-2027" title="Registration fees">The brochure lists the following fees. Official dates and registration instructions are to be provided.</PageIntro>
      <section className="section registration-section"><div className="container">
        <div className="fee-table-wrap"><table className="fee-table"><caption>Registration fee categories from the conference brochure</caption><thead><tr><th scope="col">Participant category</th><th scope="col">Indian participants (₹)</th><th scope="col">Foreign participants ($)</th></tr></thead><tbody>{FEES.map(([category, indian, foreign]) => <tr key={category}><th scope="row">{category}</th><td>{indian}</td><td>{foreign}</td></tr>)}</tbody></table></div>
        <p className="registration-note">Registration dates and the external form link are placeholders until confirmed.</p>
        <div className="registration-actions"><RegistrationAction className="button button-primary">Register for ChemBioEN 2027 <span>→</span></RegistrationAction><a className="button button-outline" href={brochureUrl} target="_blank" rel="noopener noreferrer">View brochure ↗</a></div>
      </div></section>
    </main>
  );
}

function AnnouncementsPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Conference updates" title="Announcements">Official announcements and deadline updates will be maintained here.</PageIntro>
      <AnnouncementsBlock />
    </main>
  );
}

function PageIntro({ eyebrow, title, children }) {
  return <section className="page-intro"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{children}</p></div></section>;
}

function PublicationsPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Research & proceedings" title="Publications">Publication information will be added when verified details are available.</PageIntro>
      <section className="section"><div className="container publication-grid">
        {PUBLICATIONS.map((publication) => (
          <Link className="publication-card" key={publication.id} to={`/publications/${publication.id}`}>
            <img src={publication.image} alt={publication.imageAlt} />
            <div><span className="placeholder-badge">Placeholder</span><h2>{publication.title}</h2><p>{publication.description}</p><span className="inline-link">View publication details <span aria-hidden="true">→</span></span></div>
          </Link>
        ))}
      </div></section>
    </main>
  );
}

function PublicationPage() {
  const { publicationId } = useParams();
  const publication = PUBLICATIONS.find((item) => item.id === publicationId);
  if (!publication) return <NotFound />;

  return (
    <main className="content-page">
      <PageIntro eyebrow="Publication details" title={publication.title}>{publication.description}</PageIntro>
      <section className="section"><article className="container publication-detail">
        <img src={publication.image} alt={publication.imageAlt} />
        <div className="publication-detail-content">
          <span className="placeholder-badge">Editable placeholder</span>
          <h2>Publication information</h2>
          <dl>
            <div><dt>Abstract or description</dt><dd>{publication.abstract}</dd></div>
            <div><dt>Authors</dt><dd>{publication.authors}</dd></div>
            <div><dt>Publication year</dt><dd>{publication.year}</dd></div>
            <div><dt>External publication link</dt><dd>{publication.externalUrl ? <a href={publication.externalUrl} target="_blank" rel="noopener noreferrer">Open publication ↗</a> : "[EXTERNAL LINK TO BE PROVIDED]"}</dd></div>
          </dl>
          <Link className="inline-link" to="/publications">← All publications</Link>
        </div>
      </article></section>
    </main>
  );
}

function PreviousConferencePage() {
  const { year } = useParams();
  const conference = PREVIOUS_CONFERENCES.find((item) => item.year === year);
  if (!conference) return <NotFound />;

  return (
    <main className="content-page">
      <PageIntro eyebrow="Previous Conferences" title={`ChemBioEN ${conference.year}`}>{conference.description}</PageIntro>
      <section className="section"><div className="container conference-placeholder">
        <span className="placeholder-badge">Historical information not verified</span>
        <h2>Conference details to be supplied</h2>
        <p>{conference.description}</p>
        <p>No dates, venue, speakers, or scientific achievements are published here until verified information is provided.</p>
        <Link className="inline-link" to="/">← Return to ChemBioEN 2027</Link>
      </div></section>
    </main>
  );
}

function PreviousConferencesPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Conference archive" title="Previous Conferences">Select a year to view its page. Historical content remains marked as unverified until official details are supplied.</PageIntro>
      <section className="section"><div className="container previous-conference-grid">
        {PREVIOUS_CONFERENCES.map((conference) => (
          <Link className="home-page-card" key={conference.year} to={`/previous-conferences/${conference.year}`}>
            <span className="eyebrow">Conference archive</span>
            <h2>ChemBioEN {conference.year}</h2>
            <p>{conference.description}</p>
            <span className="inline-link">View Conference <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div></section>
    </main>
  );
}

function NotFound() {
  return <main className="not-found"><p className="eyebrow">PAGE NOT FOUND</p><h1>That page isn't here.</h1><Link className="button button-primary" to="/">Return to home</Link></main>;
}

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/thematic-areas" element={<ThematicAreasPage />} />
        <Route path="/invited-speakers" element={<InvitedSpeakersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/previous-conferences" element={<PreviousConferencesPage />} />
        <Route path="/previous-conferences/:year" element={<PreviousConferencePage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/publications/:publicationId" element={<PublicationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="site-footer">
        <div className="container footer-main">
          <Link className="brand" to="/"><span className="brand-symbol"><span>CB</span><i /></span><span className="brand-words"><strong>ChemBioEN <em>2027</em></strong><small>International Conference</small></span></Link>
          <p>Event details will be updated as information is confirmed.</p>
          <div className="footer-links"><Link to="/publications">Publications</Link><Link to="/previous-conferences">Previous Conferences</Link><Link to="/">Back to top ↑</Link></div>
        </div>
        <div className="footer-bottom"><div className="container"><span>© 2027 ChemBioEN</span><span>[HOST AFFILIATION TO BE CONFIRMED]</span></div></div>
      </footer>
    </>
  );
}

export default App;
