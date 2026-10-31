
import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ANNOUNCEMENTS,
  ABSTRACT_SUBMISSION_URL,
  CONTACT_PERSONS,
  DEADLINES,
  INVITED_SPEAKERS,
  PREVIOUS_CONFERENCES,
  PUBLICATIONS,
  REGISTRATION_URL,
  THEMES
} from "./content.js";

const brochureUrl = "/Brochure_Chembioen_2027_with_contacts.pdf";
const isValidFormUrl = (url) => /^https:\/\/(?:[a-z\d-]+\.)+[a-z\d-]+(?::\d+)?(?:\/[^\s]*)?$/i.test((url || "").trim());

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [previousOpen, setPreviousOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-shell container" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="chembioen 2027 home">
          <span className="brand-symbol" aria-hidden="true"><span>CB</span><i /></span>
          <span className="brand-words"><strong>chembioen <em>2027</em></strong><small>4th International Conference</small></span>
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
            <div className={`nav-dropdown${previousOpen ? " is-open" : ""}`}>
              <button
                className="nav-dropdown-trigger"
                type="button"
                aria-expanded={previousOpen}
                onClick={() => setPreviousOpen((open) => !open)}
              >
                Previous Conference <span aria-hidden="true">⌄</span>
              </button>
              <div className="previous-conference-menu">
                {PREVIOUS_CONFERENCES.map((conference) => (
                  <div className="previous-conference-item" key={conference.year}>
                    <strong>CHEMBIOEN {conference.year}</strong>
                    <div className="previous-conference-downloads">
                      <a href={conference.brochureUrl} download onClick={closeMenu}>Brochure PDF</a>
                      <a href={conference.reportUrl} download onClick={closeMenu}>{conference.reportLabel}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </div>
          <div className="nav-actions">
            <Link className="button button-primary button-small" to="/abstract-submission-registration" onClick={closeMenu}>Registration</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

function AnnouncementTicker() {
  const [paused, setPaused] = useState(false);
  const tickerItems = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((item, index) => ({ ...item, key: `${item.id}-${index}` }));

  return (
    <div className="ticker-wrap container">
      <div className={`announcement ${paused ? "is-paused" : ""}`} aria-live="polite">
        <button className="ticker-toggle" type="button" aria-label={paused ? "Resume announcements" : "Pause announcements"} onClick={() => setPaused((value) => !value)}>
          {paused ? "▶" : "❚❚"}
        </button>
        <div className="ticker-viewport">
          <div className="ticker-track">
            <div className="ticker-group">
              {tickerItems.map((item) => (
                <div className="ticker-item" key={item.key}>
                  <i aria-hidden="true">•</i>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
            <div className="ticker-group" aria-hidden="true">
              {tickerItems.map((item) => (
                <div className="ticker-item" key={`${item.key}-duplicate`}>
                  <i aria-hidden="true">•</i>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <main className="home-page">
      <AnnouncementTicker />

      <section className="homepage-updates section" aria-label="Conference information">
        <div className="container homepage-updates-grid">
          <AnnouncementsCard />
          <BrochureCard />
          <SubmissionCard />
        </div>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="content-page">
      <section className="nitj-intro">
        <div className="container">
          <h1>About NIT Jalandhar</h1>
          <p>
            Dr. B. R. Ambedkar National Institute of Technology Jalandhar was established in 1988 as a Regional Engineering College and was granted the status of an Institute of National Importance in 2007. The institute is located on a campus of approximately 154 acres on the G.T. Road, Amritsar bypass, about 15 km from Jalandhar Bus Stand and 12 km from Jalandhar City Railway Station. NIT Jalandhar is well connected by rail and road.
          </p>
        </div>
      </section>

      <section className="conference-about">
        <div className="container">
          <h2>About the Conference</h2>
          <div className="conference-about-grid">
            <article className="conference-about-copy">
              <p>
                CHEMBIOEN 2027 is the fourth international conference on Chemical, Bio &amp; Environmental Engineering, hosted by the Department of Chemical Engineering at Dr. B. R. Ambedkar National Institute of Technology Jalandhar.
              </p>
              <p>
                The conference brings together researchers, academicians, scientists, research scholars, and industry professionals to exchange knowledge and discuss research and engineering challenges across chemical, biological, and environmental domains.
              </p>
              <p>
                The conference provides a forum for interdisciplinary dialogue, research presentations, and collaboration focused on emerging technologies and sustainable engineering solutions.
              </p>
            </article>
            <article className="conference-highlights">
              <h3>Conference Highlights</h3>
              <ul>
                <li>Expert-led technical sessions</li>
                <li>Research and industry-focused presentations</li>
                <li>Interdisciplinary exchange across engineering domains</li>
                <li>Emerging technologies and sustainable solutions</li>
                <li>Academic and professional networking</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section department-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Department of Chemical Engineering</p>
            <h2>Research across connected disciplines</h2>
          </div>
          <div className="theme-grid about-theme-grid">
            {THEMES.map(([title, description], index) => (
              <article className="theme-card" key={title}>
                <span className="theme-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ThematicAreasPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Conference scope" title="Thematic Areas">The conference covers research in chemical, bio, and environmental engineering, with a focus on sustainable and interdisciplinary innovation.</PageIntro>
      <section className="section themes-section"><div className="container theme-grid">
        {THEMES.map(([title, description], index) => (
          <article className="theme-card" key={title}>
            <span className="theme-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div></section>
    </main>
  );
}

function InvitedSpeakersPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Conference speakers" title="Invited Speakers">Speaker names, designations, and affiliations will be added here when officially announced.</PageIntro>
      <section className="section"><div className="container speaker-grid">
        {INVITED_SPEAKERS.map((speaker, index) => (
          <article className="speaker-card" key={`${speaker.name}-${index}`}>
            <div className="speaker-avatar" aria-hidden="true">{speaker.name.split(" ")[0].slice(0, 2).toUpperCase()}</div>
            <h3>{speaker.name}</h3>
            <p className="speaker-role">{speaker.designation}</p>
            <p>{speaker.affiliation}</p>
            <span>{speaker.topic}</span>
          </article>
        ))}
      </div></section>
    </main>
  );
}

function ContactPage() {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Dr.+B.+R.+Ambedkar+National+Institute+of+Technology+Jalandhar";
  const mapEmbedUrl = "https://maps.google.com/maps?q=Dr.%20B.%20R.%20Ambedkar%20National%20Institute%20of%20Technology%20Jalandhar&z=15&output=embed";

  return (
    <main className="content-page">
      <PageIntro eyebrow="Get in touch" title="Contact &amp; location">Find the conference venue and contact the organizing team.</PageIntro>
      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <p className="eyebrow">Conference location</p>
              <h2>Dr. B. R. Ambedkar NIT Jalandhar</h2>
              <p>Department of Chemical Engineering<br />Dr. B. R. Ambedkar National Institute of Technology Jalandhar-144008, Punjab, India</p>
              <a className="inline-link" href="https://www.nitj.ac.in/" target="_blank" rel="noopener noreferrer">NIT Jalandhar website <span>↗</span></a>
            </div>
            <div className="contact-card contact-location">
              <span aria-hidden="true">⌖</span>
              <div><strong>Getting to the institute</strong><p>15 km from Jalandhar Bus Stand · 12 km from Jalandhar City Railway Station · 18 km from Jalandhar Cantt. Railway Station.</p></div>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              title="Map showing Dr. B. R. Ambedkar NIT Jalandhar"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a className="inline-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Open NIT Jalandhar in Google Maps <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="section"><div className="container">
        <div className="contact-people-heading"><span className="placeholder-badge">Phone numbers and emails not provided</span><h2>Conference contact persons</h2><p>Phone numbers and email addresses will be added when officially provided.</p></div>
        <div className="contact-people-grid">{CONTACT_PERSONS.map((person) => <article className="contact-person-card" key={person.name}><h3>{person.name}</h3><p className="contact-person-role">{person.designation}</p><dl><div><dt>Phone</dt><dd>[TO BE PROVIDED]</dd></div><div><dt>Email</dt><dd>[TO BE PROVIDED]</dd></div></dl></article>)}</div>
      </div></section>
    </main>
  );
}

function FormDestination({ label, description, url }) {
  const formUrl = (url || "").trim();
  const isAvailable = isValidFormUrl(formUrl);
  const content = (
    <>
      <span className="form-destination-icon" aria-hidden="true">{isAvailable ? "↗" : "○"}</span>
      <span className="form-destination-copy"><strong>{label}</strong><span>{description}</span></span>
      <span className="form-destination-status">{isAvailable ? "Open Google Form" : "Google Forms link to be added"}</span>
    </>
  );

  return isAvailable ? (
    <a className="form-destination" href={formUrl} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <div className="form-destination is-unavailable" aria-disabled="true">{content}</div>
  );
}

function SubmissionRegistrationPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="For participants and authors" title="Abstract submission &amp; registration">Choose the appropriate Google Form to submit an abstract or register for the conference.</PageIntro>
      <section className="section registration-section"><div className="container form-destination-list">
        <FormDestination label="Abstract submission" description="Submit your abstract for consideration." url={ABSTRACT_SUBMISSION_URL} />
        <FormDestination label="Conference registration" description="Register to attend the conference." url={REGISTRATION_URL} />
        <p className="registration-note">The Google Forms links will be activated as soon as they are provided.</p>
      </div></section>
    </main>
  );
}

function AnnouncementsPage() {
  return (
    <main className="content-page">
      <PageIntro eyebrow="Conference updates" title="Announcements">Official announcements and deadline updates will be maintained here.</PageIntro>
      <section className="section"><div className="container homepage-updates-grid announcement-single"><AnnouncementsCard /></div></section>
    </main>
  );
}

function PageIntro({ eyebrow, title, children }) {
  return <section className="page-intro"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{children}</p></div></section>;
}

function AnnouncementsCard() {
  const latest = ANNOUNCEMENTS.find((announcement) => announcement.latest) || ANNOUNCEMENTS[0];
  const announcementDate = new Date();
  const announcementDateLabel = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(announcementDate);
  const announcementDateValue = [
    announcementDate.getFullYear(),
    String(announcementDate.getMonth() + 1).padStart(2, "0"),
    String(announcementDate.getDate()).padStart(2, "0")
  ].join("-");

  return (
    <article className="announcements-card" id="announcements" aria-labelledby="announcements-title">
      <div className="announcements-heading">
        <div><p className="eyebrow">Conference updates</p><h2 id="announcements-title">Announcements</h2></div>
        <span className="placeholder-badge">Key dates</span>
      </div>
      {latest && <div className="latest-announcement">
        <h3>{latest.title}</h3>
        <p className="announcement-date">Announced <time dateTime={announcementDateValue}>{announcementDateLabel}</time></p>
        <p>{latest.body}</p>
      </div>}
      <div className="deadline-list" aria-label="Conference deadlines">
        {DEADLINES.map(({ label, value }) => <p className="deadline-item" key={label}><strong>{label}:</strong><span>{value}</span></p>)}
      </div>
    </article>
  );
}

function BrochureCard() {
  return (
    <article className="brochure-card">
      <p className="eyebrow">Organised by the Department of Chemical Engineering</p>
      <h2>Brochure</h2>
      <p>Read or download the CHEMBIOEN 2027 conference brochure.</p>
      <a className="button button-outline" href={brochureUrl} target="_blank" rel="noopener noreferrer">View brochure <span aria-hidden="true">↗</span></a>
      <a className="brochure-download" href={brochureUrl} download>Download the brochure</a>
    </article>
  );
}

function SubmissionCard() {
  return (
    <Link className="submission-card" to="/abstract-submission-registration">
      <p className="eyebrow">For participants and authors</p>
      <h2>Abstract submission &amp; registration</h2>
      <p>Use the official Google Forms to submit an abstract or register for the conference.</p>
      <span className="button button-primary">Click here <span aria-hidden="true">→</span></span>
    </Link>
  );
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
        <Route path="/registration" element={<SubmissionRegistrationPage />} />
        <Route path="/abstract-submission-registration" element={<SubmissionRegistrationPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/publications/:publicationId" element={<PublicationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="site-footer">
        <div className="container footer-main">
          <Link className="brand" to="/"><span className="brand-symbol"><span>CB</span><i /></span><span className="brand-words"><strong>chembioen <em>2027</em></strong><small>International Conference</small></span></Link>
          <p>Department of Chemical Engineering, Dr. B. R. Ambedkar NIT Jalandhar.</p>
          <div className="footer-links"><Link to="/about">About</Link><Link to="/thematic-areas">Themes</Link><Link to="/publications">Publications</Link><Link to="/contact">Contact</Link></div>
        </div>
        <div className="footer-bottom"><div className="container"><span>© 2027 CHEMBIOEN</span><span>Official NIT Jalandhar conference portal</span></div></div>
      </footer>
    </>
  );
}

export default App;
