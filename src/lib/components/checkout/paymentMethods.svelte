<script lang="ts">
	import CreditCardMaskedInput from '$lib/components/inputs/creditCardMaskedInput.svelte';
	import PaymentAutofill from '$lib/developer/paymentAutofill.svelte';
	import { dev } from '$app/environment';

	const paymentMethods = [{ id: 'credit-card', title: 'Credit Card' }];

	let creditCardNumber = '';
	let creditCardExp = '';
	let creditCardCvv = '';
	let creditCardName = '';
	$: isAmex = creditCardNumber.startsWith('34') || creditCardNumber.startsWith('37');

	function dev__setCardDetails(details: any) {
		const { cardNumber, cardExp, cardCvv, cardName } = details;
		creditCardNumber = cardNumber || creditCardNumber;
		creditCardExp = cardExp || creditCardExp;
		creditCardCvv = cardCvv || creditCardCvv;
		creditCardName = cardName || creditCardName;
	}
</script>

<div class="mt-10 border-t border-gray-200 pt-10">
	<h2 class="text-lg font-medium text-gray-900">Payment</h2>
	{#if paymentMethods.length > 1}
		<fieldset class="mt-4">
			<legend class="sr-only">Payment type</legend>
			<div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
				{#each paymentMethods as paymentMethod, paymentMethodIdx}
					<div class="flex items-center">
						<input
							id={paymentMethod.id}
							checked={paymentMethodIdx === 0}
							class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
							name="payment-type"
							type="radio"
						/>
						<label for={paymentMethod.id} class="ml-3 block text-sm font-medium text-gray-700"
							>{paymentMethod.title}</label
						>
					</div>
				{/each}
			</div>
		</fieldset>
	{/if}
	<div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
		<div class="col-span-2">
			<label class="block text-sm font-medium text-gray-700" for="card-number"> Card number </label>
			<div class="mt-1">
				<CreditCardMaskedInput bind:value={creditCardNumber} />
			</div>
		</div>
		<div class="col-span-1">
			<label class="block text-sm font-medium text-gray-700" for="expiration-date">
				Expiry date
			</label>
			<div class="mt-1">
				<input
					id="expiration-date"
					autocomplete="cc-exp"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="ccExpiry"
					type="text"
					placeholder="MM/YY"
					maxlength="5"
					inputmode="numeric"
					bind:value={creditCardExp}
				/>
			</div>
		</div>
		<div class="col-span-1">
			<label class="block text-sm font-medium text-gray-700" for="cvc">CVC</label>
			<div class="mt-1">
				<input
					id="cvc"
					autocomplete="csc"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="ccSecurityCode"
					type="text"
					maxlength={isAmex || !creditCardNumber.length ? 4 : 3}
					placeholder={creditCardNumber.length ? (isAmex ? '· · · ·' : '· · ·') : ''}
					inputmode="numeric"
					bind:value={creditCardCvv}
				/>
			</div>
		</div>
		<div class="col-span-2 sm:col-span-4">
			<label class="block text-sm font-medium text-gray-700" for="name-on-card">
				Name on card
			</label>
			<div class="mt-1">
				<input
					id="name-on-card"
					autocomplete="cc-name"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					name="ccName"
					type="text"
					bind:value={creditCardName}
				/>
			</div>
		</div>
	</div>
	{#if dev}
		<PaymentAutofill setCardDetails={dev__setCardDetails} />
	{/if}
</div>
