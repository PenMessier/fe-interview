import { IComment } from '../store';

const Comment = ({ name, email, body }:IComment) => {
	return (
		<div className="grid grid-cols-1 gap-6 m-6 p-4">
			<h2 className="capitalize text-lg font-semibold text-slate-900">{name}</h2>
			<p className="text-md font-normal text-stone-400">{email}</p>
			<p className="text-md font-normal text-stone-600">{body}</p>
		</div>
	)
};

export default Comment;
