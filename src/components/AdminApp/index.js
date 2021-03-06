import {Component} from 'react'

import UserList from '../UserList'

import './index.css'

class AdminApp extends Component {
  state = {
    userData: [],
    searchInput: '',
    selectUser: '',
    currentPage: 1,
    usersPerPage: 10,
    selectedUserData: [],
  }

  componentDidMount() {
    this.getUserData()
  }
  componentDidUpdate() {}

  getUserData = async () => {
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    const data = await response.json()
    const formattedData = data.map(each => ({...each, isChecked: false}))
    this.setState({userData: formattedData})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteUser = id => {
    const {userData} = this.state
    const filteredUserData = userData.filter(each => each.id !== id)
    this.setState({userData: filteredUserData})
    console.log(userData)
  }
  handleEdit = (id, name, email, role) => {
    const {userData} = this.state
    const changedData = userData.map(each => {
      if (each.id === id) {
        return {
          id,
          name,
          email,
          role,
        }
      } else {
        return each
      }
    })

    this.setState({userData: changedData})
  }
  deleteCheckedUser = id => {
    const {userData} = this.state
    //console.log(id)
    console.log('userData in all del', userData)
    const updatedData = userData.filter(each => each.isChecked === false)
    console.log(updatedData.length)
    console.log('updatedData,updatedData', updatedData)
    this.setState({userData: updatedData})
  }

  checkedUser = id => {
    // console.log('id', id)
    const {userData} = this.state
    const checkedUserData = userData.map(each => {
      if (each.id === id) {
        return {...each, isChecked: !each.isChecked}
      } else {
        return each
      }
    })

    this.setState({
      userData: checkedUserData,
    })

    // console.log('checkedUserData', this.state.userData)
  }
  selectedAllUser = userList => {
    for (let per of userList) {
      const {userData} = this.state
      const checkedUserData = userData.map(each => {
        if (each.id === per.id) {
          return {...each, isChecked: !each.isChecked}
        } else {
          return each
        }
      })

      this.setState({
        userData: checkedUserData,
      })
    }
  }

  editUser = id => {
    const {userData} = this.state
    const editUser = userData.find(item => item.id === id)
    const index = userData.indexOf(editUser)
    const selectUser = userData[index]
    this.setState({selectUser: selectUser})
    // console.log(selectUser)
  }

  paginate = pageNumber => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const {
      userData,
      searchInput,
      selectUser,
      currentPage,
      usersPerPage,
      selectedUserData,
    } = this.state

    // console.log('selectedUserData', selectedUserData)

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser)
    // console.log(selectedUserData)
    return (
      <div className="background-container">
        <input
          type="search"
          placeholder="Search by name,email or role"
          className="input-container"
          onChange={this.onChangeSearchInput}
        />
        <UserList
          userData={currentUsers}
          searchInput={searchInput}
          deleteUser={this.deleteUser}
          deleteCheckedUser={this.deleteCheckedUser}
          checkedUser={this.checkedUser}
          editUser={this.editUser}
          paginate={this.paginate}
          selectUser={selectUser}
          usersPerPage={usersPerPage}
          totalUsers={userData.length}
          selectedUserData={selectedUserData}
          selectedAllUser={this.selectedAllUser}
          handleEdit={this.handleEdit}
        />
      </div>
    )
  }
}

export default AdminApp
