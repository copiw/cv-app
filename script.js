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
  localStorage.setItem("organization", document.getElementById("organization").value);

  const photoFile = document.getElementById("photo").files[0];

  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function () {
      localStorage.setItem("photo", reader.result);
      window.location.href = "cv.html";
    };
    reader.readAsDataURL(photoFile);
  } else {
    localStorage.removeItem("photo");
    window.location.href = "cv.html";
  }
});

function loadCV() {
  checkLogin();
  document.getElementById("cvName").innerText = localStorage.getItem("name");
  document.getElementById("cvBirth").innerText = localStorage.getItem("birth");
  document.getElementById("cvEmail").innerText = localStorage.getItem("email");

  const profilePic = document.getElementById("profilePic");
  const photo = localStorage.getItem("photo");
  if (photo) {
    profilePic.style.backgroundImage = `url(${photo})`;
    profilePic.style.backgroundSize = "cover";
    profilePic.style.backgroundPosition = "center";
  }

  const educationList = document.getElementById("educationList");
  const education = localStorage.getItem("education");
  if (education) {
    education.split("\n").forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      educationList.appendChild(li);
    });
  }

  const orgList = document.getElementById("organizationList");
  const organization = localStorage.getItem("organization");
  if (organization && organization.trim() !== "") {
    organization.split("\n").forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      orgList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "Tidak ada pengalaman organisasi.";
    orgList.appendChild(li);
  }
}
