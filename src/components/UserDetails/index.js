import {Component} from 'react'

import './index.css'

class UserDetails extends Component {
  state = {isEdit: false, name: '', email: '', role: ''}

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
    console.log(event.target.value)
  }

  updateEmail = event => {
    this.setState({email: event.target.value})
    console.log(event.target.value)
  }

  updateRole = event => {
    this.setState({role: event.target.value})
    console.log(event.target.value)
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

  render() {
    const {eachUser, deleteUser, checkedUser} = this.props

    const {name, email, role} = this.state
    const {isEdit} = this.state
    const {id} = eachUser

    const onDelete = () => {
      deleteUser(id)
    }

    const onSelectUserData = () => {
      checkedUser(id)
    }

    return (
      <>
        <li className="list-user-details-container">
          <input
            type="checkbox"
            className="input-type-size"
            onClick={onSelectUserData}
          />

          {isEdit ? (
            <>
              <input type="text" value={name} onChange={this.updateName} />
              <input type="text" value={email} onChange={this.updateEmail} />
              <input type="text" value={role} onChange={this.updateRole} />
            </>
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
