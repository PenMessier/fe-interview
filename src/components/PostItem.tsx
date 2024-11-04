import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { useStore, IComment } from '../store';

const PostItem = () => {
	const { id } = useParams();
	const loadComments = useStore((state) => state.loadComments);
	const loadPost = useStore((state) => state.loadPost);
	const comments = useStore((state) => state.comments);
	const isLoading = useStore((state) => state.isLoading);
	const status = useStore((state) => state.status);
	const post = useStore((state) => state.post);

	loadComments(Number(id));
	loadPost(Number(id));

	return (
		<div className="grid grid-cols-1 gap-6 m-6 p-6">
			{isLoading && <p className="flex items-center justify-center h-screen max-w-2xl mx-auto">{status}</p>}
			{!isLoading && post && <>
				<div className="min-w-0 relative flex-auto">
					<button className="border-radius-50"></button>
					<h2 className="capitalize text-lg font-semibold text-slate-900">{post.title}</h2>
				</div>
				<p className="text-lg font-normal text-stone-400">{post.body}</p>
			</>}
			{!isLoading && <>
				<h1 className="text-center text-xl text-sky-600 font-semibold text-md mt-6">Comments</h1>
				<div className="flex flex-wrap p-6 items-center justify-start h-screen mx-auto">
					{comments.map((comment:IComment) => (
						<Comment
							key={comment.id}
							id={comment.id}
							name={comment.name}
							email={comment.email}
							body={comment.body}
						/>
					))}
				</div>
			</>}
		</div>
	)
};

export default PostItem;
