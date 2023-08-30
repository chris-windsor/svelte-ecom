import type { Customer } from '$lib/peach';
import { createSessionStorage, persist } from '@macfja/svelte-persistent-store';
import { writable, type Writable } from 'svelte/store';

type CustomerStore = Writable<Customer>;

export const customer: CustomerStore = persist(
	writable({
		email: '',
		firstName: '',
		lastName: '',
		company: '',
		address: '',
		address2: '',
		city: '',
		state: '',
		zipCode: '',
		phoneNumber: ''
	}),
	createSessionStorage(),
	'customer'
);
