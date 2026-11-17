# COPY.md

Draft copy for Akshay Mamilla's portfolio site. Nothing is built yet. This file is for review.

**How to read this file**

- `[TO BE SUPPLIED: ...]` marks a fact that is not known yet. It will become a labeled placeholder in the content file.
- `[CONFIRM: ...]` marks a line I wrote from your interview answers that you should check before it goes live.
- "Target searches" are the phrases each page is written towards. They are notes for us, not text on the page.
- Every fact comes from CONTEXT.md or your interview answers. No metrics, dates, duties or links were invented.

**Pages**

1. Home
2. Projects
3. Case study: Google Drive Organizer and Document Classifier
4. Case study: Equipment Monitoring Dashboard
5. Experience & Certifications
6. Contact

---

## Shared across every page

**Header navigation:** Home · Projects · Experience · Contact

**Header button:** Download resume → `[TO BE SUPPLIED: resume PDF]`

**Footer line:** Akshay Mamilla · Houston, TX · Open to roles in Houston, across Texas and remote

**Footer actions (on every page):**

- Email me → `[TO BE SUPPLIED: email]`
- Download resume → `[TO BE SUPPLIED: resume PDF]`
- Connect on LinkedIn → `[TO BE SUPPLIED: LinkedIn URL]`

**Footer link:** GitHub → `[TO BE SUPPLIED: GitHub URL]`

---

## 1. Home

**URL:** `/`

**Target searches:** Akshay Mamilla · Akshay Mamilla portfolio · Akshay Mamilla data analyst / Power BI / developer · entry level data analyst Houston · Power BI analyst Houston TX · UHCL MIS graduate

**Page title:** Akshay Mamilla | Data, Software, AI and IT Support | Houston, TX

**Meta description:** Portfolio of Akshay Mamilla, an MIS graduate student at the University of Houston-Clear Lake working in data analysis, frontend development, AI and IT support. Based in Houston, TX.

### Hero

**Heading (H1):** Akshay Mamilla

**Subheading:** Data analysis, software, AI and IT support, based in Houston, TX

**Opening lines:**

I'm finishing an MS in Management Information Systems at the University of Houston-Clear Lake, graduating in December 2026. I build Power BI dashboards, write Python and SQL, develop React frontends and support the systems people rely on.

I'm open to full-time roles and internships in Houston, across Texas and remote.

**Buttons:** Download resume (main) · View projects (main) · Email me · LinkedIn

### What I do

**Heading (H2):** Four areas, one toolkit

**Data analysis and BI**
I built a Power BI dashboard for monitoring CT and MRI equipment fleets during my internship at United Imaging Healthcare, including the data model and DAX measures behind it. Earlier, I interned in data analytics with AICTE / VOIS for Tech.

**Software and frontend**
I build with React and Python, and I test what I ship: my Google Drive organizer has 45 unit tests. I was a frontend intern with IBM SkillsBuild.

**AI and machine learning**
I built a document classifier on the Gemini Vision API for a real staffing agency. I was an AI research intern at A Square Solutions, and I've helped in Python and Data Analytics with AI lab sessions at UHCL.

**IT and systems support**
I worked as a Remote Services Support Intern at United Imaging Healthcare. I hold the AWS Cloud Practitioner and CCST Networking certifications.

### Skills

**Heading (H2):** Skills

- Python
- SQL
- Power BI
- React / frontend development
- AWS

### Featured projects

**Heading (H2):** Recent projects

**Google Drive Organizer and Document Classifier**
An AI tool built for a staffing agency that classifies, renames and files documents in Google Drive. It cut manual file management by 95%.
Link: Read the case study

**Equipment Monitoring Dashboard**
A two-page Power BI dashboard for monitoring CT and MRI equipment fleets, built during my internship at United Imaging Healthcare.
Link: Read the case study

**Link below cards:** See all projects

### About

**Heading (H2):** About me

I came to information systems from engineering. My undergraduate background is in Electronics and Communication Engineering at JNTU, and I'm now completing an MS in Management Information Systems at the University of Houston-Clear Lake.

At UHCL I've been a Graduate Teaching Assistant for ISAM 1305, Business Computer Applications.

I live in Houston, TX.

### Closing call to action

**Heading (H2):** Hiring for a data, software, AI or IT support role?

I'd like to hear about it. Download my resume or send me an email.

**Buttons:** Download resume · Email me · Connect on LinkedIn

---

## 2. Projects

**URL:** `/projects`

**Target searches:** Akshay Mamilla projects · Akshay Mamilla portfolio projects · Python AI automation project · Power BI dashboard project

**Page title:** Projects | Akshay Mamilla | Python, AI and Power BI

**Meta description:** Projects by Akshay Mamilla: an AI document classifier for Google Drive built in Python, and a Power BI equipment monitoring dashboard.

**Heading (H1):** Projects

**Opening lines:**

These are projects I built for real users: a Python and AI tool for a staffing agency, and a Power BI dashboard from my internship at United Imaging Healthcare. Each one has a short case study covering the problem, what I built and the result.

