<script lang="ts">
	export let isPulsing = false;
</script>

<div class:status-dot={true} class:--pulsing={isPulsing} {...$$restProps} />

<style lang="scss">
	.status-dot {
		--size: var(--spacing-02);
		--color: var(--color-green-01);

		position: relative;
		display: inline-block;
		width: var(--size);
		height: var(--size);
		background: var(--color);
		border-radius: 50%;

		&.--pulsing {
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: var(--size);
				height: var(--size);
				border-radius: 50%;
				background: var(--color);
				box-shadow: 0 0 0 0 var(--color);
				animation: statusDotAnimation 2s infinite;
			}
		}

		@keyframes statusDotAnimation {
			0% {
				transform: scale(0.95);
				box-shadow: 0 0 0 0 var(--color);
			}

			70% {
				transform: scale(1);
				box-shadow: 0 0 0 var(--size) rgba(0, 0, 0, 0);
			}

			100% {
				transform: scale(0.95);
				box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
			}
		}
	}
</style>
