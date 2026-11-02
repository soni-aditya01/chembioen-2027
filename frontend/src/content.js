export const ABSTRACT_SUBMISSION_URL = "";
export const REGISTRATION_URL = "";

export const HOMEPAGE_CAMPUS_SLIDES = [
  {
    image: "/campus/nitj-main-building.jpg",
    alt: "The main building at Dr. B. R. Ambedkar National Institute of Technology Jalandhar.",
    caption: "The main building",
    credit: "Simbu123",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Main_Building,_NIT_Jalandhar.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    image: "/campus/nitj-chemical-engineering.jpg",
    alt: "The Department of Chemical Engineering building at NIT Jalandhar, adjoining the Department of Humanities and Management.",
    caption: "Department of Chemical Engineering",
    credit: "Simbu123",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Departmental_Buildings,_NIT_Jalandhar_02.JPG",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    image: "/campus/nitj-main-gate.jpg",
    alt: "The main gate of Dr. B. R. Ambedkar National Institute of Technology Jalandhar.",
    caption: "The NIT Jalandhar main gate",
    credit: "Simbu123",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:NIT_Jalandhar_Gate.JPG",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    image: "/campus/nitj-campus-panorama.jpg",
    alt: "Panoramic view across the NIT Jalandhar campus.",
    caption: "A view across campus",
    credit: "NIT Jalandhar",
    sourceUrl: "https://www.nitj.ac.in/"
  }
];

export const DEADLINES = [
  { label: "Conference Dates", value: "12–13 February 2027" },
  { label: "Abstract Submission Deadline", value: "15 December 2026" },
  { label: "Registration Deadline", value: "To be announced" },
  { label: "Notification of Acceptance", value: "To be announced" }
];

export const CONTACT_PERSONS = [
  {
    name: "Dr. Jatinder Kumar Ratan",
    designation: "Chairperson",
    phone: "+917986983885",
    email: "kumarj@nitj.ac.in"
  },
  {
    name: "Dr. Deepak Sahu",
    designation: "Organizing Secretary",
    phone: "+918219215064",
    email: "sahud@nitj.ac.in"
  },
  {
    name: "Dr. Nitin Naresh Pandhare",
    designation: "Organizing Secretary",
    phone: "+917579200586",
    email: "pandharenn@nitj.ac.in"
  },
  {
    name: "Dr. Anjireddy Bhavanam",
    designation: "Organizing Secretary",
    phone: "+919848932241",
    email: "bhavanama@nitj.ac.in"
  },
];

export const ABOUT_CHEMBIOEN = [
  "An interdisciplinary platform for researchers, academicians, students, and industry professionals working at the nexus of chemical, bio, and environmental engineering.",
  "CHEMBIOEN brings together experts to share ideas, discuss emerging technologies, and collaborate on sustainable engineering solutions for a rapidly changing world."
];

export const ANNOUNCEMENTS = [
  {
    id: "conference-dates",
    latest: true,
    title: "Conference dates and abstract deadline announced",
    body: "The conference will take place on 12–13 February 2027. Abstracts are invited on chemical, bio, and environmental engineering topics."
  },
  {
    id: "paper-submission",
    latest: false,
    title: "Abstract submission is open",
    body: "Authors are encouraged to submit abstracts in emerging areas spanning green chemistry, bioprocessing, environmental systems, and sustainable engineering."
  },
  {
    id: "venue-update",
    latest: false,
    title: "Venue update",
    body: "The conference will be hosted by the Department of Chemical Engineering at Dr. B. R. Ambedkar NIT Jalandhar."
  }
];

