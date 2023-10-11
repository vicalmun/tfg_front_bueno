<template>
    <div class="login-container">
        <form @submit.prevent="login">
            <div>
            <label for="username">Username:</label>
            <input type="text" v-model="username" required>
        </div>
            <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" required>
        </div>

            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

const useStore = useAuthStore();

const { isAuthenticated, usrToken } = storeToRefs(useStore);


const username = ref('');
const password = ref('');
const router = useRouter();


const login = async () => {
    try {
        const response = await axios.post('http://localhost:8000/login', {
            username: username.value,
            password: password.value,
        });

        // Assuming the server responds with a token upon successful login
        const token = response.data.access_token;

        // Store the token in Axios headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Store the token in Local Storage
        localStorage.setItem('userToken', token);
        isAuthenticated.value = true;
        usrToken.value = token;

        if (response.status == 200) {
            // Redirigir a la ruta deseada
            router.push('/me');
            location.reload();
        }

        // Optionally, you can redirect the user to a different page after successful login
        // router.push('/dashboard');
    } catch (error) {
        if (error.response) {
            console.error('Código de respuesta HTTP de error:', error.response.status);
            console.error('Mensaje de error:', error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor');
        } else {
            console.error('Error al hacer la solicitud:', error.message);
        }
        if (error.response.status === 404) {
            alert('No se ha encontrado un usuario con las credenciales ingresadas')
        }
    }
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    padding: 20px;
    width: 40%;
    min-height: 400px;
    background-color: #f0f4f8;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #5a9ed1;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}
</style>
  