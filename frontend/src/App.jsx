import { createContext, useContext, useEffect, useState } from "react";
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, login, logout, register } from "./api.js";

const AuthContext = createContext(null);
const dates = [
  ["Conference dates", "[TO BE ANNOUNCED]"],
  ["Abstract submission deadline", "[TO BE ANNOUNCED]"],
  ["Registration deadline", "[TO BE ANNOUNCED]"]
];
const themes = [
  ["Sustainable Process Design, Green Chemistry & Clean Technologies", "Sustainable process design, green chemistry and clean technologies."],
  ["Bioprocess Engineering, Industrial Biotechnology & Biorefineries", "Bioprocess engineering, industrial biotechnology and biorefinery research."],
  ["Biomass, Bioenergy & Waste-to-Value Technologies", "Biomass conversion, bioenergy and value recovery from waste."],
  ["Advanced Materials, Catalysis & Reaction Engineering", "Advanced materials, catalytic systems and reaction engineering."],
  ["Water & Wastewater Treatment and Resource Recovery", "Water treatment, wastewater treatment and resource recovery."],
  ["Air Pollution Control, Monitoring & Remediation", "Air pollution control, environmental monitoring and remediation."],
  ["Carbon Capture, Climate Mitigation & Circular Economy", "Carbon capture, climate change mitigation and circular economy."],
  ["AI, Digitalization & Process Intensification", "AI and digitalization for sustainable engineering and process intensification."]
];
const fees = [
  ["Students (UG/PG)", "₹500", "$50"],
  ["Ph.D. / RA / Postdoc", "₹1,500", "$100"],
  ["Faculty", "₹3,500", "$150"],
  ["Industry professionals", "₹5,000", "$200"]
];
const committeeGroups = [
  {
    title: "Patron",
    members: ["Prof. Binod Kumar Kanaujia, Director, NIT Jalandhar"]
  },
  {
    title: "Co-Patrons",
    members: [
      "Prof. Rohit Mehra, Dean R&C, NIT Jalandhar",
      "Prof. Anish Kumar Sachdeva, Registrar, NIT Jalandhar"
    ]
  },
  { title: "Chairperson", members: ["Dr. Jatinder Kumar Ratan"] },
  {
    title: "Organizing Secretaries",
    members: ["Dr. Nitin Naresh Pandhare", "Dr. Anjireddy Bhavanam", "Dr. Deepak Sahu"]
  }
];
const localOrganizers = [
  "Dr. M. K. Jha",
  "Dr. Ajay Bansal",
  "Dr. Shailendra Bajpai",
  "Dr. Sangeeta Garg",
  "Dr. Renu Gupta",
  "Dr. N. K. Srivastava",
  "Dr. Poonam Gera",
  "Dr. Raj Kumar Arya",
  "Dr. Neetu Divya",
  "Dr. Amit Dhruv Saran",
  "Dr. Anurag K. Tiwari",
  "Dr. Shashikant Yadav",
  "Dr. D. Giri Babu",
  "Dr. Umasankar Erigi"
];
const fieldMessages = {
  name: "Enter your full name (at least 2 characters).",
  email: "Enter a valid email address.",
  phone: "Enter a valid phone number.",
  institution: "Enter your institution or organization.",
  department: "Enter your department.",
  designation: "Select your participant category.",
  password: "Use a password with at least 12 characters.",
  confirmPassword: "Confirm your password."
};

function useAuth() {
  return useContext(AuthContext);
}

