# Whiskord

## Database Schema Design

![Whiskord_DB_Diagram]

[Whiskord_DB_Diagram]: ./assets/Whiskord_DB_Diagram.png

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```
------------------------------------------------------------

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```
### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```
------------------------------------------------------------

## Servers

### Get all Servers the Current User is a member

Returns all the servers where the current user is a member.

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/servers
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Servers": [
        {
          "id": 1,
          "name": "Baby SWEs",
          "image_url": "image.url",
          "owner_id": 1,
          "is_private": false,
          "is_dm": false,
        }
      ]
    }
    ```

### Get details of a Server from an id

Returns the details of a server specified by its id.

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/servers/:serverId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Servers": [
        {
          "id": 1,
          "name": "Baby SWEs",
          "owner_id": 1,
          "image_url": "image.url",
          "is_private": false,
          "is_dm": false,
          "capacity": 500000,
          "Members" : [
            {
                "id": 1,
                "username": "Swagalicious"
            },
          ],
          "Channels": [
            {
                "id": 1,
                "name": "Python",
            }
          ]
        },
      ]
    }
    ```

 * Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Server

Creates and returns a new server.
```
    owner_id = current_user.id

    is_private = based on where server is selected to be made and num friends selected

    is_dm = based on selecting 1 friend to message

    capacity = based on values of is_private or is_dm
```

* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/servers
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "name": "Young SWEs",
        "image_url": "image.url"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "id": 1,
          "name": "Young SWEs",
          "owner_id": 1,
          "image_url": "image.url",
          "is_private": false,
          "is_dm": false,
          "capacity": 500000,
          "Members" : [
            {
                "id": 1,
                "username": "Swagalicious"
            },
          ],
          "Channels": [
            {
                "id": 1,
                "name": "React",
            }
          ]
        }
    ```

* Error Response: Body validation error
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:

        ```json
        {
          "message": "Validation Error",
          "statusCode": 400,
          "errors": [
              "Server Name is required",
              "Name must be between 2 and 100 in length"
            ]
        }
        ```

### Edit a Server

Updates and returns an existing server.

* Require Authentication: true
* Require proper authorization: Server must belong to the current user
* Request
  * Method: PUT
  * URL: /api/servers/:serverId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Adolescent SWEs",
      "image_url": "image.url"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "id": 1,
          "name": "Adolescent SWEs",
          "owner_id": 1,
          "image_url": "image.url",
          "is_private": false,
          "is_dm": false,
          "capacity": 500000,
          "Members" : [
            {
                "id": 1,
                "username": "Swagalicious"
            },
          ],
          "Channels": [
            {
                "id": 1,
                "name": "React",
            }
          ]
        }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "message": "Validation Error",
          "statusCode": 400,
          "errors": [
              "Server Name is required",
              "Name must be between 2 and 100 in length"
            ]
        }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Server

Deletes an existing server.

* Require Authentication: true
* Require proper authorization: Server must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/servers/:serverId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

------------------------------------------------------------
## Channels

### Get all Channels the Current Server that Current User is a member

Returns all the channels of the open server where the current user is a member.

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/servers/:serverId/channels
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Channels": [
        {
          "id": 1,
          "name": "Baby SWEs",
          "server_id": 1,
          "type": "text",
          "is_private": false
        }
      ]
    }
    ```

### Get details of a Channel from an id

