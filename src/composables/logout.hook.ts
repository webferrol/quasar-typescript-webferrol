import { useRouter } from "vue-router";
import { useStoreUsers } from "src/stores/users";
import { storeToRefs } from "pinia";


export const useLogout = () => {
    const router = useRouter();
    const { handleSignOut } =  useStoreUsers();
    const { user } = storeToRefs(useStoreUsers());
    const onLogout = async () => {
        
        await handleSignOut();
        user.value = null;
        router.push({name:'Home'});
    }

    return {
        onLogout,
    }
}