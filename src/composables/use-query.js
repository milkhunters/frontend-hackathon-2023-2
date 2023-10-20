import { onMounted, ref } from 'vue';
import { useMutation } from '@/composables/use-mutation';

export const useQuery = (query) => {
  const { isLoading, isReady, mutate } = useMutation(query);
  const response = ref(null);

	const fetchData = async () => {
    response.value = await mutate();
	};

  onMounted(fetchData);

	return { isLoading, isReady, response };
};