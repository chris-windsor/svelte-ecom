<script lang="ts">
	import { customer } from '$lib/stores/customer';
	import { limitToUSA } from '$lib/config.json';
</script>

<div class="mt-10 border-t border-stone-700 pt-10">
	<h2 class="text-lg font-medium text-white">Shipping information</h2>
	<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
		<div>
			<label class="block text-sm font-medium text-gray-700" for="first-name">First name</label>
			<div class="mt-1">
				<input
					id="first-name"
					autocomplete="given-name"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="firstName"
					type="text"
					bind:value={$customer.firstName}
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
					name="lastName"
					type="text"
					bind:value={$customer.lastName}
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
					bind:value={$customer.company}
				/>
			</div>
		</div>
		<div class="sm:col-span-2">
			<label class="block text-sm font-medium text-gray-700" for="street-address">Address</label>
			<div class="mt-1">
				<input
					id="street-address"
					autocomplete="address-line1"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="streetAddress1"
					type="text"
					bind:value={$customer.address}
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
					autocomplete="address-line2"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="streetAddress2"
					type="text"
					bind:value={$customer.address2}
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
					bind:value={$customer.city}
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
					name="state"
					type="text"
					bind:value={$customer.state}
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
					name="zipCode"
					type="text"
					bind:value={$customer.zipCode}
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
					name="phoneNumber"
					type="text"
					inputmode="tel"
					bind:value={$customer.phoneNumber}
				/>
			</div>
		</div>
	</div>
</div>
