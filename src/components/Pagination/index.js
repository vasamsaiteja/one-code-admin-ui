import {Component} from 'react'

import './index.css'

class Pagination extends Component {
  render() {
    const {
      usersPerPage,
      totalUsers,
      paginate,

      deleteCheckedUser,
    } = this.props
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i)
    }

    const onDeleteSelectedUsers = () => {
      deleteCheckedUser()
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
