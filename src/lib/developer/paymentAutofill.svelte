<script lang="ts">
	export let setCardDetails: any;

	function autoFill(type: string) {
		if (type === 'amex') {
			setCardDetails({
				cardName: 'George Washington',
				cardNumber: '370000000000002',
				cardExp: '12/25',
				cardCvv: '900'
			});
		} else if (type === 'noMatchCvv') {
			setCardDetails({
				cardCvv: '901'
			});
		}
	}
</script>

<div class="mt-3">
	<button class="border border-blue-100" type="button" on:click={() => autoFill('amex')}>
		autofill amex
	</button>
	<button class="border border-red-100" type="button" on:click={() => autoFill('noMatchCvv')}>
		set no cvv match
	</button>
</div>
