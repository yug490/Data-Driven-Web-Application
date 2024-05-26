const mongoose = require('mongoose');
const faker = require('faker');
const { User } = require('./models/User');
require('dotenv').config();

const generateData = async (numRecords) => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const users = [];
  for (let i = 0; i < numRecords; i++) {
    const email = faker.internet.email();
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const creditScore = faker.datatype.number({ min: 500, max: 850 });
    const creditLines = faker.datatype.number({ min: 1, max: 5 });
    const phoneNumber = faker.phone.phoneNumber('###-###-####');

    users.push({
      Email: email,
      Name: name,
      CreditScore: creditScore,
      CreditLines: creditLines,
      MaskedPhoneNumber: phoneNumber,
    });
  }

  await User.insertMany(users);
  console.log('Data inserted');
  mongoose.disconnect();
};

generateData(10000);  // Generate 10,000 records