### Project cards

*(Generated from the content file. A new entry there adds a card here and a case study page.)*

**Google Drive Organizer and Document Classifier**
Tags: Python · Gemini Vision API · Google Drive API · AES-256
Classifies, renames and files documents for a staffing agency. 45 unit tests. 95% less manual file management.
Link: Read the case study

**Equipment Monitoring Dashboard**
Tags: Power BI · DAX · Data modeling
An executive summary and a device drill-down view for CT and MRI equipment fleets.
Link: Read the case study

### Closing call to action

**Heading (H2):** Want to talk through one of these?

**Buttons:** Email me · Connect on LinkedIn

---

## 3. Case study: Google Drive Organizer and Document Classifier

**URL:** `/projects/google-drive-organizer`

**Target searches:** Gemini Vision document classifier · AI document classification project · Google Drive API file organizer · automate Google Drive file management · Python AI automation project

**Page title:** Google Drive Organizer and AI Document Classifier | Akshay Mamilla

**Meta description:** A Python tool that uses the Gemini Vision API and Google Drive API to classify, rename and file documents for a staffing agency, cutting manual file management by 95%.

**Heading (H1):** Google Drive Organizer and Document Classifier

**Opening lines:**

An AI document classifier that keeps a staffing agency's Google Drive organized. It reads each file with the Gemini Vision API, works out what kind of document it is, gives it a consistent name and moves it to the right folder.

`[CONFIRM: written in Python. You picked the "Python AI project" search, so I've described it that way.]`

### At a glance

- **Built for:** a staffing agency
- **My role:** solo developer
- **Tech:** Python, Gemini Vision API, Google Drive API, AES-256 encryption
- **Tests:** 45 unit tests
- **Result:** 95% reduction in manual file management

### The problem

**Heading (H2):** The problem

A staffing agency handles a steady flow of documents, and each one had to be opened, identified, renamed and filed by hand.

`[CONFIRM: this sentence describes the "before" in general terms, inferred from the 95% reduction. Edit it if the real situation was different.]`

### What I built

**Heading (H2):** What I built

- **Classification.** The Gemini Vision API reads each file and decides what type of document it is.
- **Renaming.** Files get consistent names based on their contents.
- **Filing.** The tool moves each file into the right Google Drive folder through the Google Drive API.
- **Encryption.** Sensitive data is protected with AES-256 encryption.
- **Testing.** 45 unit tests cover the tool.

### The result

**Heading (H2):** The result

Manual file management at the agency dropped by 95%.

### See it

**Heading (H2):** Code and screenshots

- GitHub repository → `[TO BE SUPPLIED: public repo URL]`
- Screenshots → `[TO BE SUPPLIED: screenshots with no client data visible]`

### Closing call to action

**Heading (H2):** Need something similar automated?

I'm happy to walk through how this works.

**Buttons:** Email me · Connect on LinkedIn

**Link:** Back to all projects

---

## 4. Case study: Equipment Monitoring Dashboard

**URL:** `/projects/equipment-monitoring-dashboard`

**Target searches:** Power BI dashboard project · Power BI DAX data modeling project · equipment monitoring dashboard Power BI · healthcare equipment analytics dashboard

**Page title:** Equipment Monitoring Dashboard in Power BI | Akshay Mamilla

**Meta description:** A two-page Power BI dashboard for monitoring CT and MRI equipment fleets, with a data model and DAX measures built on equipment-monitoring exports.

**Heading (H1):** Equipment Monitoring Dashboard

**Opening lines:**

A Power BI dashboard for monitoring fleets of CT and MRI equipment. I built it during my internship at United Imaging Healthcare, from the data model and DAX measures through to the two report pages.

### At a glance

- **Built during:** Remote Services Support internship, United Imaging Healthcare
- **Tool:** Power BI
- **Work:** data modeling and DAX measures on equipment-monitoring exports
- **Pages:** executive summary and device detail / drill-down
- **Built for:** managers and the support team

### What I built

**Heading (H2):** What I built

- **A data model** built on equipment-monitoring exports.
- **DAX measures** that drive the figures on both pages.
- **An executive summary page** that gives managers a view of the fleet at a glance.
- **A device detail page** that lets the support team drill down into a single device.

### What it tracks

**Heading (H2):** What it tracks

The dashboard covers equipment status and health, alerts and errors, and uptime across the fleet.

`[CONFIRM: you ticked these three topics and also "Keep it to CONTEXT only". Approve this line, or delete this whole section to stay strictly within CONTEXT.md.]`

### Screenshots

**Heading (H2):** Screenshots

The images below come from a rebuilt version of the dashboard that runs on sample data. They contain no real equipment, customer or site information.

- Executive summary page → `[TO BE SUPPLIED: screenshot from the sample-data rebuild]`
- Device detail page → `[TO BE SUPPLIED: screenshot from the sample-data rebuild]`

### A note on confidentiality

**Heading (H2):** Confidentiality

This work was done for an employer, so this page describes it in general terms. It leaves out internal system names, customers, sites and real figures.