function Header() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const closeMenu = () => setMenuOpen(false);
  async function handleSignOut() {
    setLogoutError("");
    try {
      await signOut();
    } catch (error) {
      setLogoutError(error.message);
    }
  }
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
            <a href="/#home" onClick={closeMenu}>Home</a><a href="/#about" onClick={closeMenu}>About</a>
            <a href="/#themes" onClick={closeMenu}>Thematic Areas</a><a href="/#publications" onClick={closeMenu}>Publications</a>
            <a href="/#speakers" onClick={closeMenu}>Invited Speakers</a><a href="/#committee" onClick={closeMenu}>Committee</a>
            <a href="/#workshop" onClick={closeMenu}>Pre-Conference Workshop</a><a href="/#sponsors" onClick={closeMenu}>Sponsors</a>
            <a href="/#registration" onClick={closeMenu}>Registration</a><a href="/#contact" onClick={closeMenu}>Contact</a>
          </div>
          <div className="nav-actions">
            {user ? <><span className="user-greeting">Hello, {user.name.split(" ")[0]}</span><button className="button button-outline button-small" onClick={handleSignOut}>Log out</button></> : <><NavLink className="login-link" to="/login" onClick={closeMenu}>Log in</NavLink><Link className="button button-primary button-small" to="/register" onClick={closeMenu}>Register</Link></>}
          </div>
          {logoutError && <p className="logout-error" role="alert">{logoutError}</p>}
        </div>
      </nav>
    </header>
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
              {announcements.map((announcement) => (
                <span className="ticker-item" key={announcement}><i>★</i>{announcement}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className="ticker-toggle" type="button" aria-label={paused ? "Resume moving announcements" : "Pause moving announcements"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "▶" : "Ⅱ"}</button>
    </div>
  );
}

function Home() {
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message ?? "");
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (
    <main>
      {message && <div className="flash-success container" role="status">{message}<button type="button" aria-label="Dismiss message" onClick={() => setMessage("")}>×</button></div>}
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
            <div className="hero-detail-actions"><a className="button button-primary" href="/Brochure_Chembioen_2027.pdf" target="_blank" rel="noopener noreferrer">View brochure <span aria-hidden="true">↗</span></a><Link className="button button-outline" to="/register">Create account</Link></div>
          </article>
          <div className="hero-showcase" role="img" aria-label="Original abstract illustration representing chemistry, biology and engineering">
            <div className="showcase-orbit showcase-orbit-one" /><div className="showcase-orbit showcase-orbit-two" />
            <div className="showcase-node node-one">C</div><div className="showcase-node node-two">B</div><div className="showcase-node node-three">E</div>
            <div className="showcase-core"><span>C</span><i>×</i><span>B</span></div>
            <div className="showcase-caption"><span>CHEMISTRY</span><i /><span>BIOLOGY</span><i /><span>ENGINEERING</span></div>
          </div>
        </div>
      </section>
      <section className="overview container" id="dates">
        <article className="overview-intro"><p className="eyebrow">Mark your calendar</p><h2>Important dates</h2><p>The brochure does not list dates yet. Updates will be posted when announced.</p></article>
        {dates.map(([label, date], index) => <article className="date-card" key={label}><span className="date-index">0{index + 1}</span><h3>{label}</h3><p>{date}</p></article>)}
      </section>
      <section className="section about-section" id="about"><div className="container about-layout">
        <div className="about-visual"><div className="visual-orbit" /><div className="visual-mark">C<span>×</span>B</div><p>INTERDISCIPLINARY<br />BY NATURE</p></div>
        <div className="about-copy"><p className="eyebrow">The conference</p><h2>Chemical, Bio &amp;<br /><span>Environmental Engineering</span></h2><p>The 4th International Conference on Chemical, Bio &amp; Environmental Engineering brings academic scientists, researchers, scholars, practitioners and educators together to exchange research and discuss current innovations, trends, concerns, practical challenges and solutions in chemical and environmental engineering.</p><p className="placeholder-note">Organized by the Department of Chemical Engineering, Dr. B. R. Ambedkar National Institute of Technology Jalandhar, Punjab, India.</p><a className="inline-link" href="#themes">Explore the conference topics <span>→</span></a></div>
      </div></section>
      <section className="section themes-section" id="themes"><div className="container">
        <SectionHeading eyebrow="Conference scope" title="Thematic areas">The brochure lists the following conference topics, including but not limited to these areas.</SectionHeading>
        <div className="theme-grid">{themes.map(([title, description], i) => <article className="theme-card" key={title}><span className="theme-number">0{i + 1}</span><span className="theme-icon" aria-hidden="true">{["⌬", "◈", "⌘", "♧", "✳", "⊕"][i]}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </div></section>
      <section className="section publication-section" id="publications"><div className="container">
        <SectionHeading eyebrow="For authors" title="Abstracts & publications">Academicians, researchers and practicing professionals are invited to submit abstracts on Biofuels and Biomaterials and related topics.</SectionHeading>
        <div className="information-placeholder"><span aria-hidden="true">▤</span><div><h3>Submission and peer review</h3><p>Following abstract acceptance, authors should submit full papers for peer review. The brochure states that selected papers shall be published in Scopus/SCI-indexed journals or proceedings. Submission dates and instructions are to be announced.</p><a className="inline-link" href="/Brochure_Chembioen_2027.pdf" target="_blank" rel="noopener noreferrer">Read the conference brochure <span>↗</span></a></div></div>
      </div></section>
      <section className="programme-section" id="programme"><div className="container programme-layout"><div><p className="eyebrow eyebrow-light">Conference objectives</p><h2>Research that<br />moves fields forward.</h2><p>The conference is an interdisciplinary forum to present research, exchange results and discuss recent innovations, practical challenges and solutions across chemical and environmental engineering.</p><a className="button button-gold" href="/Brochure_Chembioen_2027.pdf" target="_blank" rel="noopener noreferrer">Read the brochure <span>↗</span></a></div>
        <div className="programme-list"><article><span>01</span><div><h3>Exchange research results</h3><p>Academic scientists, researchers and scholars</p></div><b>↗</b></article><article><span>02</span><div><h3>Present abstracts and full papers</h3><p>Abstract acceptance followed by peer review</p></div><b>↗</b></article><article><span>03</span><div><h3>Discuss engineering challenges</h3><p>Chemical, bio and environmental engineering</p></div><b>↗</b></article></div>
      </div></section>
      <section className="section speakers-section" id="speakers"><div className="container">
        <SectionHeading eyebrow="Conference speakers" title="Invited speakers">The brochure does not list invited speakers. Names and affiliations will be added when officially announced.</SectionHeading>
        <div className="sponsor-placeholder">[INVITED SPEAKERS TO BE ANNOUNCED]</div>
      </div></section>
      <section className="section community-section" id="committee"><div className="container"><SectionHeading eyebrow="Conference leadership" title="Organizing committee">Committee roles and names below are transcribed from the conference brochure.</SectionHeading>
        <div className="committee-groups">{committeeGroups.map((group) => <article className="committee-group" key={group.title}><h3>{group.title}</h3>{group.members.map((member) => <p key={member}>{member}</p>)}</article>)}</div>
        <details className="local-organizers"><summary>Local Organizing Committee <span>(14 members)</span></summary><ul>{localOrganizers.map((member) => <li key={member}>{member}</li>)}</ul></details>
      </div></section>
      <section className="section workshop-section" id="workshop"><div className="container">
        <SectionHeading eyebrow="Before the conference" title="Pre-conference workshop">The brochure does not provide workshop details. Any workshop announcement will be added when confirmed.</SectionHeading>
        <div className="information-placeholder"><span aria-hidden="true">✳</span><div><h3>Workshop information not in brochure</h3><p>[Workshop schedule and participation details to be announced, if applicable.]</p></div></div>
      </div></section>
      <section className="section sponsors-section" id="sponsors"><div className="container">
        <SectionHeading eyebrow="Partners & supporters" title="Sponsors">The brochure does not identify sponsors or partners.</SectionHeading>
        <div className="sponsor-placeholder">[SPONSORS AND PARTNERS TO BE ANNOUNCED]</div>
      </div></section>
      <section className="section registration-section" id="registration"><div className="container"><SectionHeading eyebrow="Attend ChemBioEN-2027" title="Registration fees">The brochure lists the following fees. Dates and the registration process are to be announced.</SectionHeading>
        <div className="fee-table-wrap"><table className="fee-table"><caption>Registration fee categories from the conference brochure</caption><thead><tr><th scope="col">Participant category</th><th scope="col">Indian participants (₹)</th><th scope="col">Foreign participants ($)</th></tr></thead><tbody>{fees.map(([category, indian, foreign]) => <tr key={category}><th scope="row">{category}</th><td>{indian}</td><td>{foreign}</td></tr>)}</tbody></table></div>
        <p className="registration-note">The brochure does not state payment instructions or registration deadlines.</p>
        <div className="registration-actions"><Link className="button button-primary" to="/register">Create account <span>→</span></Link><a className="button button-outline" href="/Brochure_Chembioen_2027.pdf" target="_blank" rel="noopener noreferrer">View brochure ↗</a></div>
      </div></section>
      <section className="contact-section" id="contact"><div className="container contact-layout"><div><p className="eyebrow">Get in touch</p><h2>Conference location</h2><p>Department of Chemical Engineering<br />Dr. B. R. Ambedkar National Institute of Technology Jalandhar-144008, Punjab, India</p><a className="inline-link" href="https://www.nitj.ac.in/" target="_blank" rel="noopener noreferrer">NIT Jalandhar website <span>↗</span></a></div><div className="contact-card contact-location"><span>⌖</span><div><strong>Getting to the institute</strong><p>15 km from Jalandhar Bus Stand · 12 km from Jalandhar City Railway Station · 18 km from Jalandhar Cantt. Railway Station, as stated in the brochure.</p></div></div></div></section>
    </main>
  );
}

function AuthLayout({ eyebrow, title, description, children }) {
  return <main className="auth-page"><div className="auth-aside"><div className="auth-aside-content"><Link className="brand brand-light" to="/"><span className="brand-symbol"><span>CB</span><i /></span><span className="brand-words"><strong>ChemBioEN <em>2027</em></strong><small>International Conference</small></span></Link><p className="eyebrow eyebrow-light">{eyebrow}</p><h1>{title}</h1><p>{description}</p><div className="aside-dots" aria-hidden="true"><i /><i /><i /></div></div><span className="auth-aside-footer">CHEMBIOEN · 2027</span></div><div className="auth-form-wrap"><Link className="back-home" to="/">← Back to conference</Link><section className="auth-card">{children}</section></div></main>;
}

function Field({ label, name, type = "text", required = true, autoComplete, ...props }) {
  return <div className="form-field"><label htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}</label><input id={name} name={name} type={type} autoComplete={autoComplete} required={required} {...props} /></div>;
}

function RegistrationPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const validate = (values) => {
    const found = {};
    Object.entries(fieldMessages).forEach(([key, message]) => {
      if (!values[key]?.trim()) found[key] = message;
    });
    if (values.name && values.name.trim().length < 2) found.name = fieldMessages.name;
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) found.email = fieldMessages.email;
    if (values.phone && !/^[+\d][\d\s().-]{6,23}$/.test(values.phone)) found.phone = fieldMessages.phone;
    if (values.password && values.password.length < 12) found.password = fieldMessages.password;
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) found.confirmPassword = "Passwords do not match.";
    if (!values.termsAccepted) found.termsAccepted = "Accept the terms and conditions to continue.";
    return found;
  };
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    values.termsAccepted = form.get("terms") === "on";
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    setSubmitting(true);
    try {
      const result = await register(values);
      setUser(result.user);
      navigate("/", { state: { message: "Registration successful. You are signed in." } });
    } catch (requestError) {
      setError(requestError.message);
      setErrors(Object.fromEntries(requestError.details.map((item) => [item.field, item.message])));
    } finally {
      setSubmitting(false);
    }
  }
  return <AuthLayout eyebrow="Join the community" title="Your next discovery starts here." description="Create your account to take part in ChemBioEN 2027 and receive conference updates."><p className="eyebrow">CREATE AN ACCOUNT</p><h2>Register</h2><p className="auth-intro">Fields marked <span>*</span> are required.</p>
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <Field name="name" label="Full name" autoComplete="name" maxLength={120} aria-invalid={Boolean(errors.name)} />
      <Field name="email" label="Email address" type="email" autoComplete="email" maxLength={254} aria-invalid={Boolean(errors.email)} />
      <Field name="phone" label="Phone number" type="tel" autoComplete="tel" maxLength={24} aria-invalid={Boolean(errors.phone)} />
      <Field name="institution" label="Institution or organization" autoComplete="organization" maxLength={160} aria-invalid={Boolean(errors.institution)} />
      <Field name="department" label="Department" autoComplete="organization-title" maxLength={120} aria-invalid={Boolean(errors.department)} />
      <div className="form-field"><label htmlFor="designation">Designation / participant category <span aria-hidden="true">*</span></label><select id="designation" name="designation" defaultValue="" required aria-invalid={Boolean(errors.designation)}><option value="" disabled>Select a category</option><option>Students (UG/PG)</option><option>Ph.D. / RA / Postdoc</option><option>Faculty</option><option>Industry professional</option></select></div>
      <Field name="password" label="Password (12 characters minimum)" type="password" autoComplete="new-password" minLength={12} maxLength={72} aria-invalid={Boolean(errors.password)} />
      <Field name="confirmPassword" label="Confirm password" type="password" autoComplete="new-password" minLength={12} maxLength={72} aria-invalid={Boolean(errors.confirmPassword)} />
      {Object.entries(errors).map(([field, message]) => <p className="field-error" key={field}>{message}</p>)}
      {error && <p className="form-alert" role="alert">{error}</p>}
      <label className="terms-check"><input type="checkbox" name="terms" required /><span>I agree to the <a href="#terms" onClick={(event) => event.preventDefault()}>terms and conditions</a>. <small>[Terms will be published before registration opens.]</small></span></label>
      {errors.termsAccepted && <p className="field-error">{errors.termsAccepted}</p>}
      <button className="button button-primary submit-button" type="submit" disabled={submitting}>{submitting ? <><span className="spinner" /> Creating account…</> : <>Create account <span>→</span></>}</button>
    </form><p className="auth-switch">Already registered? <Link to="/login">Log in</Link></p>
  </AuthLayout>;
}

