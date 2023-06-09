<template>
  <main>
    <form @submit="login">
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" name="email" />
        <div class="email error">{{ emailError }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" />
        <div class="password error">{{ passwordError }}</div>
      </div>
      <div class="form-group">
        <button
          class="bg-primary-500 text-primary-100 hover:bg-primary-400"
          type="submit"
        >
          Log in
        </button>
        <p>
          Não tem uma conta?
          <router-link to="/signup">Cadastre-se</router-link>
        </p>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const emailError = ref('')
const passwordError = ref('')

const login = async (e) => {
  e.preventDefault()
  const form = e.target
  // reset errors
  emailError.value = ''
  passwordError.value = ''
  // get values
  const email = form.email.value
  const password = form.password.value

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      emailError.value = data.errors.email
      passwordError.value = data.errors.password
    }
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user))
      location.assign('/')
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
a {
  color: var(--rosa);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h2 {
  color: var(--h);
}

ul {
  padding: 0;
  display: flex;
  gap: 1rem;
}

li {
  list-style: none;
}

form {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
}
form button {
  margin: auto;
  margin-top: 10px;
}
form a {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #999;
  font-size: 0.8em;
}
form a:hover {
  color: #333;
}
input,
select,
textarea {
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}
select {
  width: 26.67em;
}
label {
  display: block;
  margin: 20px 0 10px;
}
button {
  margin-top: 30px;
  border-radius: 36px;
  border: 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
}
.error {
  color: #ff0099;
  margin: 10px 2px;
  font-size: 0.8em;
  font-weight: bold;
}

@media screen and (min-width: 768px) {
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1rem;
  }
}
</style>
