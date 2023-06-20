<!-- 
	Original: https://svelte.dev/repl/e9dc0a586d7d4478b6a6be03396e0f8b?version=3.20.1 

	Changed from original:
	- blur event was blocked on mobile
	- no differentiation for AMEX
	- added inputmode attribute

	Hoping to fix 
-->
<script lang="ts">
	import { tick } from 'svelte';

	export let value = '';

	const maskCharacter = 'x';

	let mask: string;
	$: mask =
		// Different mask for AMEX vs others
		value.startsWith('34') || value.startsWith('37') ? 'xxxx-xxxxxx-xxxxx' : 'xxxx-xxxx-xxxx-xxxx';

	function maskValue(value: string) {
		let masked = '';
		let i = makeDigiter(value);
		if (!i.more) {
			return masked;
		}

		for (const m of mask) {
			if (m === maskCharacter && i.next()) {
				masked += i.value;
			} else if (i.more) {
				masked += m;
			} else {
				break;
			}
		}
		return masked;
	}

	function makeDigiter(value: string) {
		const digits = getDigits(value);
		const { length } = digits;
		let i = 0;

		return {
			more: i < length,
			value: '',
			next() {
				if (this.more) {
					this.value = digits[i];
					i += 1;
					this.more = i < length;
					return true;
				} else {
					return false;
				}
			}
		};
	}

	function getDigits(value: string) {
		let digits = '';
		for (const c of value) {
			if (c >= '0' && c <= maskCharacter) {
				digits += c;
			}
		}
		return digits;
	}

	function handleInput({ target, inputType, type }: InputEvent) {
		const input = target as HTMLInputElement;

		const {
			selectionStart: oldStart,
			selectionEnd: oldEnd,
			value: { length: oldLength }
		} = input;

		let [start, end] = [oldStart || 0, oldEnd || 0];

		value = fixIt(input, value, maskValue(input.value));

		const { length } = value;
		switch (inputType) {
			case 'insertText':
				const adjust = length - oldLength;
				if (adjust > 0) {
					start += adjust;
				} else if (isRightOfMask(start)) {
					start += 1;
				}
				break;

			case 'deleteContentBackward':
				if (isRightOfMask(start)) {
					start -= 1;
				}
				break;

			case 'deleteContentForward':
				if (start === length && isRightOfMask(start)) {
					start -= 1;
				}
				break;
		}

		if (oldStart === oldEnd) {
			end = start;
		}

		if (type === 'input') {
			queueRestoreSelection(input, start, end);
		}
	}

	async function queueRestoreSelection(input: HTMLInputElement, start: number, end: number) {
		await tick();
		input.setSelectionRange(start, end);
	}

	function isRightOfMask(position: number) {
		return position > 1 && mask[position - 1] !== 'x';
	}

	function fixIt(input: HTMLInputElement, state: string, sanitized: string) {
		if (state === sanitized && sanitized !== input.value) {
			input.value = sanitized;
		}
		return sanitized;
	}
</script>

<input
	id="card-number"
	autocomplete="cc-number"
	class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
	name="ccNumber"
	type="text"
	inputmode="numeric"
	maxLength={mask.length}
	on:input={handleInput}
	on:blur={handleInput}
	{value}
/>
