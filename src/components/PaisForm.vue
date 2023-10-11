<template>
    <div class="margin-navbar"></div>

    <form @submit.prevent="enviarFormulario" class="creater-form">
        <div>
            <label for="codigo">Código:</label>
            <input type="text" id="codigo" v-model="modeloPais.codigo" maxlength="2" required>
        </div>
        <div>
            <label for="region">Región:</label>
            <input type="text" id="region" v-model="modeloPais.region" required>
        </div>
        <div>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="modeloPais.nombre" required>
        </div>
        <div>
            <button type="submit">Enviar</button>
        </div>
    </form>
</template>


<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";


const useStoreAuth = useAuthStore();
const useStoreUser = useUserStore();

const { isAuthenticated, usrToken } = storeToRefs(useStoreAuth);
const { user_obj } = storeToRefs(useStoreUser);

// console.log(user_obj);
const modeloPais = ref({
    codigo: '',
    region: '',
    nombre: '',
});

const enviarFormulario = () => {
    console.log(modeloPais.value);
    // Realizar la solicitud POST a la API
    fetch('http://localhost:8000/v1/paises/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modeloPais.value),
    })
        .then((response) => {
            if (response.ok) {
                // Manejar la respuesta exitosa
                // Por ejemplo, redirigir a una página de confirmación
                alert('Formulario enviado con éxito');
            } else {
                if (response.status == 400) {
                    alert('El país que desea añadir ya existe');
                }
                // Manejar errores de la API
                console.error(response.status, 'Error al enviar el formulario');
            }
        })
        .catch((error) => {
            // Manejar errores de red u otros errores
            console.error('Error de red:', error);
        });
}
</script>


<style>

.creater-form {
    display: flex;
    flex-direction: column;
    width: 50% !important;
    margin: 0 auto;
}
form input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
}

.margin-navbar {
    height: 4rem;
}

</style>
  