Returns the details of a channel specified by its id.

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/channels/:channelId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Channels": [
        {
          "id": 1,
          "name": "Baby SWEs",
          "server_id": 1,
          "type": "text",
          "is_private": false,
          "Members" : [
            {
                "id": 1,
                "username": "Swagalicious"
            },
          ],
          "Messages": [
            {
                "id": 1,
                "user_id": 1,
                "message": "Howdy Partners",
                "is_edited": false,
                "created_at": "Yesterday at 11:28 AM"
            }
          ]
        },
      ]
    }
    ```

 * Error response: Couldn't find a Channel with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Channel

Creates and returns a new channel.

* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/channels
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "name": "Young SWEs",
        "type": "text",
        "is_private": true,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Channels": [
        {
          "id": 1,
          "name": "Baby SWEs",
          "server_id": 1,
          "type": "text",
          "is_private": false,
          "Members" : [
            {
                "id": 1,
                "username": "Swagalicious"
            },
          ],
          "Messages": [
            {
                "id": 1,
                "user_id": 1,
                "message": "Howdy Partners",
                "is_edited": false,
                "created_at": "Yesterday at 11:28 AM"
            }
          ]
        },
      ]
    }
    ```

* Error Response: Body validation error
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:

        ```json
        {
          "message": "Validation Error",
          "statusCode": 400,
          "errors": [
              "Channel Name is required",
              "Name must be between 1 and 100 in length"
            ]
        }
        ```

### Edit a Channel

Updates and returns an existing channel.

* Require Authentication: true
* Require proper authorization: Channel must belong to the current user
* Request
  * Method: PUT
  * URL: /api/channels/:channelId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "name": "Adolescent SWEs",
        "type": "text",
        "is_private": true,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Channels": [
        {
          "id": 1,
          "name": "Baby SWEs",
          "server_id": 1,
          "type": "text",
          "is_private": false,
          "Members" : [
            {
                "id": 1,
                "username": "Swagalicious"
            },
          ],
          "Messages": [
            {
                "id": 1,
                "user_id": 1,
                "message": "Howdy Partners",
                "is_edited": false,
                "created_at": "Yesterday at 11:28 AM"
            }
          ]
        },
      ]
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "message": "Validation Error",
          "statusCode": 400,
          "errors": [
              "Channel Name is required",
              "Name must be between 1 and 100 in length"
            ]
        }
    ```

* Error response: Couldn't find a Channel with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Channel

Deletes an existing channel.

* Require Authentication: true
* Require proper authorization: Channel must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/channels/:channelId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Channel with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel couldn't be found",
      "statusCode": 404
    }
    ```

------------------------------------------------------------

## Messages

### Get all Messages the Current Channel that Current User is a member

Returns all the messages of the open channel where the current user is a member.

```
Add Pagination???
```

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/channels/:channelId/messages
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Messages": [
        {
          "id": 1,
          "message": "Howdy Partners",
          "user_id": 1,
          "channel_id": 1,
          "is_edited": false,
          "created_at": "Yesterday at 11:28 AM",
          "User":{
            "id": 1,
            "username": "Swagalicious",
          }
        }
      ]
    }
    ```

### Create a Message

Creates and returns a new message.

* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/messages
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "message": "Howdy Partners",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "id": 1,
          "message": "Howdy Partners",
          "user_id": 1,
          "channel_id": 1,
          "is_edited": false,
          "created_at": "Yesterday at 11:28 AM",
          "User":{
            "id": 1,
            "username": "Swagalicious",
          }
    }
    ```

* Error Response: Body validation error
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:

        ```json
        {
          "message": "Validation Error",
          "statusCode": 400,
          "errors": [
              "Message must be less than 2000 in length"
            ]
        }
        ```

### Edit a Message

Updates and returns an existing message.

* Require Authentication: true
* Require proper authorization: Message must belong to the current user
* Request
  * Method: PUT
  * URL: /api/messages/:messageId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "message": "Howdy Pals",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "id": 1,
          "message": "Howdy Pals",
          "user_id": 1,
          "channel_id": 1,
          "is_edited": true,
          "created_at": "Yesterday at 11:28 AM",
          "User":{
            "id": 1,
            "username": "Swagalicious",
          }
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "message": "Validation Error",
          "statusCode": 400,
          "errors": [
              "Message must be less than 2000 in length"
            ]
        }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Message

Deletes an existing message.

* Require Authentication: true
* Require proper authorization: Message must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/messages/:messageId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found",
      "statusCode": 404
    }
    ```

------------------------------------------------------------
