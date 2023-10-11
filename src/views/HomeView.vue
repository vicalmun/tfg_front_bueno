<script setup>
import UserLogin from '../components/UserLogin.vue';
</script>

<template>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Young+Serif&display=swap" rel="stylesheet">
  </head>
  <main>
    <div class="main-content" id="inicio">
      <h1 style="font-family: 'Young Serif', serif;">erAPPsmus</h1>
      <h2>Busca tus asignatura fácilmente desde casa</h2>
      <br>
      <h3 class="boton">
        <router-link :to="`/busqueda`" style="color: white">
          Empezar
        </router-link>
      </h3>
    </div>
  </main>
</template>


<style>
#inicio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}


.boton {
  padding: 10px 20px;
  /* Ajusta el padding según tus preferencias */
  background-color: #3498db;
  /* Color de fondo del botón */
  color: #ffffff;
  /* Color del texto */
  border: none;
  /* Quita el borde del botón si no lo deseas */
  border-radius: 4px;
  /* Bordes redondeados */
  cursor: pointer;
  /* Cambia el cursor al pasar por encima para indicar que es cliclable */

}

.boton:hover {
  background-color: #2980b9;
  /* Cambia el color de fondo al pasar por encima */
}</style>