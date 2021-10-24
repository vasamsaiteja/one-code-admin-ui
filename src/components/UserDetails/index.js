import {Component} from 'react'

import './index.css'

class UserDetails extends Component {
  state = {
    isEdit: false,
    name: '',
    email: '',
    role: '',
    isChecked: false,
    checkedUsers: [],
  }

  onUserDetails = () => {
    const {eachUser} = this.props
    const {email, name, role} = eachUser
    return (
      <>
        <p className="name-paragraph">{name}</p>
        <p className="email-paragraph">{email}</p>
        <p className="role-paragraph">{role}</p>
      </>
    )
  }

  updateName = event => {
    this.setState({name: event.target.value})
    // console.log(event.target.value)
  }

  updateEmail = event => {
    this.setState({email: event.target.value})
    // console.log(event.target.value)
  }

  updateRole = event => {
    this.setState({role: event.target.value})
    // console.log(event.target.value)
  }

  onSelectedUser = () => {
    const {selectUser} = this.props
    this.setState({
      name: selectUser.name,
      email: selectUser.email,
      role: selectUser.role,
    })
  }

  onEdit = () => {
    const {eachUser, editUser} = this.props
    const {id} = eachUser
    this.onSelectedUser()
    editUser(id)
    this.setState(prevState => ({isEdit: !prevState.isEdit}))
  }

  handleCheck = e => {
    const isChecked = e.target.checked
    this.setState({isChecked: isChecked})
  }
  onSelectUserData = () => {
    // console.log('onSelectUserData', eachUser)
    const {eachUser, checkedUser} = this.props
    const {isChecked} = this.state

    const {id} = eachUser
    console.log('in function', isChecked)
    if (!isChecked) {
      checkedUser(id)
    }
  }
  handleSubmit = e => {
    const {name, email, role} = this.state

    e.preventDefault()
    this.props.handleEdit(this.props.eachUser.id, name, email, role)
    this.setState({isEdit: false})
  }
  render() {
    const {eachUser, deleteUser} = this.props

    const {name, email, role, isChecked} = this.state
    const {isEdit} = this.state
    const {id} = eachUser

    const onDelete = () => {
      deleteUser(id)
    }
    console.log('in render', isChecked)

    return (
      <>
        <li className="list-user-details-container">
          <input
            type="checkbox"
            className="input-type-size"
            checked={isChecked}
            onClick={this.onSelectUserData}
            onChange={this.handleCheck}
          />

          {isEdit ? (
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={name} onChange={this.updateName} />
              <input type="text" value={email} onChange={this.updateEmail} />
              <input type="text" value={role} onChange={this.updateRole} />
              <input type="submit" value="submit" />
            </form>
          ) : (
            this.onUserDetails()
          )}

          <div className="icons-container">
            <button type="button" onClick={this.onEdit}>
              <i className="far fa-edit edit-icon"></i>
            </button>
            <button type="button" onClick={onDelete}>
              <i className="far fa-trash-alt trash-icon"></i>
            </button>
          </div>
        </li>
        <hr />
      </>
    )
  }
}

export default UserDetails
