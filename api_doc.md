## 1. POST/register
### A. request body
```json
{
  "email": "useremail@test.com",
  "password": "userpassword123",
  "first_name":"myfisrtname",
  "province":"wakanda"
}
```
### B. response
#### a. (201-created)
```json
{
  "message" : "your account successfully registered"
}
```
#### b. (400-bad request)
```json
{
  "message" : "email is required"
}
or
{
  "message" : "email is not available"
}
or
{
  "message" : "password is required"
}
or
{
  "message" : "format email is invalid"
}
```

## 2. POST/login
### A. request body
```json
{
  "email": "useremail@test.com",
  "password": "userpassword123"
}
```
### B. response
#### a. (200-ok)
```json
{
  "message" : "successfully login",
  "access_token" : "access token",
  "user":{
        "picture":"user picture (url)",
        "name" : "User name",
        "province" : "wakanada"
        }
}
```
#### b. (400-bad request)
```json
{
  "message" : "email is required"
}
or
{
  "message" : "password is required"
}
```
#### c. (401-Unauthorized)
```json
{
  "message" : "invalid email/password"
}
```

## 4. POST/google
### A. request
#### 1. headers
```json
{
    "google_token" : "token from google"
}
```

### B. response
#### 1. (200-ok)
```json
{
    "message" : "success login with google account"
}
```

## 5. PUT/users
### A. request
#### 1. headers
```json
{
    "access_token" : "your access token"
}
```
#### 2. body
```json
{ 
  "first_name": "john", // required
  "last_name": "doe", // not required
  "profile_picture": "some url", // not required
  "province": "Wakanda", // required
}
```
### B. response
##### 1. (201-created)
```json
{
  "message" : "successfully update profile"
}
```
#### 2. (400-bad request)
```json
{
  "message" : "first name is required"
}
or
{
  "message" : "province is required"
}
or
{
  "message" : "user not found"
}
