import { 
	Route, 
	createBrowserRouter, 
	createRoutesFromElements,
	RouterProvider
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './Pages/HomePage';
import JobsPage from './Pages/JobsPage';
import NotFoundPage from './Pages/NotFoundPage';
import JobPage, {jobLoader} from './Pages/JobPage';
import AddJobPage from './Pages/AddJobPage';
import EditJobPage from './Pages/EditJobPage';

const App = () => {
	
	const addJob = async (newJob) => {
		const res = await fetch('/api/jobs/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newJob),
		});
		return;
	}

	const delJob = async (id) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: 'DELETE'
		});
		return;
	}

	const updateJob = async (job) => {
		console.log(job);
		const res = await fetch(`/api/jobs/${job.id}`, {
			method: 'put',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(job),
		});
		return;
	}

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/jobs' element={<JobsPage />} />
				<Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
				<Route 
					path='/edit-job/:id' 
					element={<EditJobPage updateJob={updateJob} />} 
					loader={jobLoader}
				/>				
				<Route 
					path='/jobs/:id' 
					element={<JobPage delJob={delJob}  />} 
					loader={jobLoader}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		)
	)

	return (
		<RouterProvider router={router} />
	)
}

export default App;
