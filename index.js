const express = require('express')
const app = express()
app.use(express.static('public'))
app.listen(3000, () => console.log('Server running on port 3000'))

FB.api('/me', function(response) {
    res.send('Hello ' + response.name + '! How are you?');
});
