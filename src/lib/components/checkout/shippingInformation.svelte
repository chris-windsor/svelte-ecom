<script lang="ts">
	import { limitToUSA } from '$lib/config.json';
</script>

<div class="mt-10 border-t border-gray-200 pt-10">
	<h2 class="text-lg font-medium text-gray-900">Shipping information</h2>
	<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
		<div>
			<label class="block text-sm font-medium text-gray-700" for="first-name">First name</label>
			<div class="mt-1">
				<input
					id="first-name"
					autocomplete="given-name"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="first-name"
					type="text"
				/>
			</div>
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700" for="last-name">Last name</label>
			<div class="mt-1">
				<input
					id="last-name"
					autocomplete="family-name"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="last-name"
					type="text"
				/>
			</div>
		</div>
		<div class="sm:col-span-2">
			<label class="block text-sm font-medium text-gray-700" for="company">Company</label>
			<div class="mt-1">
				<input
					id="company"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="company"
					type="text"
				/>
			</div>
		</div>
		<div class="sm:col-span-2">
			<label class="block text-sm font-medium text-gray-700" for="street-address">Address</label>
			<div class="mt-1">
				<input
					id="street-address"
					autocomplete="street-address"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="street-address"
					type="text"
				/>
			</div>
		</div>
		<div class="sm:col-span-2">
			<label class="block text-sm font-medium text-gray-700" for="street-address-2">
				Apartment, suite, etc.
			</label>
			<div class="mt-1">
				<input
					id="street-address-2"
					autocomplete="street-address-2"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="street-address-2"
					type="text"
				/>
			</div>
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700" for="city">City</label>
			<div class="mt-1">
				<input
					id="city"
					autocomplete="address-level2"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="city"
					type="text"
				/>
			</div>
		</div>
		{#if !limitToUSA}
			<div>
				<label class="block text-sm font-medium text-gray-700" for="country">Country</label>
				<div class="mt-1">
					<select
						id="country"
						autocomplete="country-name"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						name="country"
					>
						<option>United States</option>
						<option>Canada</option>
						<option>Mexico</option>
					</select>
				</div>
			</div>
		{/if}
		<div>
			<label class="block text-sm font-medium text-gray-700" for="region">
				State{limitToUSA ? '' : ' / Province'}
			</label>
			<div class="mt-1">
				<input
					id="region"
					autocomplete="address-level1"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="region"
					type="text"
				/>
			</div>
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700" for="postal-code">
				{limitToUSA ? 'ZIP ' : 'Postal '}code
			</label>
			<div class="mt-1">
				<input
					id="postal-code"
					autocomplete="postal-code"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="postal-code"
					type="text"
				/>
			</div>
		</div>
		<div class="sm:col-span-2">
			<label class="block text-sm font-medium text-gray-700" for="phone">Phone</label>
			<div class="mt-1">
				<input
					id="phone"
					autocomplete="tel"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="phone"
					type="text"
					inputmode="tel"
				/>
			</div>
		</div>
	</div>
</div>
