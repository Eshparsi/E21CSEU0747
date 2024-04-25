fetch('http://20.244.56.144/test/register', {
  method: 'POST',
  body: JSON.stringify({
    "companyName": "Bennett University",
    "ownerName": "Eshparsi",
    "rollNo": "E21CSEU0747",
    "ownerEmail": "e21cseu0747@bennett.edu.in",
    "accessCode": "XImuYx",
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));