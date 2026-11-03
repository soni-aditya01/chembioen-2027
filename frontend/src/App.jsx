
import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ANNOUNCEMENTS,
  ABSTRACT_SUBMISSION_URL,
  CONTACT_PERSONS,
  DEADLINES,
  HOMEPAGE_CAMPUS_SLIDES,
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
                  <Link className="previous-conference-item" key={conference.year} to={conference.archiveUrl} onClick={closeMenu}>
                    <strong>CHEMBIOEN {conference.year}</strong>
                    <span>Overview, reports &amp; contacts <span aria-hidden="true">→</span></span>
                  </Link>
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
        <div className="container">
          <div className="homepage-campus-feature">
            <div className="homepage-campus-copy">
              <p className="eyebrow">Our conference home</p>
              <h1>Welcome to NIT Jalandhar</h1>
              <p>A glimpse of the campus hosting CHEMBIOEN 2027.</p>
            </div>
            <CampusSlideshow />
          </div>
          <div className="homepage-updates-grid">
            <AnnouncementsCard />
            <BrochureCard />
            <SubmissionCard />
          </div>
        </div>
      </section>
    </main>
  );
}

function CampusSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const activeSlide = HOMEPAGE_CAMPUS_SLIDES[activeIndex];

  useEffect(() => {
    if (paused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % HOMEPAGE_CAMPUS_SLIDES.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [paused]);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + HOMEPAGE_CAMPUS_SLIDES.length) % HOMEPAGE_CAMPUS_SLIDES.length);
  };
  const showNext = () => {
    setActiveIndex((index) => (index + 1) % HOMEPAGE_CAMPUS_SLIDES.length);
  };

  return (
    <div className="homepage-campus-slideshow" role="region" aria-label="NIT Jalandhar campus photos" aria-roledescription="carousel">
      <figure className="homepage-campus-slide" aria-roledescription="slide" aria-label={`${activeIndex + 1} of ${HOMEPAGE_CAMPUS_SLIDES.length}`}>
        <img src={activeSlide.image} alt={activeSlide.alt} />
        <figcaption className="homepage-campus-caption">
          <strong>{activeSlide.caption}</strong>
          <span>
            <a href={activeSlide.sourceUrl} target="_blank" rel="noopener noreferrer">Photo: {activeSlide.credit}</a>
            {activeSlide.license && <> · <a href={activeSlide.licenseUrl} target="_blank" rel="noopener noreferrer">{activeSlide.license}</a></>}
          </span>
        </figcaption>
      </figure>
      <div className="homepage-campus-controls">
        <div className="homepage-campus-dots" aria-label="Choose a campus photo">
          {HOMEPAGE_CAMPUS_SLIDES.map((slide, index) => (
            <button
              className={`homepage-campus-dot${index === activeIndex ? " is-active" : ""}`}
              key={slide.image}
              type="button"
              aria-label={`Show photo ${index + 1}: ${slide.caption}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <div className="homepage-campus-actions">
          <button type="button" aria-label="Show previous campus photo" onClick={showPrevious}>‹</button>
          <button type="button" aria-label={paused ? "Play campus slideshow" : "Pause campus slideshow"} onClick={() => setPaused((value) => !value)}>{paused ? "▶" : "Ⅱ"}</button>
          <button type="button" aria-label="Show next campus photo" onClick={showNext}>›</button>
        </div>
      </div>
    </div>
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
      <PageIntro eyebrow="CHEMBIOEN 2027 · Featured experts" title="Invited Speakers">Meet the experts joining us to share ideas and perspectives across chemical, bio and environmental engineering.</PageIntro>
      <section className="speaker-overview">
        <div className="container speaker-overview-inner">
          <div>
            <p className="speaker-overview-label">A global exchange of ideas</p>
            <h2>Research that moves<br />engineering forward.</h2>
          </div>
          <div className="speaker-overview-meta">
            <div><strong>{INVITED_SPEAKERS.length}</strong><span>invited experts</span></div>
            <p>International and national perspectives in one forum.</p>
          </div>
        </div>
      </section>
      <section className="section invited-speakers-section">
        <div className="container">
          <div className="speaker-grid">
            {INVITED_SPEAKERS.map((speaker, index) => (
              <article className="invited-speaker-card" key={speaker.name} style={{ "--speaker-order": index }}>
                <div className="invited-speaker-card-top">
                  <div className="speaker-avatar" aria-hidden="true">{speaker.initials}</div>
                  <span className="invited-speaker-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="invited-speaker-designation">{speaker.designation}</p>
                <h3>{speaker.name}</h3>
                <p className="invited-speaker-affiliation">{speaker.affiliation}</p>
                <div className="invited-speaker-topic">
                  <span className="invited-speaker-topic-label">TALKING ABOUT</span>
                  {speaker.topicUrl
                    ? <a href={speaker.topicUrl} target="_blank" rel="noopener noreferrer">{speaker.topic} <span aria-hidden="true">↗</span></a>
                    : <p>{speaker.topic}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
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
        <div className="contact-people-heading"><h2>Conference contact persons</h2><p>Contact the organizing team at the Department of Chemical Engineering, NIT Jalandhar.</p></div>
        <div className="contact-people-grid">{CONTACT_PERSONS.map((person) => <article className="contact-person-card" key={person.name}><h3>{person.name}</h3><p className="contact-person-role">{person.designation}</p><dl><div><dt>Phone</dt><dd><a href={`tel:${person.phone}`}>{person.phone}</a></dd></div><div><dt>Email</dt><dd><a href={`mailto:${person.email}`}>{person.email}</a></dd></div></dl></article>)}</div>
      </div></section>
    </main>
  );
}

function FormDestination({ number, label, description, url }) {
  const formUrl = (url || "").trim();
  const isAvailable = isValidFormUrl(formUrl);
  const content = (
    <>
      <span className="form-destination-number" aria-hidden="true">{number}</span>
      <span className="form-destination-copy">
        <span className="form-destination-kicker">{isAvailable ? "READY TO OPEN" : "COMING SOON"}</span>
        <strong>{label}</strong>
        <span>{description}</span>
      </span>
      <span className="form-destination-status">{isAvailable ? "Continue to form" : "Form link will be added"}<span aria-hidden="true">{isAvailable ? "↗" : "→"}</span></span>
    </>
  );

  return isAvailable ? (
    <a className="form-destination" href={formUrl} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <div className="form-destination is-unavailable" aria-disabled="true">{content}</div>
  );
}

function SubmissionRegistrationPage() {
  const conferenceDates = DEADLINES.find(({ label }) => label === "Conference Dates")?.value;
  const abstractDeadline = DEADLINES.find(({ label }) => label === "Abstract Submission Deadline")?.value;
  const registrationDeadline = DEADLINES.find(({ label }) => label === "Registration Deadline")?.value;

  return (
    <main className="content-page">
      <PageIntro eyebrow="Join the conversation" title="Abstract submission &amp; registration">Present your research or join us in Jalandhar. Choose the option that best describes how you’ll take part in CHEMBIOEN 2027.</PageIntro>
      <section className="section registration-section">
        <div className="container registration-layout">
          <div className="registration-main">
            <div className="registration-heading">
              <p className="eyebrow">Take your next step</p>
              <h2>How would you like to participate?</h2>
              <p>Submit your abstract using the online form. Registration details will be added when available.</p>
            </div>
            <div className="form-destination-list">
              <FormDestination number="01" label="Submit an abstract" description="Share your research for consideration in the conference programme." url={ABSTRACT_SUBMISSION_URL} />
              <FormDestination number="02" label="Register to attend" description="Join researchers, academics and industry professionals at CHEMBIOEN 2027." url={REGISTRATION_URL} />
            </div>
            <p className="registration-note"><span aria-hidden="true">ⓘ</span> Abstract submission is open. The registration link will be added when available.</p>
          </div>
          <aside className="registration-at-a-glance" aria-labelledby="registration-glance-title">
            <p className="eyebrow">Plan your participation</p>
            <h2 id="registration-glance-title">Conference at a glance</h2>
            <div className="registration-glance-item">
              <span className="registration-glance-icon" aria-hidden="true">◷</span>
              <div><span>Conference dates</span><strong>{conferenceDates}</strong></div>
            </div>
            <div className="registration-glance-item">
              <span className="registration-glance-icon" aria-hidden="true">⌖</span>
              <div><span>Venue</span><strong>Dr. B. R. Ambedkar NIT Jalandhar</strong></div>
            </div>
            <div className="registration-glance-item">
              <span className="registration-glance-icon" aria-hidden="true">▤</span>
              <div><span>Abstract submission deadline</span><strong>{abstractDeadline}</strong></div>
            </div>
            <div className="registration-glance-item">
              <span className="registration-glance-icon" aria-hidden="true">◷</span>
              <div><span>Registration deadline</span><strong>{registrationDeadline}</strong></div>
            </div>
            <div className="registration-glance-divider" />
            <p className="registration-glance-help">Need assistance with participation?</p>
            <Link className="registration-contact-link" to="/contact">Contact the organizing team <span aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </section>
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

function PreviousConferenceArchivePage() {
  const { year } = useParams();
  const conference = PREVIOUS_CONFERENCES.find((item) => item.year === year && item.archiveUrl);
  if (!conference) return <NotFound />;

  return (
    <main className="content-page">
      <PageIntro eyebrow={`Previous conference · ${conference.year}`} title={`CHEMBIOEN ${conference.year}`}>A look back at the people, research and conversations that brought the conference together.</PageIntro>
      <section className="section conference-archive-section">
        <div className={`container conference-archive-layout${conference.imageUrl ? "" : " has-no-image"}`}>
          {conference.imageUrl && (
            <figure className="conference-archive-image">
              <img src={conference.imageUrl} alt={conference.imageAlt} />
              <figcaption>{conference.imageCaption}</figcaption>
            </figure>
          )}
          <article className="conference-archive-summary">
            <p className="eyebrow">A look back</p>
            <h2>Research, dialogue and shared discovery</h2>
            <p>{conference.description}</p>
            <div className="conference-archive-stats" aria-label={`CHEMBIOEN ${conference.year} highlights`}>
              {conference.highlights.map((highlight) => (
                <div key={highlight.label}><strong>{highlight.value}</strong><span>{highlight.label}</span></div>
              ))}
            </div>
            <Link className="inline-link" to="/">Explore CHEMBIOEN 2027 <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>
      <section className="section conference-archive-resources-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Conference library</p>
            <h2>Brochures &amp; reports</h2>
            <p>Find conference publications and records in one place.</p>
          </div>
          <div className="conference-archive-resource-list">
            {conference.resources.map((resource) => (
              <article className="conference-archive-resource-card" key={resource.fileName}>
                <span className="conference-archive-resource-format" aria-hidden="true">{resource.format}</span>
                <div>
                  <h3>{resource.title}</h3>
                  <p>{resource.fileName}</p>
                </div>
                {resource.url
                  ? <a
                    className="conference-archive-resource-link"
                    href={resource.url}
                    target={resource.format === "PDF" ? "_blank" : undefined}
                    rel={resource.format === "PDF" ? "noopener noreferrer" : undefined}
                    download={resource.format === "PDF" ? undefined : true}
                  >{resource.format === "PDF" ? "Open PDF" : `Download ${resource.format}`}</a>
                  : <span className="conference-archive-resource-status">File not uploaded yet</span>}
              </article>
            ))}
          </div>
        </div>
      </section>
      {conference.gallery?.length > 0 && (
        <section className="section conference-archive-gallery-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">At the conference</p>
              <h2>Moments from CHEMBIOEN {conference.year}</h2>
              <p>A look back at the people, sessions and shared research that brought the conference together.</p>
            </div>
            <div className="conference-archive-gallery">
              {conference.gallery.map((photo) => (
                <figure className="conference-archive-gallery-card" key={photo.imageUrl}>
                  <img src={photo.imageUrl} alt={photo.imageAlt} loading="lazy" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
      {conference.pressCoverage && (
        <section className="section conference-archive-press-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">In the media</p>
              <h2>CHEMBIOEN {conference.year} in the press</h2>
              <p>Newspaper coverage documenting the conference and its conversations on environmental engineering.</p>
            </div>
            <div className="conference-archive-press-grid">
              {conference.pressCoverage.map((item) => (
                <figure className="conference-archive-press-card" key={item.imageUrl}>
                  <img src={item.imageUrl} alt={item.imageAlt} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
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
        <Route path="/previous-conferences/:year" element={<PreviousConferenceArchivePage />} />
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
