# Survey Lists

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: 12.18.3
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/mCXTOy7HP5xco-3X1m5UFA/survey-list.gif)

## Functionality Requirements

There are 2 components in the app:

- Filters component: A reusable component that is used to define the filters for the final survey list to be rendered. It accepts the filter type and the list of filter values as input, and outputs the selected filter based on the criteria mentioned below.

- SurveyList component: This component is used to render a list of surveys. 

The app should have the following functionalities:

- The app should render the list of Survey objects. - The interface for an object is defined in the file `src/types/Survey.ts` having the following structure:

```
  interface Survey {
    title: string;
    category: string; // Possible values - 'Workplace', 'Development' or 'Hardware'
    status: string; // // Possible values - 'Active', or 'Completed'
    label: string;
  }
```

- In the left pane, we have 2 Filters component instances -
  - The first filter instance filters the surveys based on the `status` property. Clicking on a filter should render the survey objects for which the `status` value matches the filter value. In case `All` is clicked, this filter should have no effect and should not filter out any surveys.
  - The second filter instance filters the surveys based on the `category` property. Clicking on a filter should render the survey objects for which the `category` value matches the filter value. - The first click selects a filter, second consecutive click unselects the filter.
  - If both the above mentioned filters have a value selected, the surveys should be filtered based on the combination of both the filters. For eg: If the first filter has Active selected and the second filter has Completed selected, show all `Active` surveys whose category is `Completed` in the right pane.

- In the right pane, we have the SurveyList component that renders the filtered survey items in a list item `<li>` inside the list `<ul data-test-id="survey-list"></ul>`.

- Initially, all surveys should be rendered in the SurveyList component.

## Testing Requirements

- The `<ul>` containing `status` filters should have the data-test-id attribute `status-list`.

- The `<ul>` containing `category` filters should have the data-test-id attribute `category-list`.

- The output `<ul>` should have the data-test-id attribute `survey-list`.

## Project Specifications

**Read-only Files**
- src/app/app.component.spec.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
