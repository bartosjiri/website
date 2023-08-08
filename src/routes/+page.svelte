<script lang="ts">
	import { PageMeta } from '$util/meta';

	import { Pill, StatusDot, LocalTime, Divider, ProjectCard, Link } from '$lib/primitives';

	import BartosjiriLogo from '$assets/bartosjiri-logo.svg?raw';
	import WeardrobeLogo from '$assets/weardrobe-logo.svg?raw';
	import WeardrobeLogoOutline from '$assets/weardrobe-logo-outline.svg?raw';
	import MultisightLogo from '$assets/multisight-logo.svg?raw';
	import MultisightLogoOutline from '$assets/multisight-logo-outline.svg?raw';
	import GgtvLogo from '$assets/ggtv-logo.svg?raw';
	import GgtvLogoOutline from '$assets/ggtv-logo-outline.svg?raw';
	import MixtapesLogo from '$assets/mixtapes-logo.svg?raw';
	import MixtapesLogoOutline from '$assets/mixtapes-logo-outline.svg?raw';
	import HyperhidrosisLogo from '$assets/hyperhidrosis-logo.svg?raw';
	import HyperhidrosisLogoOutline from '$assets/hyperhidrosis-logo-outline.svg?raw';
	import GoblinphoneLogo from '$assets/goblinphone-logo.svg?raw';
	import GoblinphoneLogoOutline from '$assets/goblinphone-logo-outline.svg?raw';
	import CareerLogo from '$assets/career-logo.svg?raw';
	import CareerLogoOutline from '$assets/career-logo-outline.svg?raw';

	const EMAIL = 'hi@bartosjiri.com';
</script>

<PageMeta />

<section class:header={true}>
	<Pill href={`mailto:${EMAIL}`} class="status" data-tooltip={`Send email to ${EMAIL}`}>
		<StatusDot isPulsing={true} />
		<span>Looking for new full-time job opportunity</span>
	</Pill>
	<div class:time={true}>
		<span>Based in Prague,</span>
		<LocalTime />
		<span>local time</span>
	</div>
</section>

<section class:intro={true}>
	<h1>
		{@html BartosjiriLogo}
		<span>Jiří&nbsp;Bartoš</span> — Full&#8209;stack software engineer, inspired&nbsp;by creative and&nbsp;user&#8209;centric
		design, thriving&nbsp;in 0→1&nbsp;work
	</h1>
</section>

<Divider />

<section class:now-and-next={true}>
	<div class:item={true}>
		<h2>Currently&nbsp;</h2>
		<p>building more side-projects, diving into AR development</p>
	</div>
	<div class:item={true}>
		<h2>Later&nbsp;</h2>
		<p>starting a little personal company, getting a puppy</p>
	</div>
</section>

<section class:projects={true}>
	<h2>Side-projects</h2>
	<div class:list={true}>
		<ProjectCard
			logo={WeardrobeLogo}
			logoOutline={WeardrobeLogoOutline}
			title="Weardrobe"
			href="https://weardrobe.xyz"
			timeframe="Now"
			description="A community-curated digital fashion gallery"
			tooltip="Open weardrobe.xyz"
		/>
		<ProjectCard
			logo={MultisightLogo}
			logoOutline={MultisightLogoOutline}
			title="Multisight"
			href="https://multisight.app"
			timeframe="July 2023"
			description="A multisignature wallet response activity analytics tool"
			tooltip="Open multisight.app"
		/>
		<ProjectCard
			logo={GgtvLogo}
			logoOutline={GgtvLogoOutline}
			title="GGTV"
			href="https://gulaggang.tv"
			timeframe="June 2023"
			description="A GTA5 roleplay community content hub"
			tooltip="Open gulaggang.tv"
		/>
		<ProjectCard
			logo={MixtapesLogo}
			logoOutline={MixtapesLogoOutline}
			title="Mixtapes"
			href="https://mixtapes.bartosjiri.com"
			timeframe="May 2023"
			description="A showcase of personal playlists"
			tooltip="Open mixtapes.bartosjiri.com"
		/>
		<ProjectCard
			logo={HyperhidrosisLogo}
			logoOutline={HyperhidrosisLogoOutline}
			title="Hyperhidrosis.help"
			href="https://hyperhidrosis.help"
			timeframe="April 2023"
			description="An educational microsite about hyperhidrosis"
			tooltip="Open hyperhidrosis.help"
		/>
		<ProjectCard
			logo={GoblinphoneLogo}
			logoOutline={GoblinphoneLogoOutline}
			title="Goblin Phone"
			href="https://goblinphone.vercel.app"
			timeframe="June 2022"
			description="An NFT collection derivative art project"
			tooltip="Open goblinphone.vercel.app"
		/>
	</div>