function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!values.password) {
      setError("Enter your password.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await login({ email: values.email, password: values.password });
      setUser(result.user);
      navigate("/", { state: { message: "Welcome back. You are signed in." } });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }
  return <AuthLayout eyebrow="Welcome back" title="Pick up where discovery left off." description="Sign in to manage your ChemBioEN 2027 conference account."><p className="eyebrow">YOUR CONFERENCE ACCOUNT</p><h2>Log in</h2><p className="auth-intro">Enter the email and password you registered with.</p>
    <form className="auth-form login-form" onSubmit={handleSubmit} noValidate>
      <Field name="email" label="Email address" type="email" autoComplete="email" aria-invalid={Boolean(error)} />
      <div className="form-field"><div className="password-label"><label htmlFor="password">Password <span aria-hidden="true">*</span></label><button type="button" className="text-button" onClick={() => setShowPassword(!showPassword)} aria-pressed={showPassword}>{showPassword ? "Hide" : "Show"}</button></div><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required aria-invalid={Boolean(error)} /></div>
      <div className="forgot-row"><button type="button" className="text-button" onClick={() => setNotice("Password recovery is not available yet. Please contact the conference team once contact details are published.")}>Forgot password?</button></div>
      {error && <p className="form-alert" role="alert">{error}</p>}{notice && <p className="form-notice" role="status">{notice}</p>}
      <button className="button button-primary submit-button" type="submit" disabled={submitting}>{submitting ? <><span className="spinner" /> Signing in…</> : <>Log in <span>→</span></>}</button>
    </form><p className="auth-switch">New to ChemBioEN? <Link to="/register">Create an account</Link></p>
  </AuthLayout>;
}

