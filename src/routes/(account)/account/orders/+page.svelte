<script lang="ts">
	import OrderInvoice from '$lib/components/account/orderInvoice.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const orders = [
		{
			products: [
				{
					id: 1,
					name: 'Distant Mountains Artwork Tee',
					price: '$36.00',
					description:
						'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
					address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
					email: 'f•••@example.com',
					phone: '1•••••••••40',
					href: '#',
					status: 'Processing',
					step: 1,
					date: 'March 24, 2021',
					datetime: '2021-03-24',
					imageSrc:
						'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
					imageAlt:
						'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.'
				},
				{
					id: 1,
					name: 'Green Abyss Tee',
					price: '$42.00',
					description: 'Time to fly. Far far away into the green abyss',
					address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
					email: 'f•••@example.com',
					phone: '1•••••••••40',
					href: '#',
					status: 'Processing',
					step: 1,
					date: 'March 24, 2021',
					datetime: '2021-03-24',
					imageSrc:
						'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-02.jpg',
					imageAlt:
						'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.'
				}
			]
		},
		{
			products: [
				{
					id: 1,
					name: 'Distant Mountains Artwork Tee',
					price: '$36.00',
					description:
						'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
					address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
					email: 'f•••@example.com',
					phone: '1•••••••••40',
					href: '#',
					status: 'Processing',
					step: 1,
					date: 'March 24, 2021',
					datetime: '2021-03-24',
					imageSrc:
						'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
					imageAlt:
						'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.'
				},
				{
					id: 1,
					name: 'Green Abyss Tee',
					price: '$42.00',
					description: 'Time to fly. Far far away into the green abyss',
					address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
					email: 'f•••@example.com',
					phone: '1•••••••••40',
					href: '#',
					status: 'Processing',
					step: 1,
					date: 'March 24, 2021',
					datetime: '2021-03-24',
					imageSrc:
						'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-02.jpg',
					imageAlt:
						'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.'
				}
			]
		}
	];
</script>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900">Order History</h1>
	{#each orders as order}
		<OrderInvoice {order} />
	{/each}
</div>
