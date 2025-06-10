function checkLogin() {
  if (!localStorage.getItem("email")) {
    window.location.href = "index.html";
  }
}

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const domain = email.split("@")[1];

  if (password === domain) {
    localStorage.setItem("email", email);
    window.location.href = "form.html";
  } else {
    alert("Password harus sama dengan domain email");
  }
});

document.getElementById("cvForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.setItem("name", document.getElementById("name").value);
  localStorage.setItem("birth", document.getElementById("birth").value);
  localStorage.setItem("education", document.getElementById("education").value);
  window.location.href = "cv.html";
});

function loadCV() {
  checkLogin();
  document.getElementById("cvName").innerText = localStorage.getItem("name");
  document.getElementById("cvBirth").innerText = localStorage.getItem("birth");
  document.getElementById("cvEmail").innerText = localStorage.getItem("email");

  const educationList = document.getElementById("educationList");
  const education = localStorage.getItem("education").split("\n");
  education.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    educationList.appendChild(li);
  });
}
