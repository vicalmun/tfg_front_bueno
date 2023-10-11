<template>
    <div v-if="asignatura">
        <h1>{{ asignatura.nombre }}</h1>
        <p>Código: {{ asignatura.codigo }}</p>
        <p> Se incluye en el plan de estudios de <router-link :to="`/info/carreras/${carrera.id}`">{{ carrera.nombre }}</router-link>
            de la universidad <router-link :to="`/info/universidades/${universidad.id}`">
                {{ universidad.nombre }}
            </router-link>
        </p>

        <ul>
            <li>Créditos: {{ asignatura.creditos }}</li>
            <li>Cuatrimestre: {{ asignatura.cuatrimestre }}</li>
            <li>Idioma: {{ asignatura.idioma }}</li>
            <li>Asignatura de tipo {{ asignatura.tipo }}</li>
        </ul>
        <p>Competencias que tiene esta asignatura:</p>

        <ul v-if="thereAreCompetencias" style="list-style-type: none">
            <li v-for="competencia in competencias" :key="competencia.id">
                <table class="border_bottom">
                    <tr>
                        <th>
                            Código competencia
                        </th>
                        <th>
                            Tipo
                        </th>
                        <th>
                            Descripción
                        </th>
                    </tr>
                    <tr>
                        <td class="fit_text up_text">
                            <router-link :to="`/info/competencias/${competencia.id}`">
                                {{ competencia.codigo }}
                            </router-link>
                        </td>
                        <td class="fit_text up_text">
                            {{ competencia.tipo_competencia }}
                        </td>
                        <td class="fit_text up_text">
                            {{ competencia.descripcion }}
                        </td>
                    </tr>
                </table>
            </li>
        </ul>

        <p class="message_error" v-else>NO tiene campos</p>
        
        <div v-if="listAsigConvalidadas.length != 0">
        <p>Asignaturas con las que se puede convalidar:</p>
        <ul>
            <li v-for="asig in listAsigConvalidadas">
                <router-link :to="`/info/asignaturas/${asig.id}`" target="_blank">
                    <p>{{ asig.nombre }}</p>
                </router-link>
            </li>
        </ul>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const props = defineProps(['id'])

const asignatura = ref()
const carrera = ref()
const universidad = ref()

const competencias = ref([])
const listAsigConvalidadas = ref([]);

const thereAreCompetencias = ref(false);


const getAsignatura = async () => {
    const res = await axios.get(`http://localhost:8000/v1/asignaturas/${props.id}`)
    asignatura.value = res.data.data

    const res2 = await axios.get(`http://localhost:8000/v1/asignaturas/${props.id}/carrera`)
    carrera.value = res2.data.data

    const res3 = await axios.get(`http://localhost:8000/v1/carreras/${carrera.value.id}/universidad`)
    universidad.value = res3.data.data
}

const getCompetencias = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/v1/asignaturas/${props.id}/competencias`)
        competencias.value = response.data.data
        console.log(competencias.value);
        thereAreCompetencias.value = true;

    } catch (error) {
        console.error('No se han encontrado competencias:', error);
        thereAreCompetencias.value = false;
    }
}

const getConvalidaciones = async () => {
    const response = await axios.get(`http://localhost:8000/v1/asignaturas/${props.id}/convalidaciones`);
    listAsigConvalidadas.value = response.data.data;
    listAsigConvalidadas.value.shift();
}

onMounted(() => {
    getAsignatura()
    getCompetencias()
    getConvalidaciones()
})


</script>

<style>
.fit_text {
    width: 25vw;
    max-width: 50%;
    white-space: pre-wrap;
}

.up_text {
    vertical-align: top;
}

.border_bottom {
    border-bottom: 1px black dashed;
}
</style>