export const PREVIOUS_CONFERENCES = [
  {
    year: "2020",
    description: "CHEMBIOEN 2020 featured more than 200 papers across 20 parallel technical sessions and 8 plenary talks, demonstrating a strong research culture and a vibrant academic exchange.",
    highlight: "200+ papers • 20 sessions • 8 plenaries",
    archiveUrl: "/previous-conferences/2020",
    resources: [
      { title: "Conference brochure", fileName: "Brochure - CHEMBIOEN-2020.pdf", format: "PDF" },
      { title: "Conference report", fileName: "ChemBioen Report 2020.docx", format: "DOCX" }
    ],
    highlights: [
      { value: "200+", label: "research papers" },
      { value: "20", label: "parallel sessions" },
      { value: "8", label: "plenary talks" }
    ],
    imageUrl: "/previous-conferences/chembioen-2020-event-02.jpg",
    imageAlt: "Invited guests and conference organizers hold inaugural publications in front of the CHEMBIOEN 2020 banner.",
    imageCaption: "Conference guests and organizers at CHEMBIOEN 2020, February 13–14.",
    gallery: [
      {
        imageUrl: "/previous-conferences/chembioen-2020-event-03.jpg",
        imageAlt: "Conference organizers and participants gathered in front of the CHEMBIOEN 2020 banner.",
        caption: "Organizers and participants at the conference venue."
      },
      {
        imageUrl: "/previous-conferences/chembioen-2020-event-04.jpg",
        imageAlt: "Delegates seated during a CHEMBIOEN 2020 conference session.",
        caption: "Delegates and speakers during a conference session."
      }
    ],
    pressCoverage: [
      {
        imageUrl: "/previous-conferences/chembioen-2020-press-coverage.png",
        imageAlt: "Hindi newspaper coverage of the CHEMBIOEN 2020 international conference at NIT Jalandhar.",
        caption: "Hindi-language newspaper coverage of CHEMBIOEN 2020."
      },
      {
        imageUrl: "/previous-conferences/chembioen-2020-event-01.jpg",
        imageAlt: "Jalandhar Tribune newspaper clipping about CHEMBIOEN 2020 and an expert's remarks on water pollution.",
        caption: "Jalandhar Tribune · 14 February 2020"
      }
    ],
  },
  {
    year: "2021",
    description: "CHEMBIOEN 2021 drew in more than 350 research submissions, reflecting the growing interest in sustainable process engineering, bio-based technologies, and environmental solutions.",
    highlight: "350+ abstracts received",
    archiveUrl: "/previous-conferences/2021",
    highlights: [
      { value: "350+", label: "abstracts received" }
    ],
    resources: [
      { title: "Conference brochure", fileName: "Brochure CHEMBIOEN-2021.pdf", format: "PDF" },
      { title: "Conference newsletter", fileName: "Newsletter chembioen21.docx", format: "DOCX" }
    ]
  },
  {
    year: "2022",
    description: "CHEMBIOEN 2022 brought together around 250 papers and 600 participants, creating an engaging forum for researchers, scholars, and practitioners.",
    highlight: "250 papers • 600 participants",
    archiveUrl: "/previous-conferences/2022",
    resources: [
      { title: "Conference brochure", fileName: "CHEMBIOEN-2022Brochure.pdf", format: "PDF" },
      { title: "Conference report", fileName: "CHEMBIOEN 2022.docx", format: "DOCX" }
    ],
    highlights: [
      { value: "250", label: "research papers" },
      { value: "600", label: "participants" }
    ],
    imageUrl: "/previous-conferences/chembioen-2022-event-03.jpg",
    imageAlt: "CHEMBIOEN 2022 attendees pose for a group photograph outside the host institute.",
    imageCaption: "Conference participants at B. V. Raju Institute of Technology.",
    gallery: [
      {
        imageUrl: "/previous-conferences/chembioen-2022-event-01.jpg",
        imageAlt: "A large group of students and faculty gathered at the CHEMBIOEN 2022 venue.",
        caption: "Students and faculty gathered at the conference venue."
      },
      {
        imageUrl: "/previous-conferences/chembioen-2022-event-02.jpg",
        imageAlt: "Conference guests holding mementos during a CHEMBIOEN 2022 event.",
        caption: "Guests and organizers during a conference presentation."
      }
    ]
  }
];

export const INVITED_SPEAKERS = [
  {
    name: "Speaker profile",
    designation: "To be announced",
    affiliation: "Academic or industry expert",
    topic: "Research topic to be confirmed"
  },
  {
    name: "Speaker profile",
    designation: "To be announced",
    affiliation: "Academic or industry expert",
    topic: "Research topic to be confirmed"
  },
  {
    name: "Speaker profile",
    designation: "To be announced",
    affiliation: "Academic or industry expert",
    topic: "Research topic to be confirmed"
  }
];

export const PUBLICATIONS = [
  {
    id: "publication-1",
    title: "Publication details to be announced",
    description: "Verified publication information will be added when available.",
    image: "/publication-placeholder.svg",
    imageAlt: "Placeholder publication cover; no verified cover image is available.",
    abstract: "Publication partners and proceedings details will be confirmed in due course.",
    authors: "[AUTHORS TO BE PROVIDED]",
    year: "[PUBLICATION YEAR TO BE PROVIDED]",
    externalUrl: ""
  }
];

export const THEMES = [
  ["Sustainable Process Design, Green Chemistry & Clean Technologies", "Sustainable process design, green chemistry and clean technologies."],
  ["Bioprocess Engineering, Industrial Biotechnology & Biorefineries", "Bioprocess engineering, industrial biotechnology and biorefinery research."],
  ["Biochemical Engineering, Bioprocesses & Bio-based Technologies", "Biochemical engineering, bioprocess development and sustainable bio-based technologies."],
  ["Advanced Materials, Catalysis & Reaction Engineering", "Advanced materials, catalytic systems and reaction engineering."],
  ["Water & Wastewater Treatment and Resource Recovery", "Water treatment, wastewater treatment and resource recovery."],
  ["Air Pollution Control, Monitoring & Remediation", "Air pollution control, environmental monitoring and remediation."],
  ["Carbon Capture, Climate Mitigation & Circular Economy", "Carbon capture, climate change mitigation and circular economy."],
  ["AI, Digitalization & Process Intensification", "AI and digitalization for sustainable engineering and process intensification."]
];

export const FEES = [
  ["Students (UG/PG)", "₹500", "$50"],
  ["Ph.D. / RA / Postdoc", "₹1,500", "$100"],
  ["Faculty", "₹3,500", "$150"],
  ["Industry professionals", "₹5,000", "$200"]
];
