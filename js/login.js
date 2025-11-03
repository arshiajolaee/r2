function switchTab(tab) {
  const loginTab = document.querySelector(".tab:first-child");
  const registerTab = document.querySelector(".tab:last-child");
  const loginForm = document.getElementById("login");
  const registerForm = document.getElementById("register");
  const logoContainer = document.getElementById("logoContainer");

  if (tab === "login") {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  } else {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  }

  // Animate logo
  logoContainer.classList.add("move-up");
  setTimeout(() => {
    logoContainer.classList.remove("move-up");
  }, 600);
}
