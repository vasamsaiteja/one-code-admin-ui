import {Component} from 'react'

import './index.css'

class Pagination extends Component {
  render() {
    const {
      usersPerPage,
      totalUsers,
      paginate,
      selectedUserData,
      deleteCheckedUser,
    } = this.props
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i)
    }

    const onDeleteSelectedUsers = () => {
      for (let i = 0; i < selectedUserData.length; i++) {
        const id = selectedUserData[i]
        console.log(id)
        deleteCheckedUser(id)
      }

      //   deleteCheckedUser(id)
    }

    return (
      <div className="bottom-pagination-container">
        <button className="delete-button" onClick={onDeleteSelectedUsers}>
          Delete Selected
        </button>
        <div className="card-pagination-container">
          <div className="panel-container">
            <i className="fas fa-fast-backward"></i>
            <i className="fas fa-step-backward"></i>
          </div>

          <ul className="pagination-container-numbers">
            {pageNumbers.map(number => (
              <li key={number} className="list-number">
                <a
                  onClick={() => paginate(number)}
                  href="!#"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
          <div className="panel-container">
            <i className="fas fa-fast-forward"></i>
            <i className="fas fa-step-forward"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default Pagination
