<template>
  <div>
    <div class="margin-navbar"></div>

    <form @submit.prevent="onSubmit" class="creater-form">
      <!-- TODO: hacer aqui un select con las opciones -->
      <label for="tipo_competencia">Tipo de competencia:</label>
      <select name="tipo_competencia" v-model="modeloCompetencia.tipo_competencia" required>
        <option value="Básica">Básica</option>
        <option value="General">General</option>
        <option value="Transversal">Transversal</option>
        <option value="Específica">Específica</option>
        <option value="new">
          <input type="text" name="custom_tipo_competencia" placeholder="Tipo de competencia">
        </option>
      </select>

      <label for="codigo">Código de competencia:</label>
      <input type="text" name="codigo" placeholder="Código" v-model="modeloCompetencia.codigo" required>

      <label for="descripcion">Descripción de la competencia:</label>
      <input type="text" name="descripcion" placeholder="Descripción" v-model="modeloCompetencia.descripcion" required>
      
      <input type="submit" value="Crear">

    </form>
  </div>
  <div v-if="err.hasError" class="error">
    {{ err.message }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import axios from 'axios';
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";


const useStoreAuth = useAuthStore();
const useStoreUser = useUserStore();
const err = ref({
  hasError: false,
  message: "",
});

const { isAuthenticated, usrToken } = storeToRefs(useStoreAuth);
const { user_obj } = storeToRefs(useStoreUser);

const modeloCompetencia = ref({
  tipo_competencia: "",
  codigo: "",
  descripcion: "",
});

const onSubmit = async () => {
  try {
    // Enviamos los datos del formulario al servidor
    const response = await axios.post("http://localhost:8000/v1/competencias/new", modeloCompetencia.value);

    // Si la petición se ha realizado correctamente, mostramos un mensaje de éxito
    if (response.status === 201) {
      modeloCompetencia.reset();
      alert("Competencia creada correctamente");
    }
  }
  catch (error) {
    console.error("Error en la solicitud:", error);
    err.value.hasError = true;
    err.value.message = error;

    if (error.response.status == 422) {
      err.value.message = "El formulario no se ha podido procesar, revise los datos";
    }
    if (error.response.status == 400) {
      err.value.message = "Esa competencia ya existe";
    }


  }
};
</script>


<style>
.creater-form {
    display: flex;
    flex-direction: column;
    width: 50% !important;
    margin: 0 auto;
}

form input,
select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
}

.isErasmus {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    gap: 0.5rem;
}

.isErasmus input{
    width: auto !important;
}


.margin-navbar {
    height: 4rem;
}

</style>