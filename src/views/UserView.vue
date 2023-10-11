<template>
    <div>
        <div v-if="token">



        <button @click="logout">Logout</button>

        <h1>Contenido del servidor:</h1>
        <p>{{ serverResponse }}</p>
    </div>
    <div v-else>
        <UserLogin></UserLogin>
    </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import UserLogin from "@/components/UserLogin.vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";


const useStoreAuth = useAuthStore();
const useStoreUser = useUserStore();

const { isAuthenticated, usrToken } = storeToRefs(useStoreAuth);
const { user_obj } = storeToRefs(useStoreUser);
const { setUser } = useStoreUser;

const router = useRouter();


const serverResponse = ref(null);


const token = localStorage.getItem('userToken'); // Recuperar el token del localStorage

// Configuración global de Axios para agregar el token a la cabecera de las solicitudes
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



    const getData = async () => {
    try {
        const { data } = await axios.get("http://localhost:8000/users/me");

        serverResponse.value = data;
        setUser(data)
        // console.log(user_obj);
    } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);

    }}

    getData();


const logout = () => {
    localStorage.removeItem('userToken'); // Eliminar el token del localStorage
    usrToken.value = null;
    isAuthenticated.value = false;
    router.push('/');
    location.reload();
}
</script>
  