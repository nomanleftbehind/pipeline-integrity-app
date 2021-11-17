import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import MenuBar from '../../../components/menubar';

export default function Comment() {
	const router = useRouter()
	const { id, comment } = router.query

	return (
		<>
			<h1>Pipeline: {id}</h1>
			<h1>Comment: {comment}</h1>
		</>
	)
}

Comment.getLayout = function getLayout(page: React.ReactNode) {
	return (
		<Layout>
			<MenuBar />
			{page}
		</Layout>
	)
}