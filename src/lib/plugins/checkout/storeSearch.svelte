<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import { Map, Marker, controls } from '@beyonk/svelte-mapbox';
	import { PUBLIC_MAPBOX_KEY } from '$env/static/public';
	const { GeolocateControl, NavigationControl, ScaleControl } = controls;

	let mapComponent: Map;

	function handleMapReady() {
		mapComponent.setCenter([-111.8508, 40.3916], 20);
		mapComponent.flyTo({ center: [-111.8508, 40.3916] });
	}
</script>

{#if $cart.items.filter((item) => item.attributes.find((attribute) => attribute.id === 4)).length}
	<div class="mt-10 border-t border-gray-200 pt-10">
		<h2 class="text-lg font-medium text-gray-900">Select a store for pickup</h2>
		<div class="mt-4">
			<label class="block text-sm font-medium text-gray-700" for="store-search">
				Preferred Store
			</label>
			<div class="mt-1">
				<input
					id="store-search"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="store-search"
					type="text"
					placeholder="Search by postal code or city & state"
				/>
			</div>
		</div>
		<div class="h-60 mt-6 rounded overflow-hidden">
			<Map
				bind:this={mapComponent}
				accessToken={PUBLIC_MAPBOX_KEY}
				options={{ scrollZoom: false }}
				on:ready={handleMapReady}
			>
				<Marker lat={40.3916} lng={-111.8508} color={123123} label="The Lemonade Stand" />
				<NavigationControl />
				<GeolocateControl options={{ some: 'control-option' }} />
				<ScaleControl />
			</Map>
		</div>
	</div>
{/if}
