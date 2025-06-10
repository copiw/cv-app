function checkLogin() {
  if (!localStorage.getItem("email")) {
    window.location.href = "index.html";
  }
}

// LOGIN
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

// FORM SUBMIT
document.getElementById("cvForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.setItem("name", document.getElementById("name").value);
  localStorage.setItem("birth", document.getElementById("birth").value);
  localStorage.setItem("education", document.getElementById("education").value);

  const photoFile = document.getElementById("photo").files[0];
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function () {
      localStorage.setItem("photo", reader.result);
      window.location.href = "cv.html";
    };
    reader.readAsDataURL(photoFile);
  } else {
    // Kalau tidak pilih foto, tetap jalan tapi tanpa foto
    localStorage.removeItem("photo");
    window.location.href = "cv.html";
  }
});

// LOAD CV
function loadCV() {
  checkLogin();

  const name = localStorage.getItem("name");
  const birth = localStorage.getItem("birth");
  const email = localStorage.getItem("email");
  const photo = localStorage.getItem("photo");
  const education = localStorage.getItem("education");

  // Tampilkan info
  document.getElementById("cvName").innerText = name || "Nama tidak ditemukan";
  document.getElementById("cvBirth").innerText = birth || "TTL tidak ditemukan";
  document.getElementById("cvEmail").innerText = email || "Email tidak ditemukan";

  // Foto profil
  const profilePic = document.getElementById("profilePic");
  if (photo) {
    profilePic.style.backgroundImage = `url(${photo})`;
    profilePic.style.backgroundSize = "cover";
    profilePic.style.backgroundPosition = "center";
  }

  // Riwayat pendidikan
  const educationList = document.getElementById("educationList");
  if (education) {
    education.split("\n").forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      educationList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "Tidak ada riwayat pendidikan.";
    educationList.appendChild(li);
  }
}
