<template>
    <div class="">
        <nav class="nav-lvl-2">
            <h2 class="nav-lvl-2-item" v-for="tabla in listaTablas" @click="changeTable(tabla)">{{ tabla }}</h2>
        </nav>
        <br>
        <div class="titulo">
            <h1>{{ tablaActiva }}</h1>
            <input v-if="tablaActiva" type="text" v-model="search" placeholder="Escribe aquí tu búsqueda">
        </div>

        <div>
            <ul>
                <li v-for="item in filteredList" :key="item.id">{{ item.nombre ? item.nombre : item.codigo }}
                    - <router-link :to="`/info/${tablaActiva.toLowerCase()}/${item.id}`">
                        (más info)
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useGetData } from "@/composables/getData";

const URLBD = process.env.VUE_APP_URL_DB

const { data, error, loading, getData } = useGetData();


const listaTablas = ['Paises', 'Universidades', 'Carreras', 'Asignaturas', 'Competencias']

const tablaActiva = ref('')
const search = ref('')

const changeTable = (tabla) => {
    tablaActiva.value = tabla
    getData(`${URLBD}/v1/${tablaActiva.value.toLowerCase()}`);
}

const filteredList = computed(() => {
    if (!search.value) {
        return data.value
    }
    else {
        return data.value.filter((item) => {
            return item.nombre.toLowerCase().includes(search.value.toLowerCase())
        })
    }
})
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}

.nav-lvl-2 {
    position: fixed;
    top: 3rem;
    left: 0;
    display: flex;
    justify-content: space-evenly;
    font-size: 0.80rem;
    background-color: aquamarine;
    width: 100vw;
}

.nav-lvl-2-item {
    width: 100%;
    align-content: center;
    text-align: center;

    &:hover {
        background-color: #5a9ed1;
        color: white;
    }
}

.titulo{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1rem;
    align-items: center;
    margin: 1rem;
}
</style>
