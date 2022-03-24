Exploring Split IO Server Side SDK event tracking and feature toggles

# Code Cota
Add a feature to split feature toggle that enables/disables based on the age of the user
The some users can see the feature, non users can not see the feature

Objective:
If the user has age less than 18, the user can not see the feature 
If the user has age greater than 18, the user can see the feature 
If the user has age is greater than 65, the user can not see the feature

Requirements:
1. The feature toggle should be enabled/disabled based on the age of the user
2. The feature should use the same post request as the previous feature

Feature can be things like:
- button, 
- dropdown, 
- checkbox,
- radio button,
- text,

To get Started:
1. Run `npm install`
2. Run `npm run start:dev`