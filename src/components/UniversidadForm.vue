<template>
    <div class="margin-navbar"></div>

    <form @submit.prevent="enviarFormulario" class="creater-form">
        <label for="codigo">Código:</label>
        <input type="text" id="codigo" v-model="modeloUni.codigo" required>

        <label for="pais">País:</label>
        <select id="pais" v-model="modeloUni.pais" required>
            <option v-for="pais in listaPaises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
        </select>

        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="modeloUni.nombre" required>

        <label for="ciudad">Ciudad:</label>
        <input type="text" id="ciudad" v-model="modeloUni.ciudad" required>

        <div class="isErasmus">
            <label for="haceErasmus">¿Hace Erasmus?</label>
            <input type="checkbox" id="haceErasmus" v-model="modeloUni.hace_erasmus">
        </div>

        <button type="submit">Enviar</button>
    </form>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import axios from 'axios';


const useStoreAuth = useAuthStore();
const useStoreUser = useUserStore();

const { isAuthenticated, usrToken } = storeToRefs(useStoreAuth);
const { user_obj } = storeToRefs(useStoreUser);

const listaPaises = ref([]);

const modeloUni = ref({
    codigo: "",
    pais: 0,
    nombre: "",
    hace_erasmus: false,
    ciudad: ""
});

const enviarFormulario = () => {
    console.log(modeloUni.value);

    fetch("http://localhost:8000/v1/universidades/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modeloUni.value)
    }).then((response) => {
        if (response.ok) {
            // Manejar la respuesta exitosa
            // Por ejemplo, redirigir a una página de confirmación
            alert('Formulario enviado con éxito');
        } else {
            if (response.status == 400) {
                alert('La universidad que desea añadir ya existe');
            }
            // Manejar errores de la API
            console.error('Error al enviar el formulario');
        }
    })
        .catch((error) => {
            // Manejar errores de red u otros errores
            console.error('Error de red:', error);
        });
}

const cargarPaises = async () => {
    try {
        const response = await axios.get("http://localhost:8000/v1/paises?order_by=nombre");
        listaPaises.value = response.data.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
    // console.log(listaPaises.value);
};

onMounted(() => {
    cargarPaises();
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

  