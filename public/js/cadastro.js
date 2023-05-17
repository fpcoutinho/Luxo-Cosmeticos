const nameError = document.querySelector(".name.error");
const surnameError = document.querySelector(".surname.error");
const emailError = document.querySelector(".email.error");
const dataNascimentoError = document.querySelector(".dataNascimento.error");
const passwordError = document.querySelector(".password.error");
const confirmPasswordError = document.querySelector(".confirmPassword.error");

// Remove mensagens de erro quando o usuário digitas nos inputs
const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const emailInput = document.querySelector("#email");
const dataNascimentoInput = document.querySelector("#dataNascimento");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");

nameInput.addEventListener("input", () => {
  nameError.textContent = "";
});
surnameInput.addEventListener("input", () => {
  surnameError.textContent = "";
});
emailInput.addEventListener("input", () => {
  emailError.textContent = "";
});
dataNascimentoInput.addEventListener("input", () => {
  dataNascimentoError.textContent = "";
});
passwordInput.addEventListener("input", () => {
  passwordError.textContent = "";
});
confirmPasswordInput.addEventListener("input", () => {
  confirmPasswordError.textContent = "";
});

// Cria usuário
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const surname = form.surname.value;
  const email = form.email.value;
  const dataNascimento = form.dataNascimento.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  try {
    const res = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        email,
        dataNascimento,
        password,
        confirmPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.errors) {
      nameError.textContent = data.errors.name;
      surnameError.textContent = data.errors.surname;
      emailError.textContent = data.errors.email;
      dataNascimentoError.textContent = data.errors.dataNascimento;
      passwordError.textContent = data.errors.password;
      confirmPasswordError.textContent = data.errors.confirmPassword;
    }
    if (password !== confirmPassword) {
      document.querySelector(".confirmPassword.error").textContent =
        "As senhas não coincidem.";
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});
