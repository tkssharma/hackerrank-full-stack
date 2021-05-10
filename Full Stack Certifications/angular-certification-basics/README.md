# Temperature Converter

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: 12.18.3
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/-Y4byw48oCxRPaW0kiNlyA/temperature-converter.gif)

## Functionality Requirements

- It has 2 input number fields. The first is for a Celsius value, and the second is for a Fahrenheit value.

- Initially, both fields are empty.

- As a value is typed into the Celsius field, convert it to Fahrenheit and show it in the Fahrenheit field. Use the formula `F = C*9/5 + 32` for conversion. In case of decimals, show up to 1 decimal value.

- As a value is typed into the Fahrenheit field, convert it to Celsius and show it in the Celsius field. Use the formula `C = (F − 32) × 5/9` for conversion. In case of decimals, show up to 1 decimal value.

## Testing Requirements

- The Celsius input should have the data-test-id attribute 'celsius-input'.
- The Fahrenheit input should have the data-test-id attribute 'fahrenheit-input'.

## Project Specifications

**Read-only Files**
- src/app/temperatureConverter/temperatureConverter.component.spec.ts
- src/app/app.component.spec.ts
- src/app/app.component.ts
- src/app/app.module.ts

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
