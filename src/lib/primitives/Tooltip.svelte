<script lang="ts">
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	let content: string | null;
	let isHovering = false;
	let cursorPosition = [0, 0];

	const handleMouseMove = (e: MouseEvent) => {
		cursorPosition = [e.clientX, e.clientY];
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			document.querySelectorAll('[data-tooltip]').forEach((el) => {
				el.addEventListener('mouseenter', () => {
					isHovering = true;
					content = el.getAttribute('data-tooltip');
				});
				el.addEventListener('mouseleave', (e) => {
					isHovering = false;
				});
			});
		}
	});
</script>

<svelte:window on:mousemove={handleMouseMove} />
<div
	class:tooltip-tracker={true}
	style={`top: ${cursorPosition[1] + 12}px; left: ${cursorPosition[0] + 12}px;`}
>
	{#if isHovering && content}
		<div
			class:tooltip={true}
			in:slide={{ duration: 125, easing: sineInOut, axis: 'x' }}
			out:fade={{ duration: 125, easing: sineInOut }}
		>
			<span>{content}</span>
		</div>
	{/if}
</div>

<style lang="scss">
	.tooltip-tracker {
		position: fixed;

		.tooltip {
			display: none;
			position: relative;
			width: 100%;
			background: var(--color-background-01);
			border: 1px solid var(--color-foreground-02);
			border-radius: 10px;
			box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
			pointer-events: none;
			z-index: 9999;

			span {
				display: block;
				font-size: var(--font-size-01);
				padding: var(--spacing-01) var(--spacing-03);
				white-space: pre;
			}

			@media (hover: hover) {
				display: block;
			}
		}
	}
</style>
