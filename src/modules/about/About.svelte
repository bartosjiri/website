<div class:about={true}>
	<div class:bio={true}>
		<p>@TODO: About</p>
	</div>
	<div class:links={true}>
		<a href="https://x.com/bartosjiri_" target="_blank">X/Twitter</a>
		<a href="https://github.com/bartosjiri" target="_blank">Github</a>
		<a href="mailto:hi@bartosjiri.com" target="_blank">hi@bartosjiri.com</a>
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

		.links {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			row-gap: 0.4rem;
		}
	}
</style>
