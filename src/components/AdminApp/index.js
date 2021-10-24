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

  getUserData = async () => {
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    const data = await response.json()
    this.setState({userData: data})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteUser = id => {
    const {userData} = this.state
    const filteredUserData = userData.filter(each => each.id !== id)
    this.setState({userData: filteredUserData})
  }

  deleteCheckedUser = id => {
    const {userData} = this.state
    //console.log(id)
    // console.log(object)
    const updatedData = userData.filter(each => each.id !== id)
    console.log(updatedData)
    this.setState({userData: updatedData})
  }

  checkedUser = id => {
    const {userData} = this.state
    const checkedUserData = userData.filter(each => each.id === id)

    this.setState(prevState => ({
      selectedUserData: [...prevState.selectedUserData, checkedUserData],
    }))

    // this.setState({selectedUserData: checkedUserData})
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

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser)
    console.log(selectedUserData)
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
        />
      </div>
    )
  }
}

export default AdminApp
