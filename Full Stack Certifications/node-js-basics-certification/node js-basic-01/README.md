# Express: Find Recipe Step

The request to the route `/recipes/step/:id?elapsedTime` returns the index of the current step of the recipe based on the elapsed time in the format `{"index: currentIndex}`. 

If the ID passed in the URL is missing or is not a valid number, the server should respond with the status code 400 and the string message `NOT_FOUND` in the body of the response. If the elapsedTime query parameter is not present in the URL, it should default to 0.


_Note: Elapsed time should be interpreted as a Number, and the unit of measurement is the same as the unit of measurement for the timers (i.e., minutes)._

Each Recipe object has a list of steps, stored in the steps property, and the corresponding timers, stored in the timers property. The steps and timers are two different arrays, but they are interpreted in combination with each other. The time required to finish step 1 (index 0) of the steps array is stored in the 0th index of the timer array.

```json
{
  "id": 2,
  "name": "Roasted Asparagus",
  "steps": [
    "Preheat oven to 425°F.",
    "Cut off the woody bottom part of the asparagus spears and discard.",
    "With a vegetable peeler, peel off the skin on the bottom 2-3 inches of the spears (this keeps the asparagus from being all and if you eat asparagus you know what I mean by that).",
    "Place asparagus on foil-lined baking sheet and drizzle with olive oil.",
    "Sprinkle with salt.",
    "With your hands, roll the asparagus around until they are evenly coated with oil and salt.",
    "Roast for 10-15 minutes, depending on the thickness of your stalks and how tender you like them.",
    "They should be tender when pierced with the tip of a knife.",
    "The tips of the spears will get very brown but watch them to prevent burning.",
    "They are great plain, but sometimes I serve them with a light vinaigrette if we need something acidic to balance out our meal."
  ],
  "timers": [
    0,
    0,
    0,
    0,
    0,
    0,
    10,
    0,
    0,
    0
  ]
},
```
     
### Routes
- `/recipes/step/:id?elapsedTime` - The id parameter should be used to filter the results based on the ID of the object provided. If the ID is not valid or is not a valid number, the server should send a status code 400 with `NOT_FOUND` in the body of the response.

### Examples
- `/recipes/step/4?elapsedTime=11`
```text
Outptut - {index: 0}
```

#### Explanation
The ID of the recipe in the URL is 4. The recipe with ID 4 has the following properties:
```json
{
    "id": 4,
    "name": "Big Night Pizza",
    "steps": [
      "Add hot water to yeast in a large bowl and let sit for 15 minutes.",
      "Mix in oil, sugar, salt, and flour and let sit for 1 hour.",
      ...
    ],
    "timers": [
      15,
      60,
      ...
    ]
}
```


The elapsed time sent as query param is 11. This roughly translates to, "Which step will be active for this recipe when 11 minutes have passed after starting the recipe?"

The step at index 0 has a timer property of 15. So after 11 minutes, step 1 will be the current step, and its index is 0, which is the final output.

- `/recipes/step/wqw`
```text
Status Code - 400
Body - NOT_FOUND
```

### Project Specifications

**Read-Only Paths**
- test
- bin
- recipes.json

**Commands**
- run: `npm start`
- install: `npm install`
- test: `npm test`
