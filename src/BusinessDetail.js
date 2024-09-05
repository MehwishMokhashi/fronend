// src/components/BusinessDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found, please log in first.');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/bussiness/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBusiness(response.data);
      } catch (error) {
        console.error('Error fetching business:', error.response?.data || error.message);
      }
    };

    fetchBusiness();
  }, [id]);

  if (!business) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h3>Business Details</h3>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Business Name</th>
            <td>{business.business_name}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{business.address}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{business.city}</td>
          </tr>
          <tr>
            <th>Postal Code</th>
            <td>{business.postal_code}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{business.phone_number}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>{business.website}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{business.description}</td>
          </tr>
          <tr>
            <th>Keywords</th>
            <td>{business.keywords}</td>
          </tr>
          <tr>
            <th>Is Approved</th>
            <td>{business.is_approved ? 'Approved' : 'Not Approved'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BusinessDetail;
