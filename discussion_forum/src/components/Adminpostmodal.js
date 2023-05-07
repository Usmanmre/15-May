import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Adminpostmodal = ({ onClose, PostID }) => {
  const [userQueries, setuserQueries] = useState([]);

  const displayQueries = async () => {
    try {
      const res = await fetch("/showquery", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setuserQueries(data.data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      //   Navigate("/login");
    }
  };

  const deletePost = async () => {
    try {
      await fetch(`/deletequery/${PostID}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },      
        credentials: "include",
      });

      // Refresh the list of queries after deletion
      displayQueries();
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayQueries();
  }, []);

  const filteredData = userQueries.filter((query) => query.PostID === PostID);
  const mydata = filteredData.length > 0 ? filteredData[0] : null;

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '.9rem', fontStyle: 'bold' }}>{mydata ? mydata.UserName : ""}</Modal.Title>
          <Modal.Title style={{ paddingLeft: '2em', fontSize: '.9rem', fontStyle: 'bold' }}>{mydata ? mydata.UserID : ""}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p style={{ fontSize: '.75rem' }}>{mydata ? mydata.QueryDetails : ""}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" style={{ backgroundColor: 'red' }} onClick={deletePost}>
            Accept
          </Button>
          <Button variant="primary" style={{ backgroundColor: 'green' }}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default Adminpostmodal;
