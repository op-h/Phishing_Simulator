SOC Training \& Simulation Platform



1\. Context and Role



Act as: An Expert Full-Stack Developer, UX/UI Designer, and Cybersecurity Software Architect.

Goal: Build a comprehensive internal Web Application for a Security Operations Center (SOC) team. This application is a Security Awareness Training Simulator designed to safely execute, manage, and track internal Phishing, Vishing, and Smishing campaigns against company employees to test their security posture.



2\. Project Overview



The platform must provide a centralized dashboard for the SOC team to configure and launch simulated social engineering attacks. It requires fully operational interfaces for three distinct vectors:



Phishing (Email)



Smishing (SMS)



Vishing (Voice/Messaging via WhatsApp)



3\. Core Features \& Functional Requirements



A. Attack Vectors \& Templates



Phishing/Smishing Module: The system must include pre-built, highly convincing HTML/CSS templates mirroring popular platforms (e.g., Meta/Facebook/Instagram, Google, Sony, Microsoft, Apple, LinkedIn).



Scenario: Password reset requests or security alert notifications.



Vishing Module: Interface to connect to a designated WhatsApp Business API / Twilio number controlled by the SOC team to dispatch simulated vishing messages or automated calls.



B. Victim Tracking \& Credential Safety (CRITICAL)



Zero Credential Logging: The application MUST NOT send, process, or store the actual passwords or sensitive data entered by the user.



Exposure Logging: When a victim interacts with a simulated malicious link and submits the form, the system should only capture:



The victim's Email/ID.



The status: \[EXPOSED].



The timestamp and campaign name.



Intervention Message: Immediately upon form submission, the victim must be redirected to a clear, organized, and un-bypassable screen displaying: "You failed the security test. Contact the SOC team."



C. Technical \& Code Quality Standards



Every function in the source code must be documented, modular, and adhere to clean code principles (DRY, SOLID).



Thorough error handling must be implemented for API integrations (Email SMTP, SMS gateways, WhatsApp APIs).



4\. UI/UX \& Design Specifications



The site must feel like a premium, modern hacker platform. The design inspiration is Hack The Box (HTB).



Theme: Dark mode by default with high-contrast accent colors (e.g., neon greens, cyber blues).



Background: Dark mesh gradients, subtle grid patterns, or matrix-style backgrounds.



Components: "Glassmorphism" effects—windows, modals, and cards should have slight transparency (almost invisible edges) with backdrop blurs.



UX: Interactive, snappy, and lightweight. Heavy use of AJAX/React states so the SOC team experiences zero page reloads while configuring campaigns.



5\. Implementation Steps for the AI (Follow Sequentially)



Phase 1: Setup the project architecture (Frontend framework, Backend API, Database schema for tracking victims and campaigns).



Phase 2: Develop the HTB-inspired UI/UX layout, including the main navigation, dashboard, and dark-theme design tokens.



Phase 3: Build the Template Engine (HTML templates for Google, Meta, Sony, etc.).



Phase 4: Implement the Campaign Dispatchers (SMTP for emails, Twilio/API for SMS and WhatsApp).



Phase 5: Build the Capture/Tracking mechanism (Logging \[EXPOSED] without saving passwords) and the failure landing page.



6\. Proposed Feature Backlog (For Future Development \& Review)



Please review this list of enhancements to further develop the tool:



LDAP / Active Directory Integration: Automatically sync company employee lists and groups to easily target specific departments (e.g., Finance, HR).



Visual Template Builder: A drag-and-drop email/landing page builder for the SOC team to create custom, company-specific zero-day phishing scenarios without writing code.



Campaign Analytics \& Export: Generate graphs and PDF reports showing Open Rates, Click Rates, and Submit Rates over time to present to upper management.



Automated Follow-up Training: Instead of just a failure message, auto-enroll the exposed user into a quick 5-minute interactive video training module directly on the failure page.



Spear-Phishing AI: An AI text-generation integration that drafts highly personalized phishing emails based on an employee's public LinkedIn profile (to test against targeted attacks).



Webhook Alerts: Send instant notifications to the SOC team's Slack or Microsoft Teams channel the moment an employee clicks a high-risk simulation link.



Simulation Difficulty Tiers: Categorize templates by difficulty (e.g., Level 1: Obvious typos; Level 3: Perfect clone with homograph domain).

