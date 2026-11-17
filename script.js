// STEP 1: Load saved notices from localStorage (or start with an empty array)
let notices = JSON.parse(localStorage.getItem("notices")) || [];

// Get the elements we need from the page
const form = document.getElementById("noticeForm");
const list = document.getElementById("noticeList");
const filter = document.getElementById("filter");

// ADMIN LOGIN: the PIN is stored here; isAdmin remembers the login for this tab
const ADMIN_PIN = "9166";
let isAdmin = sessionStorage.getItem("isAdmin") === "true";

const loginForm = document.getElementById("loginForm");
const adminInfo = document.getElementById("adminInfo");
const logoutBtn = document.getElementById("logoutBtn");

// Show the login box or the "Logged in" bar, depending on isAdmin
function updateAdminBar() {
  loginForm.hidden = isAdmin;
  adminInfo.hidden = !isAdmin;
}

// Login: compare the typed PIN with ADMIN_PIN
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (document.getElementById("password").value === ADMIN_PIN) {
    isAdmin = true;
    sessionStorage.setItem("isAdmin", "true");
  } else {
    alert("Wrong PIN");
  }
  loginForm.reset();
  updateAdminBar();
  renderNotices(); // re-draw so Delete buttons appear
});

// Logout
logoutBtn.addEventListener("click", function () {
  isAdmin = false;
  sessionStorage.removeItem("isAdmin");
  updateAdminBar();
  renderNotices(); // re-draw so Delete buttons disappear
});

// STEP 2: Save the array to localStorage (stored as text, so we convert to JSON)
function saveNotices() {
  localStorage.setItem("notices", JSON.stringify(notices));
}

// STEP 3: Draw all notices on the page
function renderNotices() {
  list.innerHTML = ""; // clear old cards
  const selected = filter.value;

  // Keep only the chosen category, then sort newest date first
  const visible = notices
    .filter(n => selected === "All" || n.category === selected)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (visible.length === 0) {
    list.innerHTML = "<p class='empty'>No notices to show.</p>";
    return;
  }

  // Build one card per notice
  visible.forEach(n => {
    const card = document.createElement("div");
    card.className = "card";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = n.category + " | " + n.date;

    const heading = document.createElement("h3");
    heading.textContent = n.title;

    const text = document.createElement("p");
    text.textContent = n.description;

    card.append(meta, heading, text);

    // Only the admin gets a Delete button
    if (isAdmin) {
      const del = document.createElement("button");
      del.className = "delete";
      del.textContent = "Delete";
      del.onclick = () => deleteNotice(n.id);
      card.appendChild(del);
    }

    list.appendChild(card);
  });
}

// STEP 4: Delete a notice using its unique id
function deleteNotice(id) {
  if (!isAdmin) return; // safety check: non-admins cannot delete
  notices = notices.filter(n => n.id !== id);
  saveNotices();
  renderNotices();
}

// Add a new notice when the form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading

  notices.push({
    id: Date.now(), // current time in ms works as a unique id
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value
  });

  saveNotices();
  renderNotices();
  form.reset();
});

// Re-draw whenever the filter changes
filter.addEventListener("change", renderNotices);

// When the page first loads: set up the login bar and show saved notices
updateAdminBar();
renderNotices();
