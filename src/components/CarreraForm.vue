<template>
    <div>

        <form @submit.prevent="onSubmit" class="creater-form">
            <!-- TODO: poner labels -->
            <label for="codigo">Código de carrera:</label>
            <input type="text" name="codigo" placeholder="Código" v-model="modeloCarrera.codigo" required>

            <label for="rama_id">Rama de estudios</label>
            <select name="rama_id" id="" v-model="modeloCarrera.rama_id" required>
                <option value="1">Humanidades</option>
                <option value="2">Ciencias sociales y jurídicas</option>
                <option value="3">Ciencias</option>
                <option value="4">Ingeniería/Arquitectura</option>
                <option value="5">Educacion</option>
                <option value="new">
                    <input type="text" name="custom_rama_id" placeholder="Rama ID">
                </option>
            </select>

            <label for="id_universidad">Universidad</label>
            <select name="id_universidad" v-model="modeloCarrera.id_universidad" required>
                <option v-for="uni in listaUnis" :key="uni.id" :value="uni.id">{{ uni.nombre }}</option>
            </select>

            <label for="nombre">Nombre de carrera:</label>
            <input type="text" name="nombre" placeholder="Nombre" v-model="modeloCarrera.nombre" required>

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

const listaUnis = ref([]);

const modeloCarrera = ref({
    codigo: "",
    rama_id: 0,
    id_universidad: 0,
    nombre: "",
});

const onSubmit = async () => {
    console.log(modeloCarrera.value);
    try{
    // Enviamos los datos del formulario al servidor
    const response = await axios.post("http://localhost:8000/v1/carreras/new", modeloCarrera.value);

    console.log(response);

    // Si la petición se ha realizado correctamente, mostramos un mensaje de éxito
    if (response.status === 201) {
        modeloCarrera.reset();
        alert("Carrera creada correctamente");
    }
    } catch (error) {

        console.log("Error en la solicitud:", error);
    
    if (error.response.status === 400) {
        alert("Esa carrera ya existe");
    }
    if (error.response.status === 422) {
        alert("El formulario no se ha podido procesar, revise los datos");
    }
}
};

const cargarUnis = async () => {
    try {
        const response = await axios.get("http://localhost:8000/v1/universidades");
        listaUnis.value = response.data.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
};

onMounted(() => {
    cargarUnis();
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

  