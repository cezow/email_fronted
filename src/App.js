import React, { useState, useRef, useEffect } from 'react';
import EmailList from './components/EmailList';
import { Button, Modal } from 'react-bootstrap';
import uuidv4 from '../node_modules/uuid/dist/v4'


export default function App() {
  const [emails, setEmails] = useState([]);
  const emailTopicRef = useRef();
  const emailBodyRef = useRef();
  const LOCAL_STORAGE_KEY = 'some_unique_key';

  // Modal's hooks 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedEmails) setEmails(storedEmails)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(emails))
  }, [emails]);



  function deleteEmail(id) {
    const myEmail = emails.find(myEmail => myEmail.id === id);
    if (!window.confirm(`Delete the email (title: ${myEmail.topic})?`)) return;
    const copyEmails = [...emails];
    const newEmails = copyEmails.filter(newEmails => newEmails !== myEmail);
    setEmails(newEmails)
  };


  function handleAddEmail(e) {
    const topic = emailTopicRef.current.value;
    const body = emailBodyRef.current.value;
    const add_date = new Date().toLocaleString();

    if (topic.length >= 3 && topic.length <= 250) {
      setEmails(prevEmail => {
        return [...prevEmail, { id: uuidv4(), topic: topic, body: body, add_date: add_date}]
      });
      emailTopicRef.current.value = null;
      emailBodyRef.current.value = null
    }
  };


  return (
    <div className='m-5 p-5'>
      <div className="d-flex flex-row-reverse">
        <Button className='mb-1' variant="success" onClick={handleShow}> Add <i className="bi bi-plus-circle"></i> </Button>
      </div>

      <EmailList emails={emails} deleteEmail={deleteEmail}/>

      <Modal className='w-100' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>E-mail adding</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
            <input type='text' className='w-75 mb-2' ref={emailTopicRef} placeholder='Subject...' ></input>
            <textarea className='w-100' style={{height : '15rem'}} ref={emailBodyRef} placeholder='Message (text/html)...'></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAddEmail}>Add Email</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}