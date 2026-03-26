// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;



/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;

    let parse;

    try {
        parse = JSON.parse(text);
    } catch (e) {
        alert("Invalid JSON input");
        return;
    }

    if (typeof parse !== "object" || parse === null) {
        alert("Invalid profile object");
        return;
    }

    if (typeof parse.username !== "string") {
        alert("Invalid user");
        return;
    }

    if (!Array.isArray(parse.notifications)) {
        alert("Invalid notification");
        return;
    }

    const sProfile = {
        username: parse.username,
        notifications: parse.notifications.filter(n => typeof n === "string")
    };

    currentProfile = sProfile;
    renderProfile(sProfile);
}


/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {

    
    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");
    list.textContent = "";

    for (let n of profile.notifications) {

        const li = document.createElement("li");

        
        li.textContent = n;

        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    if (!currentProfile || typeof currentProfile !== "object") {
        alert("No profile to save");
        return;
    }

    let validNotifications = [];
    if (Array.isArray(currentProfile.notifications)) {
        validNotifications = currentProfile.notifications.filter(item => typeof item === "string");
    }

    const sProfile = {
        username: currentProfile.username,
        notifications: validNotifications
    };

    localStorage.setItem("profile", JSON.stringify(sProfile));
    alert("Session saved");
}

function loadSession() {

    const store = localStorage.getItem("profile");

    if (!store) return;

    let parse;
    try {
        parse = JSON.parse(store);
    } catch (e) {
        alert("Stored session data is corrupted");
        return;
    }

    if (
        typeof parse !== "object" ||
        parse === null ||
        typeof parse.username !== "string" ||
        !Array.isArray(parse.notifications)
    ) {
        alert("Stored session data is invalid");
        return;
    }

    const sProfile = {
        username: parse.username,
        notifications: parse.notifications.filter(n => typeof n === "string")
    };

    currentProfile = sProfile;
    renderProfile(sProfile);
}
