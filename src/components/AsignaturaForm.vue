<template>
  <div>
    <!-- TODO: debería hacer un filtro para que antes de añadir la asignatura pudiese elegir en qué universidad / carrera -->

    <form @submit.prevent="onSubmit" class="creater-form">
      <label for="nombre">Nombre de la asignatura:</label>
      <input type="text" name="nombre" placeholder="Nombre" v-model="modeloAsignatura.nombre" required>

      <label for="codigo">Código de asignatura:</label>
      <input type="text" name="codigo" placeholder="Código" v-model="modeloAsignatura.codigo" required>

      <label for="creditos">Créditos:</label>
      <input type="number" name="creditos" placeholder="Créditos" v-model="modeloAsignatura.creditos" required>

      <label for="cuatrimestre">Cuatrimestre (1 / 2):</label>
      <input type="number" name="cuatrimestre" placeholder="Cuatrimestre" v-model="modeloAsignatura.cuatrimestre"
        required>

      <label for="idioma">Idioma:</label>
      <input type="text" name="idioma" placeholder="Idioma" v-model="modeloAsignatura.idioma" required>

      <label for="tipo">Tipo de asignatura:</label>
      <input type="text" name="tipo" placeholder="Tipo" v-model="modeloAsignatura.tipo" required>

      <label for="carrera_id">Carrera a la que pertenece</label>
      <select name="carrera_id" v-model="modeloAsignatura.carrera_id" required>
        <option v-for="carrera in listaCarreras" :key="carrera.id" :value="carrera.id">{{ carrera.nombre }}</option>
      </select>
      <!-- TODO: OJO aqui, debería añadir este campo y relacionarlo en la tabla intermedia ->> es más trabajo de back -->

      <label>Elige las competencias que tenga esta carrera:</label>
      <div class="checkbox-list">
        <div class="cb_competencia">
      <label v-for="(competencia, index) in listaCompetencias" :key="index">
        <input class="cb_competencia" type="checkbox" v-model="modeloAsignatura.competencias" :value="competencia.id">{{ competencia.codigo }} - {{
          competencia.descripcion }}<br>
      </label>
    </div>
  </div>

      <input type="submit" value="Crear">
    </form>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";
import axios from 'axios';
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";


const useStoreAuth = useAuthStore();
const useStoreUser = useUserStore();

const { isAuthenticated, usrToken } = storeToRefs(useStoreAuth);
const { user_obj } = storeToRefs(useStoreUser);

const listaCarreras = ref([]);
const listaCompetencias = ref([]);

const modeloAsignatura = ref({
  nombre: "",
  codigo: "",
  creditos: 0,
  cuatrimestre: 0,
  idioma: "",
  tipo: "",
  carrera_id: "",
  competencias: [],
});

const onSubmit = async () => {
  console.log(modeloAsignatura.value);
  // Enviamos los datos del formulario al servidor
  const response = await axios.post("http://localhost:8000/v1/asignaturas/new", modeloAsignatura.value);

  // Si la petición se ha realizado correctamente, mostramos un mensaje de éxito
  if (response.status === 201) {
    alert("Asignatura creada correctamente");
  }
};

const cargarCarreras = async () => {
  try {
    const response = await axios.get("http://localhost:8000/v1/carreras");
    listaCarreras.value = response.data.data;
  } catch (error) {
    console.error('Error fetching carreras:', error);
  }
};

const cargarCompetencias = async () => {
  try {
    const response = await axios.get("http://localhost:8000/v1/competencias");
    listaCompetencias.value = response.data.data;
  } catch (error) {
    console.error('Error fetching competencias:', error);
  }
};


onMounted(() => {
  cargarCarreras();
  cargarCompetencias();
});

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

.cb_competencia {
    justify-content: flex-start;
    align-items: baseline;
    gap: 0.5rem;
}

.cb_competencia input{
    width: auto !important;
}


.margin-navbar {
    height: 4rem;
}

.checkbox-list {
    max-height: 300px;
    overflow: auto;
    border: 1px solid #ccc;
}

</style>