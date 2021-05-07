import Header from '../components/header'

import {Container} from '@material-ui/core'
const UserLayout = ({children}) => {
  return(
    <>
      <Header/>
      <div className="container mx-auto px-4 py-2">
        {children}
      </div>
    </>
  )
}

export default UserLayout