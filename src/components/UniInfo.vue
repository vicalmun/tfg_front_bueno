<template>
    <div v-if="universidad">
        <h1>{{ universidad.nombre }}</h1>
        <p>Código: {{ universidad.codigo }} | 
        País: <router-link :to="`/info/paises/${pais.id}`">
            {{ pais.nombre }}
                </router-link> |
        Ciudad: {{ universidad.ciudad }} | 
        Erasmus: {{ universidad.hace_erasmus == 1 ? "Sí" : "No" }}</p>
        <p>Carreras que tiene esta universidad:</p>
        <ul>
            <li v-for="carrera in carreras" :key="carrera.id">
                <router-link :to="`/info/carreras/${carrera.id}`">
                {{ carrera.nombre }}
                </router-link>
               
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { RouterLink } from 'vue-router'


const props = defineProps(['id'])

const universidad = ref()
const carreras = ref([])
const pais = ref()



const getUni = async () => {
    const res = await axios.get(`http://localhost:8000/v1/universidades/${props.id}`)
    universidad.value = res.data.data
    getPais(universidad.value.pais)
}

const getCarreras = async () => {
    // Hacemos una petición a la URL para obtener la lista de carreras
    const response = await axios.get(`http://localhost:8000/v1/universidades/${props.id}/carreras`)
    carreras.value = response.data.data
}

const getPais = async (pais_id) => {
    const res = await axios.get(`http://localhost:8000/v1/paises/${pais_id}`);
    pais.value = res.data.data
}

onMounted(() => {
    getUni()
    getCarreras()
})


</script>
