<template>
    <div class="margin-navbar"></div>

    <div class="main-content">
        <uniInfo v-if='tabla == "universidades"' :id="id"></uniInfo>
        <carreraInfo v-if='tabla == "carreras"' :id="id"></carreraInfo>
        <asignaturasInfo v-if='tabla == "asignaturas"' :id="id"></asignaturasInfo>
        <paisInfo v-if='tabla == "paises"' :id="id"></paisInfo>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onUpdated } from 'vue';

import { useRoute, useRouter } from "vue-router";
import uniInfo from '@/components/UniInfo.vue';
import carreraInfo from '@/components/CarreraInfo.vue';
import asignaturasInfo from '@/components/AsignaturasInfo.vue';
import paisInfo from '@/components/PaisInfo.vue';

const route = useRoute();
const router = useRouter();

const componente = ref()

const tabla = ref()
const id = ref()

onUpdated (() => {
    
    tabla.value = route.params.tabla
    id.value = route.params.id

})

switch (tabla) {
      case "universidades":
        componente.value = uniInfo;
        break;
      case "carreras":
        componente.value = CarrerasView;
        break;
      case "asignaturas":
        componente.value = AsignaturasView;
        break;
      case "competencias":
        componente.value = CompetenciasView;
        break;
      default:
        componente.value = null;
    }

    onMounted( () => {
      // componente.value = null
      tabla.value = null
      id.value = null
    })

</script>
  
<style>


.main-content {
  margin-top: 3rem;
  height: auto;
  width: 100%;
  padding: 1rem;
}

</style>