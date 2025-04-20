[https://j-shubhi.github.io/](https://j-shubhi.github.io/)

1. Download zip
2. open in editor or terminal and execute these
3. Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
4. npm install
5. npm run dev

## Features and Instructions

### 1. **Hero Section**
   - **Description**: The Hero section introduces the portfolio with a dynamic background and a "Ping Pong" game.
   - **How to Interact**: The Ping Pong game starts when you click anywhere on the screen. Use your mouse to control the paddle and keep the ball in play.
   - **Implementation**: Utilizes `framer-motion` for animations and `useMotionValue` for real-time ball and paddle movement.
   - **Libraries Used**: `framer-motion`.

### 2. **Mood Selector and Panda Animation**
   - **Description**: Allows users to select a mood (happy, neutral, sad) and see a corresponding animated panda.
   - **How to Interact**: Click on one of the mood buttons to change the panda's mood.
   - **Implementation**: Combines `framer-motion` for button animations and custom CSS for panda animations.
   - **Libraries Used**: `framer-motion`.

### 3. **Portfolio Section**
   - **Description**: Displays projects with hover effects and device tilt responsiveness.
   - **How to Interact**: Hover over a project card to see animations. Use device tilt for additional effects.
   - **Implementation**: Uses `framer-motion` for hover animations and `DeviceMotionEvent` for tilt responsiveness.
   - **Libraries Used**: `framer-motion`.

### 4. **Skills Section**
   - **Description**: Showcases skills with interactive cards that expand to reveal more details.
   - **How to Interact**: Hover or touch a skill card to see 3D effects. Click to expand or collapse the card.
   - **Implementation**: Uses a custom `useCardTransform` hook for 3D transformations and animations.
   - **Libraries Used**: `react`, `framer-motion`.

### 5. **Testimonials Section**
   - **Description**: Displays client testimonials in a scrolling carousel.
   - **How to Interact**: Hover over the carousel to pause scrolling. Click the "Submit Your Testimonial" button to add your feedback.
   - **Implementation**: Fetches data from a Google Sheets CSV using `papaparse` and animates scrolling with `framer-motion`.
   - **Libraries Used**: `papaparse`, `framer-motion`.

### 6. **Virtual Assistant**
   - **Description**: A chatbot-like assistant that provides tips and links to portfolio sections.
   - **How to Interact**: Click the assistant icon to open the chat. Use the "Next Tip" button to cycle through messages.
   - **Implementation**: Uses `framer-motion` for animations and a state machine for message cycling.
   - **Libraries Used**: `framer-motion`.

### 7. **AR Portfolio Viewer**
   - **Description**: Allows users to view portfolio projects in augmented reality (AR).
   - **How to Interact**: Click the "View in AR" button and follow the instructions to place projects in AR space.
   - **Implementation**: Built with `@react-three/xr` and `@react-three/fiber` for AR rendering.
   - **Libraries Used**: `@react-three/xr`, `@react-three/fiber`, `three`.

### 8. **Background Audio**
   - **Description**: Plays ambient background music with a toggle button.
   - **How to Interact**: Click the music icon to toggle audio on or off.
   - **Implementation**: Uses the HTML5 Audio API for playback.
   - **Libraries Used**: None.

### 9. **Sparkling Cursor**
   - **Description**: Adds a sparkling trail effect to the cursor.
   - **How to Interact**: Move your mouse around the screen to see the effect.
   - **Implementation**: Uses `framer-motion` for sparkle animations.
   - **Libraries Used**: `framer-motion`.

### 10. **AR Headgear**
   - **Description**: Applies AR filters (e.g., wizard hat, astronaut helmet) using the webcam.
   - **How to Interact**: Select a filter and toggle the camera on or off.
   - **Implementation**: Uses the MediaDevices API for webcam access and overlays images.
   - **Libraries Used**: None.

### 11. **Contact Form**
   - **Description**: A form to send messages directly to the portfolio owner.
   - **How to Interact**: Fill out the form and click "Send Message" to submit.
   - **Implementation**: Uses `emailjs-com` to send emails.
   - **Libraries Used**: `emailjs-com`.

### 12. **Navbar**
   - **Description**: A responsive navigation bar with desktop and mobile views.
   - **How to Interact**: Click on a section link to navigate. Use the toggle button to expand or collapse the sidebar.
   - **Implementation**: Uses `framer-motion` for animations and `IntersectionObserver` for active section detection.
   - **Libraries Used**: `framer-motion`.

### References
- **framer-motion**: For animations and transitions.
- **papaparse**: For parsing CSV data from Google Sheets.
- **@react-three/fiber** and **@react-three/xr**: For 3D and AR rendering.
- **emailjs-com**: For email functionality.
- **lucide-react**: For icons.
