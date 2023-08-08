<script lang="ts">
	import { onMount } from 'svelte';

	import { dayjs } from '$util/dayjs';

	const TIMEZONE = 'Europe/Prague';
	const FORMAT = 'HH:mm';

	let localTime = dayjs().tz(TIMEZONE).format(FORMAT);

	onMount(() => {
		setInterval(() => {
			localTime = dayjs().tz(TIMEZONE).format(FORMAT);
		}, 1000);
	});
</script>

{localTime}
