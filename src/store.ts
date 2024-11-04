import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';

export interface IPost {
	id: number,
	title: string,
	body: string
}

export interface IComment {
	id: number,
	name: string,
	email: string,
	body: string
}

type State = {
	post: IPost | undefined,
	posts: IPost[],
	comments: IComment[],
	isLoading: boolean,
	status: string,
}

type Actions = {
	loadPosts: () => void,
	loadComments: (id: number) => void,
	loadPost: (id: number) => void,
}

export const useStore = create<State & Actions>((set) => ({
	post: undefined,
  posts: [],
	comments: [],
	isLoading: true,
	status: '',
  loadPosts: async () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { isPending, error, data } = useQuery({
			queryKey: ['posts'],
			queryFn: () =>
				fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
					res.json(),
				),
		})
		if (isPending) {
			set(() => ({ isLoading: true, status: 'Loading' }))
		} else if (error) {
			set(() => ({ isLoading: false, status: 'Load failed' }))
		} else {
			set(() => ({ isLoading: false, posts: data }))
		}
	},
	loadComments: async (id: number) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { isPending, error, data } = useQuery({
			queryKey: ['comments'],
			queryFn: () =>
				fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then((res) =>
					res.json(),
				),
		})
		if (isPending) {
			set(() => ({ isLoading: true, status: 'Loading' }))
		} else if (error) {
			set(() => ({ isLoading: false, status: 'Load failed' }))
		} else {
			set(() => ({ isLoading: false, comments: data }))
		}
	},
	loadPost: async (id: number) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { isPending, error, data } = useQuery({
			queryKey: ['posts'],
			queryFn: () =>
				fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
					res.json(),
				),
		})
		if (isPending) {
			set(() => ({ isLoading: true, status: 'Loading' }))
		} else if (error) {
			set(() => ({ isLoading: false, status: 'Load failed' }))
		} else {
			set(() => ({ isLoading: false, post: data }))
		}
	},
}));
