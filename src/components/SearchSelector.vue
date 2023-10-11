<template>
    <div class="search">
        <div class="search_form_container">
            <h2>Países:</h2>
            <form action="">
                <select v-model="paisSeleccionado" @change="actualizaUnis">
                    <option :value="null" disabled selected>Elige un país</option>
                    <option v-for="pais in listaPaises" :key="pais.id" :value="pais">{{ pais.nombre }}</option>
                </select>

                <h2>Universidades:</h2>
                <select v-model="uniSeleccionada" @change="actualizaCarreras">
                    <option :value="null" disabled selected>Elige antes un país</option>
                    <option v-for="universidad in listaUnis" :key="universidad.id" :value="universidad">{{
                        universidad.nombre }}</option>
                </select>

                <h2>Carreras:</h2>
                <select v-model="carreraSeleccionada" @change="actualizaAsignaturas">
                    <option :value="null" disabled selected>Elige antes una universidad</option>
                    <option v-for="carrera in listaCarreras" :key="carrera.id" :value="carrera">{{ carrera.nombre }}
                    </option>
                </select>

                <h2>Asignaturas:</h2>
                <select v-model="asigSeleccionada" @change="muestraInfo">
                    <option :value="null" disabled>Elige antes una carrera</option>
                    <option v-for="asignatura in listaAsignaturas" :key="asignatura.id" :value="asignatura">
                        {{ asignatura.nombre }}</option>
                </select>
            </form>
        </div>


        <div class="quick_info_preview results_search_container">
            <div v-if="uniSeleccionada && !carreraSeleccionada" class="uni_quick_info">
                <h2> {{ uniSeleccionada.nombre }}
                    <router-link class="underline_text" :to="`/info/universidades/${uniSeleccionada.id}`" target="_blank">
                        Más info </router-link>
                </h2>
            </div>

            <div v-if="carreraSeleccionada && !asigSeleccionada" class="carrera_quick_info">
                <h3>{{ carreraSeleccionada.nombre }}
                    <router-link class="underline_text" :to="`/info/carreras/${carreraSeleccionada.id}`" target="_blank">
                        Más info </router-link>
                </h3>
            </div>

            <div v-if="asigSeleccionada">
                <h3>Selección:
                    <router-link class="underline_text" :to="`/info/asignaturas/${asigSeleccionada.id}`" target="_blank">
                        <span class="underline_text">{{ asigSeleccionada.nombre }}</span>
                    </router-link>

                </h3>
                <p>Cuatrimestre: <span class="bold_text">{{ asigSeleccionada.cuatrimestre }}</span> | 
                    Créditos: <span class="bold_text">{{ asigSeleccionada.creditos }}</span> | 
                    Tipo: <span class="bold_text">{{ asigSeleccionada.tipo }}</span> | 
                    Idioma: <span class="bold_text">{{ asigSeleccionada.idioma }}</span>
                </p>

                <div class="message_error" v-if="errorNoConvalidaciones">
                    <p> No existen convalidaciones directas para la asignatura seleccionada </p>
                </div>
                <h3 v-else><br>Se convalida con:</h3>

                <!-- TODO: PONER MÁS INFO Y HACER UN FILTRO POR PAÍS O UNI -->

                <ul>
                    <li v-for="asig in listAsigConvalidadas">
                        <router-link :to="`/info/asignaturas/${asig.id}`" target="_blank">
                            <p>{{ asig.nombre }}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';



const paisSeleccionado = ref();
const uniSeleccionada = ref();
const carreraSeleccionada = ref();

const asigSeleccionada = ref();
const listAsigConvalidadas = ref([]);
// TODO: modificar la vista para que muestre más info a parte de las asignaturas: su uni, su país...
// para eso tengo que con el id de la asig -> buscar carrera -> buscar uni -> buscar país

const errorNoConvalidaciones = ref(true);


const listaPaises = ref([]);
const listaUnis = ref([]);
const listaCarreras = ref([]);
const listaAsignaturas = ref([]);

const fetchURL = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
};


// Función para cargar la lista de países
const cargarPaises = async () => {
    listaPaises.value = await fetchURL("http://localhost:8000/v1/paises?order_by=nombre")
};

const cargarUnis = async () => {
    listaUnis.value = await fetchURL("http://localhost:8000/v1/universidades")
};

const cargarCarreras = async () => {
    listaCarreras.value = await fetchURL("http://localhost:8000/v1/carreras")
};

const cargarAsignaturas = async () => {
    listaAsignaturas.value = await fetchURL("http://localhost:8000/v1/asignaturas")
};

const actualizaUnis = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/v1/universidades?pais=${paisSeleccionado.value.id}`);
        listaUnis.value = response.data.data;
        uniSeleccionada.value = null;
        carreraSeleccionada.value = null;
        asigSeleccionada.value = null;
    } catch (error) {
        console.error('Error fetching universidades:', error);
    }
};

// Función para cargar la lista de carreras según algún criterio (por ejemplo, una selección previa)
const actualizaCarreras = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/v1/carreras/?universidad=${uniSeleccionada.value.id}`);
        listaCarreras.value = response.data.data;
        carreraSeleccionada.value = null;
        asigSeleccionada.value = null;
    } catch (error) {
        console.error('Error fetching carreras:', error);
    }
};

const actualizaAsignaturas = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/v1/asignaturas?carrera=${carreraSeleccionada.value.id}`);
        listaAsignaturas.value = response.data.data;
        asigSeleccionada.value = null;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
};

// TODO: hacer que muestre las asignaturas que se convalidan con la actual
// el truco pa esto es hacer una búsqueda en la tabla de convalidaciones
// Y podría... hacer filtros en la lista resultante --> pero eso ya es otra movida


const muestraInfo = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/v1/asignaturas/${asigSeleccionada.value.id}`);
        asigSeleccionada.value = response.data.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }

    try {
        const response = await axios.get(`http://localhost:8000/v1/asignaturas/${asigSeleccionada.value.id}/convalidaciones`);
        listAsigConvalidadas.value = response.data.data;
        listAsigConvalidadas.value.shift();
        errorNoConvalidaciones.value = false;
        if (listAsigConvalidadas.value.length == 0) {
            errorNoConvalidaciones.value = true;
        }

    } catch (error) {
        console.error('Error fetching countries:', error);
        errorNoConvalidaciones.value = true;
    }
};

const cargarDatos = () => {
    cargarPaises();
};


// Cargar los datos cuando se monta el componente
onMounted(() => {
    cargarDatos();
});


</script>
  
<style>
.bold_text {
    font-weight: bold;
}

.underline_text {
    text-decoration: underline;
}

.search {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
}

.search_form_container {
    margin-left: 1rem;
    padding: 1rem;
    width: 40%;
    height: 100%;
}

.results_search_container {
    width: 60%;
    padding: 1rem;
    border-left: 1pt solid black;
}

select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
}

.message_error {
    margin: 1rem 1rem 1rem 0;
    color: black;
    background-color: rgb(255, 149, 149);
    border-radius: 0.5rem;
    border-color: red;
}

.message_error p {
    padding: 0.5rem;
}
</style>