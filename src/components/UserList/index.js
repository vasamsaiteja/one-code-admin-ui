import {Component} from 'react'

import UserDetails from '../UserDetails'
import Pagination from '../Pagination'
import './index.css'

class UserList extends Component {
  state = {
    isChecked: false,
  }
  handleCheck = e => {
    const isChecked = e.target.checked
    this.setState({isChecked: isChecked})
  }

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
      handleEdit,
    } = this.props
    const {isChecked} = this.state
    const searchResults = userData.filter(eachDetail =>
      eachDetail.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const handleSelectedAllUser = e => {
      const isAllChecked = e.target.checked
      this.setState({isChecked: isAllChecked})
    }
    return (
      <>
        <div className="user-information-container">
          <input
            type="checkbox"
            className="input-checkbox"
            checked={isChecked}
            onClick={handleSelectedAllUser}
            onChange={this.handleCheck}
          />
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
              handleEdit={handleEdit}
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
