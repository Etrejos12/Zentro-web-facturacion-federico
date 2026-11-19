import { supabase } from './supabase.js'

const formulario = document.querySelector('#loginForm')

formulario.addEventListener('submit', async (e) => {

    e.preventDefault()

    const email = document.querySelector('#Usuario').value.trim()
    const password = document.querySelector('#Contraseña').value

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        alert('Correo o contraseña incorrectos')
        console.error(error.message)
        return
    }

    window.location.href = "dashboard_home.html";

})