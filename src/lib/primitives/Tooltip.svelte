<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

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
{#if isHovering && content}
	<div
		class:tooltip={true}
		style={`top: ${cursorPosition[1] + 4}px; left: ${cursorPosition[0] + 4}px;`}
		transition:fade={{ duration: 150 }}
	>
		<span>{content}</span>
	</div>
{/if}

<style lang="scss">
	.tooltip {
		position: fixed;
		padding: var(--spacing-01) var(--spacing-03);
		background: var(--color-background-01);
		border: 1px solid var(--color-foreground-02);
		border-radius: 10px;
		box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
		pointer-events: none;
		z-index: 9999;

		span {
			font-size: var(--font-size-01);
			white-space: pre;
		}
	}
</style>
