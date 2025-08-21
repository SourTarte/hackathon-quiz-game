# Quizia

## Introduction

Quizia is an interactive online quiz application built during a hackathon by the **Quizia team**.
It was developed collaboratively to challenge users’ general knowledge as well as subject-specific topics, while showcasing teamwork, design thinking, and rapid prototyping.

Designed with accessibility and replayability in mind, Quizia appeals to a broad audience (recommended age 13+). Users can tailor their experience by adjusting difficulty, quiz length, and subject matter, ensuring that each session feels fresh and engaging.

---

## Mockup – Responsive Design

Quizia is built with a responsive design to ensure a smooth user experience across all devices, from desktop to mobile.

> ![Mockup of Quizia](./docs/screenshots/mockup.png) > **Key Points:**

-   **Desktop:** Full immersive layout with rich background and clear navigation.
-   **Tablet:** Optimized quiz options modal and step-by-step guide.
-   **Mobile:** Clean interface with easy-to-tap buttons, ensuring accessibility and fast play.
-   **Consistency:** Visual identity and quiz flow remain the same on all screen sizes.

## 🚀 Features

## Navigation Bar

> ![Navigation Bar](./docs/screenshots/navbar.png)

Quizia features a **minimal navigation bar** to keep the interface clean and user-friendly.
It includes the application logo and quick access links for smooth navigation.

**Key Features:**

-   **Logo:** Positioned on the left side with a simple icon and the app name (_Quizia_).
-   **Links:** _Home_ and _How it works_ for fast access to the main sections.
-   **Design:** Lightweight, unobtrusive, and consistent across all pages.

## Homepage

The homepage of **Quizia** is designed to welcome new users and guide them straight into the quiz experience.

**Key Elements:**

-   **Hero Title:** _“In the Mood for a Quiz?”_ — a clear and inviting headline.
-   **Subtitle:** Encourages users to test their knowledge and have fun.
-   **Name Input Field:**
    -   Requires at least **2 characters** and **1 number** for validation.
    -   Placeholder: _“Enter your username 🦉”_.
-   **Start Button:** A bold, high-contrast call-to-action button: _“Start the Quiz!”_.
-   **Background:** A bookshelf image symbolizing knowledge, paired with a Rubik’s Cube to represent challenge and problem solving.

> ![Homepage](./docs/screenshots/home.png)

## How It Works

Quizia keeps the user journey simple and engaging, guiding players through three clear steps:

-   **Step 1 – Enter Your Name**
    Users start by entering their name. After this, they are presented with quiz options such as category, difficulty, and quiz length. Once ready, they simply click **Play!**

-   **Step 2 – Answer Questions**
    Each quiz question offers four possible answers (or True/False mode). Only one answer is correct, making the gameplay straightforward yet challenging.

-   **Step 3 – View Results & Share**
    Once the quiz ends, results are shown instantly. Players can then challenge friends to beat their score, encouraging replayability and social engagement.

> ![How It Works](./docs/screenshots/howitworks.png)

## Footer

Quizia includes a clean footer at the bottom of homepage to provide users with quick access to social channels and legal information.

> ![Footer](./docs/screenshots/footer.png)

## Quiz Options

Before starting the quiz, users are presented with a **Quiz Options** modal that allows them to customize their experience.

**Available Options:**

-   **Choose Your Difficulty:** Select from multiple levels or keep it as _Any Difficulty_.
-   **Choose Your Category:** Pick a specific topic or keep it general (_Any Category_).
-   **Choose Your Questions:** Decide between question types (e.g., Multiple Choice, True/False).
-   **Choose Quiz Length:** Define how many questions to play (default: 5).

**Controls:**

-   **Play!** – starts the quiz immediately with the chosen options.
-   **Close** – dismisses the modal and returns to the homepage.

> ![Quiz Options](./docs/screenshots/quiz_options.png)

## Quiz Gameplay

Once the quiz begins, players are presented with a clean and focused interface that makes answering questions intuitive and engaging.

**Interface Features:**

