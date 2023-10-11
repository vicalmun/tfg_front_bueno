<template>
    <div v-if="pais">
        <h1>{{ pais.nombre }}</h1>
        <p>En este país están las siguientes universidades:</p>
        <ul>
            <li v-for="universidad in universidades" :key="universidad.id">
                <router-link :to="`/info/universidades/${universidad.id}`">
                {{ universidad.nombre }}
                </router-link>
               
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { RouterLink, useRoute, useRouter } from 'vue-router'

const router = useRouter();
const props = defineProps(['id'])

const pais = ref()
const universidades = ref([])



const getPais = async () => {
    try {
        const res = await axios.get(`http://localhost:8000/v1/paises/${props.id}`)
        pais.value = res.data.data
    } catch (error) {
        console.error(error)
        if (error.response.status == 404) {
        router.push("/notFound");
        }
    }
}

const getUniversidades = async () => {
    // Hacemos una petición a la URL para obtener la lista de universidades
    const response = await axios.get(`http://localhost:8000/v1/universidades?pais=${props.id}`)
    universidades.value = response.data.data
}


onMounted(() => {
    getPais()
    getUniversidades()
})


</script>
