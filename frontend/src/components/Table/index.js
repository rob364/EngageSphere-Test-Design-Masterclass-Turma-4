import { useState } from 'react'

import styles from './Table.module.css'

const Table = ({
  customers,
  customerActionClickHandler,
}) => {
  const [sortCriteria, setSortCriteria] = useState('size')
  const [sortOrder, setSortOrder] = useState('desc')

  const sortCustomers = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortOrder('desc')
    }
    setSortCriteria(criteria)
  }

  const sortedCustomers = [...customers].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1
    if (sortCriteria === 'size') {
      const mapSizeToNumber = (size) => {
        switch (size.toLowerCase()) {
          case 'small': return 1
          case 'medium': return 2
          case 'enterprise': return 3
          case 'large enterprise': return 4
          case 'very large enterprise': return 5
          default: return 0
        }
      }
      return order * (mapSizeToNumber(a[sortCriteria]) - mapSizeToNumber(b[sortCriteria]))
    }
    return order * (a[sortCriteria] - b[sortCriteria])
  })

  const sortNumberOfEmployeesHandler = () => sortCustomers('employees')
  const sortSizeHandler = () => sortCustomers('size')

  return (
    <table border="1" className={styles.container}>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Company name</th>
          <th scope="col">Industry</th>
          <th scope="col" onClick={sortNumberOfEmployeesHandler}>
            <button onClick={sortNumberOfEmployeesHandler}>
              Number of employees {sortCriteria === 'employees' && (sortOrder === 'asc' ? <span aria-label="ordering by number of employees asc">&uarr;</span> : <span aria-label="ordering by number of employees desc">&darr;</span>)}
            </button>
          </th>
          <th scope="col" onClick={sortSizeHandler}>
            <button onClick={sortSizeHandler}>
              Size {sortCriteria === 'size' && (sortOrder === 'asc' ? <span aria-label="ordering by size asc">&uarr;</span> : <span aria-label="ordering by size desc">&darr;</span>)}
            </button>
          </th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedCustomers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.industry}</td>
            <td>{customer.employees}</td>
            <td>{customer.size}</td>
            <td onClick={() => customerActionClickHandler(customer)} >
              <strong>
                <button aria-label={`View company: ${customer.name}`} key={customer.id} onClick={() => customerActionClickHandler(customer)} >
                  View
                </button>
              </strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table



// import { useState } from 'react'

// import styles from './Table.module.css'

// const Table = ({
//   customers,
//   customerActionClickHandler,
// }) => {
//   const [sortCriteria, setSortCriteria] = useState('size')
//   const [sortOrder, setSortOrder] = useState('desc')

//   const sortCustomers = (criteria) => {
//     if (sortCriteria === criteria) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
//     } else {
//       setSortOrder('desc')
//     }
//     setSortCriteria(criteria)
//   }

//   const sortedCustomers = [...customers].sort((a, b) => {
//     const order = sortOrder === 'asc' ? 1 : -1
//     if (sortCriteria === 'size') {
//       const mapSizeToNumber = (size) => {
//         switch (size.toLowerCase()) {
//           case 'small': return 1
//           case 'medium': return 2
//           case 'enterprise': return 3
//           case 'large enterprise': return 4
//           case 'very large enterprise': return 5
//           default: return 0
//         }
//       }
//       return order * (mapSizeToNumber(a[sortCriteria]) - mapSizeToNumber(b[sortCriteria]))
//     }
//     return order * (a[sortCriteria] - b[sortCriteria])
//   })

//   const sortNumberOfEmployeesHandler = () => sortCustomers('employees')
//   const sortSizeHandler = () => sortCustomers('size')

//   return (
//     <table border="1" className={styles.container} data-test="customer-table">
//     <thead>
//       <tr data-test="customer-table-header">
//         <th scope="col">ID</th>
//         <th scope="col">Company name</th>
//         <th scope="col">Industry</th>
//         <th scope="col" onClick={sortNumberOfEmployeesHandler} data-test="sort-employees-header">
//           <button onClick={sortNumberOfEmployeesHandler} data-test="sort-employees-button">
//             Number of employees 
//             {sortCriteria === 'employees' && (sortOrder === 'asc' ? <span aria-label="ordering by number of employees asc">&uarr;</span> : <span aria-label="ordering by number of employees desc">&darr;</span>)}
//           </button>
//         </th>
//         <th scope="col" onClick={sortSizeHandler} data-test="sort-size-header">
//           <button onClick={sortSizeHandler} data-test="sort-size-button">
//             Size 
//             {sortCriteria === 'size' && (sortOrder === 'asc' ? <span aria-label="ordering by size asc">&uarr;</span> : <span aria-label="ordering by size desc">&darr;</span>)}
//           </button>
//         </th>
//         <th scope="col">Action</th>
//       </tr>
//     </thead>
//     <tbody>
//       {sortedCustomers.map((customer, index) => (
//         <tr key={customer.id} data-test={`customer-row-${index}`}>
//           <td data-test={`customer-id-${index}`}>{customer.id}</td>
//           <td data-test={`customer-name-${index}`}>{customer.name}</td>
//           <td data-test={`customer-industry-${index}`}>{customer.industry}</td>
//           <td data-test={`customer-employees-${index}`}>{customer.employees}</td>
//           <td data-test={`customer-size-${index}`}>{customer.size}</td>
//           <td onClick={() => customerActionClickHandler(customer)} data-test={`customer-action-${index}`}>
//             <strong>
//               <button
//                 aria-label={`View company: ${customer.name}`}
//                 key={customer.id}
//                 onClick={() => customerActionClickHandler(customer)}
//                 data-test={`view-customer-${index}`}
//               >
//                 View
//               </button>
//             </strong>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//     </table>

//   )
// }

// export default Table



