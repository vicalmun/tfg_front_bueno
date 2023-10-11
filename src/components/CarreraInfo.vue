<template>
    <div v-if="carrera">
        <h1>{{ carrera.nombre }}</h1>
        <p>Código: {{ carrera.codigo }}</p>
        <p> Se cursa en <router-link :to="`/info/universidades/${universidad.id}`">
                {{ universidad.nombre }}
            </router-link></p>
        <p>Asignaturas que tiene esta carrera:</p>
        <ul style="list-style-type: none">
            <li v-for="asignatura in carreras" :key="carrera.id">
                <table class="border_bottom">
                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Cuatrimestre
                        </th>
                        <th>
                            Créditos
                        </th>
                        <th>
                            Tipo de asignatura
                        </th>
                        <th>
                            Idioma
                        </th>
                    </tr>
                    <tr>
                        <td class="fit_text up_text">
                            <router-link :to="`/info/asignaturas/${asignatura.id}`">
                                {{ asignatura.nombre }}
                            </router-link>
                        </td>
                        <td class="fit_text up_text">
                            {{ asignatura.cuatrimestre }}
                        </td>
                        <td class="fit_text up_text">
                            {{ asignatura.creditos }}
                        </td>
                        <td class="fit_text up_text">
                            {{ asignatura.tipo }}
                        </td>
                        <td class="fit_text up_text">
                            {{ asignatura.idioma }}
                        </td>
                    </tr>
                </table>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const props = defineProps(['id'])

const carrera = ref()
const universidad = ref()
const carreras = ref([])



const getCarrera = async () => {
    const res = await axios.get(`http://localhost:8000/v1/carreras/${props.id}`)
    carrera.value = res.data.data

    const res2 = await axios.get(`http://localhost:8000/v1/carreras/${props.id}/universidad`)
    universidad.value = res2.data.data
    // getNombreUni(carrera.value.pais)
}

const getAsignaturas = async () => {
    // Hacemos una petición a la URL para obtener la lista de carreras
    const response = await axios.get(`http://localhost:8000/v1/carreras/${props.id}/asignaturas`)
    carreras.value = response.data.data
}


onMounted(() => {
    getCarrera()
    getAsignaturas()
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