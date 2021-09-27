<script>
	import Header from './header.svelte';
	import Footer from './footer.svelte';
</script>

<main>
	<Header />
	<div class="app-container">
		<slot />
	</div>
	<Footer />
</main>

<style>
	.app-container {
		margin: 15px;
	}
</style>
