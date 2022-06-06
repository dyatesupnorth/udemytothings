
# Udemy Course to Things 3

Hacky little Node project that uses the Udemy api to grab a list of projects ()or a single project, and then outputs a things3 x-callback-url.

- Grab a Udemy affiliate account
- Get an API client token and secret -> https://www.udemy.com/user/edit-api-clients/
- Use the https://www.udemy.com/developers/affiliate/ documentation to generate a Bearer token https://www.udemy.com/developers/affiliate/methods/get-publiccurriculum-list/
- It helps if you have a course id and title 
- Either grab the url from console or output it to file ala: `node getUdemyCoursetoThings.js > courses.txt`

Wrote this in a quick half hour as I needed the full course content in Things 3 to help me organise some learning, not to be used in anger!

```js
// Things Model
/**
 * Project
 * 
 * {
      "type": "project",
      "attributes": {
        "title": "Go Shopping",
        "items": [
          {
            "type": "to-do",
            "attributes": {
              "title": "Bread"
            }
          },
          {
            "type": "to-do",
            "attributes": {
              "title": "Milk"
            }
          }
        ]
      }
    }
 */
```
