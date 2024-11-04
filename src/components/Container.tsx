import Post from './Post';
import { useStore, IPost } from '../store';

const Container = () => {
	const loadPosts = useStore((state) => state.loadPosts);
	const posts = useStore((state) => state.posts);
	const isLoading = useStore((state) => state.isLoading);
	const status = useStore((state) => state.status);
	
	loadPosts();

	return (
		<div className="flex flex-col pt-6 items-center justify-start h-screen mx-auto">
			<h1 className="text-2xl text-sky-600 font-semibold text-md">Posts</h1>
			<div className="flex flex-wrap p-6 items-center justify-start h-screen mx-auto">
				{isLoading && <p className="flex items-center justify-center h-screen max-w-2xl mx-auto">{status}</p>}
				{posts.map((post:IPost) => (
					<Post
						key={post.id}
						id={post.id}
						title={post.title}
						body={post.body}
					/>
				))}
			</div>
		</div>
	)
};

export default Container;
