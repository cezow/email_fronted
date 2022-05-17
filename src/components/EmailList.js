import React from 'react';
import Email from './Email';


export default function EmailList({ emails, deleteEmail }) {

  const [sortedField, setSortedField] = React.useState(null);
  let sortedEmails = [...emails].sort();
  if (sortedField === 'topic') sortedEmails.sort((a, b) => a[sortedField].toLowerCase() > b[sortedField].toLowerCase() ? 1 : -1);
  if (sortedField === 'topic!!!') sortedEmails.sort((a, b) => a[sortedField.slice(0,-3)].toLowerCase() > b[sortedField.slice(0,-3)].toLowerCase() ? -1 : 1);
  if (sortedField === 'add_date') sortedEmails.sort((a, b) => a[sortedField] > b[sortedField]? 1 : -1);
  if (sortedField === 'add_date!!!') sortedEmails.sort((a, b) => a[sortedField.slice(0,-3)] > b[sortedField.slice(0,-3)]? -1 : 1);
  
  return (
    <table className='table table-bordered w-100'>
      <thead>
        <tr>
          <th className='d-flex justify-content-between'>Subject
            <div className='d-flex flex-row-reverse'>
              <button className='btn btn-muted btn-sm shadow-none' onClick={() => setSortedField('topic')}><i className="bi bi-arrow-up"></i></button>
              <button className='btn btn-muted btn-sm shadow-none' onClick={() => setSortedField('topic!!!')}><i className="bi bi-arrow-down"></i></button>
            </div>
          </th>
          <th className='pb-3'>Message</th>
          <th className='d-flex justify-content-between'>Date
            <div className='d-flex flex-row-reverse'>
              <button className='btn btn-muted btn-sm shadow-none' onClick={() => setSortedField('add_date')}><i className="bi bi-arrow-up"></i></button>
              <button className='btn btn-muted btn-sm shadow-none' onClick={() => setSortedField('add_date!!!')}><i className="bi bi-arrow-down"></i></button>
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedEmails.reverse().map(email => {
            return <Email key={email.id} email={email} deleteEmail={deleteEmail} />
          })}
      </tbody>
    </table>
  )
}