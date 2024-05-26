import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PricingCalculator = ({ basePrice, pricePerCreditLine, pricePerCreditScorePoint }) => {
  const [users, setUsers] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
      calculatePrices(response.data);
    };
    fetchData();
  }, []);

  const calculatePrices = (data) => {
    const calculatedPrices = data.map(user => {
      return basePrice + (pricePerCreditLine * user.CreditLines) + (pricePerCreditScorePoint * user.CreditScore);
    });
    setPrices(calculatedPrices);
  };

  return (
    <div>
      <h2>Subscription Pricing</h2>
      <ul>
        {prices.map((price, index) => (
          <li key={index}>User {index + 1}: ${price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCalculator;