function NotFound() {
  return <main className="not-found"><p className="eyebrow">PAGE NOT FOUND</p><h1>That page isn't here.</h1><Link className="button button-primary" to="/">Return to home</Link></main>;
}

function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  async function signOut() {
    try {
      await logout();
      setUser(null);
      navigate("/", { state: { message: "You have been logged out." } });
    } catch {
      throw new Error("Logout could not be completed. Check your connection and try again.");
    }
  }
  useEffect(() => {
    getCurrentUser().then((result) => setUser(result.user)).catch(() => setUser(null)).finally(() => setAuthReady(true));
  }, []);
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  if (!authReady) return <div className="app-loading" role="status">Loading ChemBioEN…</div>;
  return <AuthContext.Provider value={{ user, setUser, signOut }}><Header /><Routes><Route path="/" element={<Home />} /><Route path="/register" element={user ? <Navigate to="/" replace /> : <RegistrationPage />} /><Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} /><Route path="*" element={<NotFound />} /></Routes><footer className="site-footer"><div className="container footer-main"><Link className="brand" to="/"><span className="brand-symbol"><span>CB</span><i /></span><span className="brand-words"><strong>ChemBioEN <em>2027</em></strong><small>International Conference</small></span></Link><p>Event details will be updated as information is confirmed.</p><a href="/#home">Back to top ↑</a></div><div className="footer-bottom"><div className="container"><span>© 2027 ChemBioEN</span><span>[HOST AFFILIATION TO BE CONFIRMED]</span></div></div></footer></AuthContext.Provider>;
}

export default App;
