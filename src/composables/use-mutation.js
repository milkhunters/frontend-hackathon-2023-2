import { ref } from 'vue';

export const useMutation = (mutationFn) => {
	const isLoading = ref(false);
	const isReady = ref(false);

	const mutate = async (args) => {
		isLoading.value = true;
		const result = await mutationFn(args);
		isLoading.value = false;
		isReady.value = true;
		return result;
	};

	return { isLoading, isReady, mutate };
};