### Closing call to action

**Heading (H2):** Looking for someone to build Power BI reports?

I can walk you through the model and measures.

**Buttons:** Email me · Connect on LinkedIn

**Link:** Back to all projects

---

## 5. Experience & Certifications

**URL:** `/experience`

**Target searches:** Akshay Mamilla resume · Akshay Mamilla experience · AWS Cloud Practitioner Power BI analyst Houston · remote services support intern · CCST Networking IT support Houston · UHCL graduate teaching assistant MIS

**Page title:** Experience and Certifications | Akshay Mamilla | Houston, TX

**Meta description:** Akshay Mamilla's experience in IT support, data analytics, AI research and frontend development, with AWS Cloud Practitioner, Power BI and CCST Networking certifications.

**Heading (H1):** Experience and certifications

**Opening lines:**

My experience runs across remote IT support, data analytics, AI research, frontend development and teaching. The full detail is in my resume.

**Button:** Download resume

### Experience

**Heading (H2):** Experience

**Remote Services Support Intern (part-time)**
United Imaging Healthcare NAM, Inc. · Houston, TX · July 2026 to October 2026

- Built a Power BI dashboard for monitoring CT and MRI equipment fleets, including the data model and DAX measures. Link: Read the case study

**Graduate Teaching Assistant**
University of Houston-Clear Lake · `[TO BE SUPPLIED: dates]`

- Teaching assistant for ISAM 1305, Business Computer Applications.
- Helped in Python and Data Analytics with AI lab sessions.

**AI Research Intern**
A Square Solutions · `[TO BE SUPPLIED: dates]`

- `[TO BE SUPPLIED: what you did in this role]`

**Frontend Intern**
IBM SkillsBuild · `[TO BE SUPPLIED: dates]`

- `[TO BE SUPPLIED: what you did in this role]`

**Data Analytics Intern**
AICTE / VOIS for Tech · `[TO BE SUPPLIED: dates]`

- `[TO BE SUPPLIED: what you did in this role]`

### Education

**Heading (H2):** Education

**MS in Management Information Systems**
University of Houston-Clear Lake · Graduating December 2026

**Undergraduate studies in Electronics and Communication Engineering**
JNTU

### Certifications

**Heading (H2):** Certifications

**`[TO BE SUPPLIED: exact Power BI certification name]`**
Earned `[TO BE SUPPLIED: date]` · Verify → `[TO BE SUPPLIED: verification link]`

**AWS Cloud Practitioner**
Earned `[TO BE SUPPLIED: date]` · Verify → `[TO BE SUPPLIED: verification link]`

**CCST Networking**
Earned `[TO BE SUPPLIED: date]` · Verify → `[TO BE SUPPLIED: verification link]`

### Closing call to action

**Heading (H2):** Want the one-page version?

**Buttons:** Download resume · Connect on LinkedIn

---

## 6. Contact

**URL:** `/contact`

**Target searches:** contact Akshay Mamilla · Akshay Mamilla email · Akshay Mamilla LinkedIn · hire data analyst Houston · hire Power BI developer Houston

**Page title:** Contact Akshay Mamilla | Data Analyst and Developer in Houston, TX

**Meta description:** Email Akshay Mamilla, connect on LinkedIn or download his resume. Open to full-time roles and internships in Houston, across Texas and remote.

**Heading (H1):** Contact Akshay Mamilla

**Opening lines:**

If you're hiring a data analyst, Power BI developer, frontend developer or IT support specialist in Houston, or for a remote team, I'd like to hear from you. I'm open to full-time roles and internships.

### Ways to reach me

**Heading (H2):** Get in touch

- **Email** → `[TO BE SUPPLIED: email]`
- **LinkedIn** → `[TO BE SUPPLIED: LinkedIn URL]`
- **GitHub** → `[TO BE SUPPLIED: GitHub URL]`
- **Phone** → `[TO BE SUPPLIED: phone]`

### Resume

**Heading (H2):** Resume

Download my resume as a PDF.

**Button:** Download resume → `[TO BE SUPPLIED: resume PDF]`

### Location

**Heading (H2):** Where I'm based

Houston, TX. Open to roles in Houston, across Texas and remote.

---

## Still to be supplied

**Contact and links**

- Email
- Phone
- LinkedIn URL
- GitHub URL
- Resume PDF

**Projects**

- Drive Organizer: public GitHub repo URL
- Drive Organizer: screenshots with no client data
- Dashboard: two screenshots from the sample-data rebuild

**Experience**

- Dates for Graduate Teaching Assistant, AI Research Intern, Frontend Intern and Data Analytics Intern
- One or two lines on what you did as AI Research Intern, Frontend Intern and Data Analytics Intern

**Certifications**

- Exact Power BI certification name
- Date earned and verification link for all three certifications

## Lines to confirm

1. Drive Organizer is written in Python (case study opening, tags, meta description, Projects page).
2. Drive Organizer "The problem" sentence, which describes the manual process in general terms.
3. Dashboard "What it tracks" section: keep status, alerts and uptime, or cut it.
