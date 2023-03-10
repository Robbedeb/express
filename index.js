const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.get('/', (request, response) => {
    response.send('Hello');
  });

  let accounts = [
    {
      "id": 1,
      "username": "paulhal",
      "role": "admin"
    },
    {
      "id": 2,
      "username": "johndoe",
      "role": "guest"
    },
    {
      "id": 3,
      "username": "sarahjane",
      "role": "guest"
    }
  ];
  
  app.get('/accounts', (request, response) => {
    response.json(accounts);
  });
  
  app.get('/accounts/:id', (request, response) => {
    const accountId = Number(request.params.id);
    const getAccount = accounts.find((account) => account.id === accountId);
  
    if (!getAccount) {
      response.status(500).send('Account not found.')
    } else {
      response.json(getAccount);
    }
  });

  app.post('/accounts', (request, response) => {
    const incomingAccount = request.body;
  
    accounts.push(incomingAccount);
  
    response.json(accounts);
  })

  app.delete('/accounts/:id', (request, response) => {
    const accountId = Number(request.params.id);
    const newAccounts = accounts.filter((account) => account.id != accountId);
  
    if (!newAccounts) {
      response.status(500).send('Account not found.');
    } else {
      accounts = newAccounts;
      response.send(accounts);
    }
  });