-   **Player Name:** Displayed at the top (e.g., _Challenger: Adam32_) for a personalized experience.
-   **Score Tracker:** Shows progress and current score (e.g., _Score: 0/5_).
-   **Category & Difficulty:** Highlighted in colored banners to remind users of their chosen settings.
-   **Question Display:** Each question is clearly stated with four possible answers.
-   **Answer Options:** Players select one option per question (only one is correct).
-   **Controls:**
    -   **Check Answer** – submit the selected option.
    -   **End Quiz** – exit the quiz before completion if desired.

**Gameplay Flow:**

1. A question appears along with multiple-choice answers.
2. The user selects an answer and clicks **Check Answer**.
3. The app evaluates correctness, updates the score, and moves to the next question.
4. This repeats until the quiz ends.

> ![Quiz Gameplay](./docs/screenshots/quiz-game.png)

## Quiz Results

After completing a quiz, players are shown a clear results page that provides instant feedback on their performance.

**Key Features:**

-   **Congratulations Message:** Positive reinforcement for completing the quiz.
-   **Final Score:** Displays the player’s score.
-   **Questions Answered:** Shows how many questions were attempted out of the total (e.g., _5 Questions_).
-   **Replay Option:** A **Play Again** button encourages replayability by letting users immediately start another quiz.
-   **Friendly Closing Note:** Thanks the player for participating, enhancing user engagement.

> ![Quiz Results](./docs/screenshots/result_page.png)
## Wireframes

Before moving to development, the team created wireframes for desktop, tablet, and mobile views.  
These helped us quickly iterate on layout ideas, ensure responsiveness, and keep a consistent structure across devices.  

**Desktop Wireframe**  
![Desktop Wireframe](./docs/screenshots/desktop.png)

**Mobile Wireframe**  
![Mobile Wireframe](./docs/screenshots/mobile.png)

**Tablet Wireframe**  
![Tablet Wireframe](./docs/screenshots/tablet.png)

These wireframes evolved into the final polished UI showcased above, but they gave us a solid foundation to work quickly and collaboratively.  

## Project Management (Agile Board)

To keep our team organized during the hackathon, we used a **Kanban board** on GitHub Projects.  
This helped us prioritize tasks, track progress, and stay aligned as a team working under tight deadlines.  

**Board Columns:**
- **To Do:** Tasks that were identified but not yet started.  
- **In Progress:** Tasks currently being developed.  
- **Done:** Completed features that were merged and tested.  

**Prioritization:**
- We used labels like *must-have*, *should-have*, and *could-have* to prioritize tasks.  
- Critical features (e.g., Welcome Page, Accessibility) were tackled first to ensure core functionality.  
- Enhancements and nice-to-have features were added later if time allowed.  
> ![Kanban Board](./docs/screenshots/project_board.png)

## Design Choices – Color Palette

A consistent and accessible color scheme was chosen to balance playfulness with readability.  
The palette combines warm, inviting tones with strong contrasts for key actions (like answering questions or starting the quiz).  

**Color Palette:**
- **#231F20 – Raisin Black:** Used for primary text, ensuring high contrast.  
- **#BB4430 – Persian Red:** Accent color for buttons and highlights (e.g., difficulty, category).  
- **#7EBDC2 – Verdigris:** Background elements and score tracker for a calm contrast.  
- **#F3DFA2 – Vanilla:** Light, warm background for sections to improve readability.  
- **#EFE6DD – Linen:** Neutral base background to support a clean layout.  
  
> ![Color Palette](./docs/screenshots/colour_palette.webp)

**Why these colors?**
- Ensure **contrast** and **legibility** across devices.  
- Create a **friendly, modern look** that reflects fun and challenge.  
- Provide a clear **visual hierarchy**, where red signals importance and blue/neutral tones balance the interface.  
To complement the color palette, we selected clean and modern fonts that enhance readability and provide a friendly look for the quiz.

**Fonts Used:**
- **Primary Font – Montserrat**  
  Used for headings and key UI elements.  

- **Secondary Font – Nunito**  
  Used for body text and supporting content. Nunito adds a softer, rounded feel that makes the quiz interface more approachable.  

  ## Testing & Validation

To ensure the quality and reliability of Quizia, we validated both code and user experience throughout the development process.