</section>

<section class:career={true}>
	<h2>Professional experience</h2>
	<div class:list={true}>
		<ProjectCard
			logo={CareerLogo}
			logoOutline={CareerLogoOutline}
			title="Full-stack engineer"
			href={`mailto:${EMAIL}`}
			timeframe="Since November 2019"
			description="2 organizations in total, full resume available upon request"
			tooltip="Send email to hi@bartosjiri.com"
		/>
	</div>
</section>

<section class:contact={true}>
	<h2>Links</h2>
	<div class:list={true}>
		<Link
			href="https://twitter.com/bartosjiri_"
			target="_blank"
			data-tooltip="Open twitter.com/bartosjiri_"
		>
			Twitter
		</Link>
		<Link
			href="https://github.com/bartosjiri"
			target="_blank"
			data-tooltip="Open github.com/bartosjiri"
		>
			GitHub
		</Link>
		<Link href={`mailto:${EMAIL}`} target="_blank" data-tooltip={`Send email to ${EMAIL}`}>
			Email
		</Link>
	</div>
</section>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-04);

		@include breakpoint($breakpoint-medium) {
			flex-direction: column;
			align-items: flex-start;
			row-gap: var(--spacing-02);
		}

		:global(.status) {
			color: var(--color-foreground-02);

			:global(.status-dot) {
				margin-right: calc(var(--spacing-02) * 1.5);
			}
		}

		.time {
			color: var(--color-foreground-02);
		}
	}

	.intro {
		display: flex;
		margin-bottom: var(--spacing-06);

		:global(svg) {
			position: relative;
			top: 1px;
			display: inline-block;
			height: calc(var(--font-size-03) * 0.745);
			width: auto;
		}

		span {
			display: inline-block;
			transform: skewX(18deg);
		}
	}

	.now-and-next {
		display: flex;
		flex-direction: column;
		margin-top: var(--spacing-06);

		.item {
			h2 {
				float: left;
				margin-right: 1px;
			}

			p {
				color: var(--color-foreground-02);
				font-size: var(--font-size-02);
			}
		}
	}

	.projects {
		display: flex;
		flex-direction: column;
		margin-top: var(--spacing-06);

		.list {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: var(--spacing-03);
			margin-top: var(--spacing-03);

			@include breakpoint($breakpoint-medium) {
				grid-template-columns: 1fr;
			}
		}
	}

	.career {
		display: flex;
		flex-direction: column;
		margin-top: var(--spacing-06);

		.list {
			display: grid;
			grid-template-columns: 1fr;
			column-gap: var(--spacing-03);
			margin-top: var(--spacing-03);

			:global(.project-card) {
				:global(svg) {
					&:nth-of-type(1) {
						fill: var(--color-background-02);
					}
				}
			}
		}
	}

	.contact {
		display: flex;
		flex-direction: column;
		margin-top: var(--spacing-06);

		.list {
			display: flex;
			align-items: center;
			column-gap: var(--spacing-03);
			margin-top: var(--spacing-03);

			:global(.link) {
				color: var(--color-foreground-02);
			}
		}
	}
</style>
