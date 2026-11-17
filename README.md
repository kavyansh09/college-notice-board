# College Notice Board

A simple browser-based college notice board built with HTML, CSS and JavaScript. It allows users to post notices, filter them by category, and lets an administrator delete notices after logging in.

## Features

- Add notices with a title, category, date and description.
- Categories: Exam, Event, Holiday and General.
- Filter notices by category.
- Display notices with the newest dates first.
- Store notices in the browser using `localStorage`.
- Admin login/logout using a session-based PIN.
- Allow only the logged-in admin to delete notices.
- Responsive, clean single-page layout.

## Project structure

```text
college-notice-board/
├── index.html   # Page structure and forms
├── style.css    # Page styling
├── script.js    # Notice management and browser storage logic
└── README.md    # Project documentation
```

## How to run

No server or dependency installation is required.

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. Add notices using the form.
4. Use the category dropdown to filter notices.
5. Log in as an administrator to display delete buttons.

You can also run it with a local development server, for example:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Important note about admin login

This is a front-end educational project. The administrator PIN is stored in `script.js`, so it is visible to anyone who can inspect the source code. This login must not be considered secure for a real college system. A production version should use a backend server, hashed credentials, authorization checks and a database.

## Data storage

Notices are saved only in the current browser's `localStorage`. They are not shared between users or devices and may be removed when the browser's site data is cleared.

## Technologies used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage` and `sessionStorage`

## Future improvements

- Add a backend API and database.
- Implement secure user authentication.
- Add edit and search functionality.
- Add image or document attachments.
- Add pagination and notice expiry dates.
- Deploy the application online for college-wide access.

## Author

Kavyansh Gupta