- **HTML Validation:**  
  Checked using the [W3C Markup Validator](https://validator.w3.org/).  
  During the first validation run, a few errors were detected (e.g., unmatched `<li>` / `</ul>` tags and multiple `selected` attributes in `<select>` elements).  
  These issues were corrected, and the final version now passes validation successfully.  

  > Example screenshot of initial HTML validation errors:  
  > ![HTML Validation Errors](./docs/screenshots/html_erorrs.webp)  

  > Screenshot after fixes (no errors):  
  > ![HTML Validation Passed](./docs/screenshots/html_validation.png)  

- **CSS Validation:**  
  Verified with the [W3C Jigsaw Validator](https://jigsaw.w3.org/css-validator/).  
  Stylesheets passed validation without issues.  

  > ![CSS Validation](./docs/screenshots/css_validation.png)  

- **Accessibility Testing:**  
  Confirmed compliance with WCAG guidelines (color contrast, ARIA roles, semantic HTML).  
  Tools used: Chrome Lighthouse and manual testing.  

  > ![Accessibility Test](./docs/screenshots/lighthouse.png)  

- **Responsive Testing:**  
  Tested across multiple devices and screen sizes using Chrome DevTools and manual resizing.  
  The layout adapts without loss of functionality.

   ## Deployment

Quizia is deployed via **GitHub Pages** to make the application easily accessible to all users directly in their browsers.

- **Version Control:** The project was managed with Git and GitHub, using feature branches and Pull Requests to enable collaborative development.  
- **Hosting Platform:** Deployed using **GitHub Pages**, a free and reliable hosting service that integrates seamlessly with GitHub repositories.  
- **Deployment Procedure:**  
  1. Push the latest code to the `main` branch.  
  2. GitHub Pages automatically serves the content from the repository root.  
  3. Ensure that `index.html` and all assets use **relative paths** so they load correctly on GitHub Pages.  
- **Consistency:** The live deployment matches the development version, with all interactive features fully functional.  
- **Maintenance:** Any new commit to `main` automatically updates the live site within minutes.  

> 🔗 **Live Demo:** [Quizia Online](https://sourtarte.github.io/hackathon-quiz-game/)

---

## Code Organization

To keep the project maintainable, we followed best practices in structuring and documenting code.

**Practices:**
- HTML, CSS, and JS separated into external files.  
- Code divided into commented sections for readability.  
- Consistent indentation, spacing, and file naming.  
- Removed commented-out code before deployment.  

**Project Structure:**
Below is a screenshot of the project’s directory organization, ensuring clarity and maintainability:

![Project Structure](docs/screenshots/project_structure.png)

---

## Error Handling 

The application gracefully handles invalid or empty inputs to ensure smooth gameplay.  

- **Name Input Validation:** The player must enter a name that contains at least **2 characters and 1 number**. If the criteria are not met, an error message is displayed and the quiz cannot start.  
- **Quiz Flow Control:** Users cannot progress to the next stage without selecting an answer, ensuring the quiz logic stays consistent.  
- **JavaScript Error Prevention:** Core functions include condition checks and loops that prevent unexpected behavior or runtime errors.  
- **Console Safety:** During normal gameplay, the application runs without generating console errors or warnings, maintaining a clean development environment.  

---
---

## Reflection on AI Usage  

During development, the team leveraged **AI tools** to support the coding process, streamline debugging, and optimize performance:  

- **Code Creation:** AI was used to generate the initial scaffolding for HTML. This allowed the team to dedicate more time to refining features and improving the user interface.  
- **Debugging:** AI suggested fixes for merge conflicts and identified errors in the code, significantly reducing time spent on troubleshooting.  
- **Performance Optimization:** AI provided recommendations to simplify CSS, resulting in cleaner and more efficient styling.  
- **Documentation:** AI supported the drafting of this README, helping to ensure clarity, professional structure, and consistency.  

**Impact on Workflow:**  
The use of AI tools accelerated the development process during the hackathon, enabling the team to deliver a polished product under time pressure. Rather than replacing creativity, AI complemented teamwork by speeding up repetitive tasks and offering quick, practical solutions.  

---
## Acknowledgements 🎉   

Big thanks to:  
- **Our team – Curtis, Michael, Dion & Aleksandra**, for turning ideas into reality under pressure.  
- **Hackathon mentors & organizers**, for the challenge and guidance.  
- **AI tools**, our silent teammate during crunch time.  
- **Players of Quizia**, because a quiz is nothing without curious minds!  
