import React, {useState} from 'react';
import './Email.css';
import {Button, Modal} from 'react-bootstrap'

export default function Email({ email, deleteEmail }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDeleteEmail() {
    deleteEmail(email.id)
  };

  return (
    <>
    <tr className='text-center text-break'>
        <td className='mw-25'>{email.topic}</td>
        <td id='truncate' dangerouslySetInnerHTML={{__html: email.body.length > 30 ? email.body.slice(0, 30)+'...' : email.body}}></td>
        <td className='mw-25'>{email.add_date}</td>
        <td>
          <button className="btn btn-info btn-sm m-1" onClick={handleShow}><i className="bi bi-info-lg"></i></button>
          <button className="btn btn-danger m-1 btn-sm" onClick={handleDeleteEmail}><i className="bi bi-x-lg"></i></button>
        </td>
    </tr>

    <Modal className='w-100' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className='text-break'><b>Subject:</b><br/>{email.topic}</div>
        </Modal.Header>
        <Modal.Body>
          <div className='text-break'><b>Message:</b><br/><span dangerouslySetInnerHTML={{__html: email.body}}></span></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}