import { Navigate } from 'react-router-dom'
import { getToken } from '../../shared/helpers/helper';

interface Props {
  component: React.ComponentType
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({ component: Component }) => {
	const token = getToken();
	if(token) {
		return <Component />	
	}

	return <Navigate to="/sign-in" />
}