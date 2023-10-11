// authStore.js
import { defineStore } from 'pinia';
import { computed, ref } from "vue";


export const useUserStore = defineStore('user', () => {

    const user_obj = ref({
        full_name: '',
        token: '',
    });
    
    const user_name = ref(user_obj.value.full_name);
    const usrToken = ref('');

    const setUser = (user) => {
        user_obj.value = user;
    }

    return {
        user_obj,
        user_name,
        usrToken,
        setUser
    };
})
