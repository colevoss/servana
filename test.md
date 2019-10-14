# Swagger Hello
Example Swagger spec.

## Version: 1.0.0

### Security
**apiKey**  

|apiKey|*API Key*|
|---|---|
|In|header|
|Name|Authorization|

### /test/{id}

#### GET
##### Summary:

Say hi

##### Description:

Helloer endpoint

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The name to say hi | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [User](#user) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| apiKey | |

### Models


#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| name | string |  | No |