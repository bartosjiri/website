<script lang="ts">
	import { PageMeta } from '$util/meta';

	import { Pill, StatusDot, LocalTime, Divider, ProjectCard, Link } from '$lib/primitives';

	import { removeUrlProtocol } from '$lib/helpers';

	import { PROJECTS } from '$modules/projects';
	import { CONTACT_EMAIL, CONTACT_GITHUB, CONTACT_X } from '$modules/contact';

	import BartosjiriLogo from '$assets/bartosjiri-logo.svg?raw';
	import CareerLogo from '$assets/career-logo.svg?raw';
	import CareerLogoOutline from '$assets/career-logo-outline.svg?raw';
</script>

<PageMeta />

<section class:header={true}>
	<Pill
		href={`mailto:${CONTACT_EMAIL}`}
		class="status"
		data-tooltip={`Send email to ${CONTACT_EMAIL}`}
	>
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
		{#each PROJECTS as { title, logo, logoOutline, description, href, timeframe }}
			<ProjectCard
				{title}
				{logo}
				{logoOutline}
				{description}
				{href}
				{timeframe}
				tooltip={`Open ${removeUrlProtocol(href)}`}
			/>
		{/each}
	</div>
</section>

<section class:career={true}>
	<h2>Professional experience</h2>
	<div class:list={true}>
		<ProjectCard
			logo={CareerLogo}
			logoOutline={CareerLogoOutline}
			title="Full-stack engineer"
			href={`mailto:${CONTACT_EMAIL}`}
			timeframe="Since November 2019"
			description="Resume available upon request"
			tooltip={`Send email to ${CONTACT_EMAIL}`}
		/>
	</div>
</section>

<section class:contact={true}>
	<h2>Links</h2>
	<div class:list={true}>
		<Link href={CONTACT_X} target="_blank" data-tooltip={`Open ${removeUrlProtocol(CONTACT_X)}`}>
			X/Twitter
		</Link>
		<Link
			href={CONTACT_GITHUB}
			target="_blank"
			data-tooltip={`Open ${removeUrlProtocol(CONTACT_GITHUB)}`}
		>
			GitHub
		</Link>
		<Link
			href={`mailto:${CONTACT_EMAIL}`}
			target="_blank"
			data-tooltip={`Send email to ${CONTACT_EMAIL}`}
		>
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
