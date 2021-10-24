import {Component} from 'react'

import UserDetails from '../UserDetails'
import Pagination from '../Pagination'
import './index.css'

class UserList extends Component {
  render() {
    const {
      userData,
      searchInput,
      deleteUser,
      editUser,
      selectUser,
      usersPerPage,
      totalUsers,
      paginate,
      checkedUser,
      selectedUserData,
      deleteCheckedUser,
    } = this.props
    const searchResults = userData.filter(eachDetail =>
      eachDetail.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <>
        <div className="user-information-container">
          <input type="checkbox" className="input-checkbox" />
          <h1>Name</h1>
          <h1 className="email-heading">Email</h1>
          <h1 className="role-heading">Role</h1>
          <h1>Actions</h1>
        </div>
        <hr />
        <ul className="user-details-list">
          {searchResults.map(eachUser => (
            <UserDetails
              eachUser={eachUser}
              key={eachUser.id}
              deleteUser={deleteUser}
              editUser={editUser}
              selectUser={selectUser}
              checkedUser={checkedUser}
            />
          ))}
        </ul>
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={totalUsers}
          paginate={paginate}
          selectedUserData={selectedUserData}
          deleteCheckedUser={deleteCheckedUser}
        />
      </>
    )
  }
}

export default UserList
