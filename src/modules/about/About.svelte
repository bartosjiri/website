<script lang="ts">
	import { ABOUT_LINKS } from './about.constants';
</script>

<div class:about={true}>
	<div class:bio={true}>
		<p>
			bartosjiri is a&nbsp;software engineer specializing in&nbsp;creative and&nbsp;user-centered
			digital experiences, thriving in&nbsp;0→1&nbsp;work.
		</p>
	</div>
	<!-- <div class:availability={true}>
		<a href="mailto:jobs@bartosjiri.com" target="_blank">
			<span class:dot={true}></span>Available for work
		</a>
	</div> -->
	<div class:links={true}>
		<a href={ABOUT_LINKS.TWITTER} target="_blank">X/Twitter</a>
		<a href={ABOUT_LINKS.GITHUB} target="_blank">Github</a>
		<a href={ABOUT_LINKS.EMAIL} target="_blank">hi@bartosjiri.com</a>
	</div>
</div>

<style lang="scss">
	.about {
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
		overflow: auto;

		@include breakpoint($breakpoint-tablet) {
			overflow: unset;
		}

		.bio {
			max-width: 40rem;
		}

		// .availability {
		// 	.dot {
		// 		display: inline-block;
		// 		height: 0.85rem;
		// 		width: 0.85rem;
		// 		background: #2cff05;
		// 		border-radius: 50%;
		// 		margin-right: 0.75rem;
		// 	}
		// }

		.links {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			row-gap: 0.4rem;
		}
	}
</style>
