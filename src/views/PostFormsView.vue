<!-- <template>
    <div class="margin-navbar"></div>
    <nav class="nav-lvl-2">
        <h2 class="nav-lvl-2-item" v-for="tabla in listaTablas" @click="openForm(tabla)">{{ tabla }}</h2>
    </nav>
    <h1>{{ tablaActiva }}</h1>

    <div>
        <uniForm v-if='tabla == "universidades"'></uniForm>
        <carreraInfo v-if='tabla == "carreras"'></carreraInfo>
        <asignaturasInfo v-if='tabla == "asignaturas"'></asignaturasInfo>
        <paisForm v-if='tablaActiva == "paises"'></paisForm>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUpdated } from 'vue';

import { useRoute, useRouter } from "vue-router";
import uniForm from '@/components/UniversidadForm.vue';
import carreraInfo from '@/components/CarreraInfo.vue';
import asignaturasInfo from '@/components/AsignaturasInfo.vue';
import paisForm from '@/components/PaisForm.vue';

const listaTablas = ['Paises', 'Universidades', 'Carreras', 'Asignaturas', 'Competencias']

const route = useRoute();
const router = useRouter();

const componente = ref()

const tabla = ref()
const tablaActiva = ref()
const id = ref()

onUpdated(() => {

    tabla.value = route.params.tabla

})

const openForm = (tabla) => {
    console.log(tabla)
    switch (tabla.toLowerCase()) {
        case "paises":
            tablaActiva.value = "paises"
            componente.value = paisForm;
            break;
        case "universidades":
            tablaActiva.value = "universidades"
            componente.value = UniForm;
            router.push("/insert/universidades");
            break;
        case "carreras":
            componente.value = CarreraForm;
            break;
        case "asignaturas":
            componente.value = AsignaturaForm;
            break;
        case "competencias":
            componente.value = CompetenciaForm;
            break;
        default:
            componente.value = null;
    }
}

onMounted(() => {
    // componente.value = null
    tabla.value = null
    id.value = null
})

</script>
  
<style>
.margin-navbar {
    width: 100vw;
    /* Ocupa todo el ancho de la pantalla */
    height: 3rem;
}

.nav-lvl-2 {
    display: flex;
    justify-content: space-evenly;
    font-size: 0.80rem;
    background-color: aquamarine;
    width: 100vw;
}

.nav-lvl-2-item {
    width: 100%;
    align-content: center;

    &:hover {
        background-color: #5a9ed1;
        color: white;
    }
}
</style>
 -->


<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const rutas = [
  {
    path: "/paises/new",
    label: "Países",
  },
  {
    path: "/universidades/new",
    label: "Universidades",
  },
  {
    path: "/carreras/new",
    label: "Carreras",
  },
  {
    path: "/asignaturas/new",
    label: "Asignaturas",
  },
  {
    path: "/competencias/new",
    label: "Competencias",
  },
];

const handleClick = (ruta) => {
  router.push(ruta.path);
};
</script>

<template>
    <div class="margin-navbar"></div>

  <div>
    <h1>Crear registro</h1>

    <ul>
      <li v-for="ruta in rutas" :key="ruta.path">
        <button @click="handleClick(ruta)">
          {{ ruta.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style>
.margin-navbar {
    width: 100vw;
    /* Ocupa todo el ancho de la pantalla */
    height: 3rem;
}
</style>