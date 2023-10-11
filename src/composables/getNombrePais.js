import axios from "axios";
import { ref } from "vue";

// TODO: se puede eliminar porque no se usa
    const getName = async (id_pais) => {
        loading.value = true;
        try {
            const res = await axios.get(`${process.env.VUE_APP_URL_DB}/v1/paises/${id_pais}/nombre`);
            data.value = res.data;     // es data.data porque el segundo data es por mi API (que en qué momento se lo puse...)
        } catch (e) {
            error.value = "Error de servidor";
        } finally {
            loading.value = false;
        }

        return { data, error, loading, getName};
    };


const seLlama = (obj) => {
    if (obj.nombre) {
        return obj.nombre;
    }
    else {
        return obj.codigo;
    }
}

