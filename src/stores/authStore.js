// authStore.js
import { defineStore } from 'pinia';
import { computed, ref } from "vue";


export const useAuthStore = defineStore('auth', () => {

    const isAuthenticated = ref(false);
    const usrToken = ref('');

    // TODO: aquí siento que tengo que hacer algo
    const login = (user_id) => {
        isAuthenticated.value = true;
        //usrToken.value = localStorage.getItem('userToken')? localStorage.getItem('userToken') : '';
    }

    const logout = () => {
        isAuthenticated.value = false;
        usrToken.value = '';
        localStorage.removeItem('userToken');

    }

    return {
        isAuthenticated,
        usrToken
    };
})
