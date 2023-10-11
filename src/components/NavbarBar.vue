
<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="navbar-link">Inicio</router-link>
      <router-link class="navbar-link" to="/colecciones">Colecciones</router-link>
      <router-link class="navbar-link" to="/busqueda">Búsqueda</router-link>
      <!-- <router-link class="navbar-link" to="/info">Info</router-link> TODO: quitarlo de aquí cuando avabe pruebas -->
      <router-link v-if="user_obj.role == 'admin'" class="navbar-link" to="/insert">Insert</router-link> <!-- TODO: quitarlo de aquí cuando avabe pruebas-->
    </div>
    <!-- <div class="navbar-center">
      <input type="text" class="search-bar" placeholder="Buscar">
    </div> -->
    <div class="navbar-right">
      <RouterLink class="navbar-link user-icon" to="/me">
        <img src="@/assets/tabler-icon-user-circle.png" alt="usuario" width="32">
      </RouterLink>

      <p v-show="user_obj.token != ''">
        {{ user_obj.full_name }} ({{ user_obj.role }})
      </p>
    </div>
  </nav>
</template>
  
<script setup>
import { RouterLink } from 'vue-router'

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";


const useStoreAuth = useAuthStore();
const useStoreUser = useUserStore();

const { isAuthenticated, usrToken } = storeToRefs(useStoreAuth);
const { user_obj } = storeToRefs(useStoreUser);

// console.log(user_obj);

</script>
<style>
/* Estilos CSS para personalizar la barra de navegación */
.navbar {
  position: fixed;
  /* Posiciona la barra de navegación de forma fija */
  top: 0;
  /* La barra estará pegada en la parte superior */
  left: 0;
  /* La barra estará pegada al borde izquierdo */
  width: 100vw;
  /* Ocupa todo el ancho de la pantalla */
  height: 3rem;
  background-color: #007bff;
  /* Color azul de fondo */
  color: #fff;
  /* Color blanco para el texto */
  padding: 10px;
  /* Espacio interno para el contenido */
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.navbar-right,
.navbar-left,
.navbar-center {
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  max-width: fit-content;
  min-width: 10%;
}

.navbar-link {
  text-decoration: none;
  color: white;
  margin: 0 1rem;
  font-size: 1rem;
}

.user-icon {
  text-decoration: none;
  height: fit-content;
  color: white;
}


/* Estilos específicos para el botón de sesión */
.session-button {
  border-radius: 5px;
  background-color: #fff;
  /* Fondo blanco para el botón de sesión */
  color: #007bff;
  /* Color azul para el texto del botón de sesión */
  border: none;
  cursor: pointer;
}

/* Estilos para la barra de búsqueda */
.search-bar {
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  /* Fondo blanco para la barra de búsqueda */
  color: #333;
  /* Color del texto de la barra de búsqueda */
}</style>