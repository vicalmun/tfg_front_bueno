import axios from "axios";
import { ref } from "vue";

export const useGetData = () => {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(true);

    const getData = async (url) => {
        loading.value = true;
        try {
            const res = await axios.get(url);
            data.value = res.data.data;     // es data.data porque el segundo data es por mi API (que en qué momento se lo puse...)
        } catch (e) {
            error.value = "Error de servidor";
        } finally {
            loading.value = false;
        }
    };

    return { data, error, loading, getData };
};