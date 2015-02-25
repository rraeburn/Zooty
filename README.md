#Zooty App
==========

To access the API, you have to use the following paths:

'/home/(phoneId)' requires the user's phoneID and sends back a token

Here's an example
```
Sample url: localhost:3000/api/v1/home/phoneId 
req.method = 'POST'

returns {token: validtoken}
```


'/upload' allows posting of new photos -- requires phoneId, photoUrl, and a valid token

```
Sample url: localhost:3000/api/v1/upload  
req.method = 'POST'
```

'/vote' gets all photos currently online

```
Sample url: localhost:3000/api/v1/vote 
req.method = 'GET'
```

'/vote/(specific _id)' allows users to post a vote on the picture

```
Sample url: localhost:3000/api/v1/vote/photoId
req.method = 'POST'
```

'/stats' gives you the statistics page

```
req.method = 'GET'
```
