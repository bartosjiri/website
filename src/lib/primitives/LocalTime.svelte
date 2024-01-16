<script lang="ts">
	import { onMount } from 'svelte';

	import { dayjs } from '$util/dayjs';

	const TIMEZONE = 'Europe/Prague';
	const FORMAT = 'HH:mm';

	const getLocalTime = () => {
		return dayjs().tz(TIMEZONE).format(FORMAT).split(':');
	};

	let localTime = getLocalTime();

	onMount(() => {
		setInterval(() => {
			localTime = getLocalTime();
		}, 1000);
	});
</script>

<div class:localtime={true}>
	{localTime[0]}<span class:colon={true}>:</span>{localTime[1]}
	<slot />
</div>

<style lang="scss">
	.localtime {
		display: inline-block;

		&:hover {
			.colon {
				animation: timeColonAnimation 1s infinite;
			}
		}

		@keyframes timeColonAnimation {
			0%,
			50% {
				opacity: 0;
			}

			50.00001%,
			100% {
				opacity: 1;
			}
		}
	}
</style>
