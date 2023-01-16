# recipies-angular-app

## App screenshots

### Home page

![Home page](/screenshoots/Dashboard.png) 

here we have dashboard where we can choose home page or recipies or recipies in folder. We can also open top 3 recipies.

### All recipies

![All recipies](/screenshoots/allRecipies.png)

View where we can find all recipies. to implement pagination I used ngx-pagination. By clicing red 'x' we can delete recipie.
 And when we click on recipie name opens view with recipie details. There is also search option.

### Recipies in folders

![Recipies in folders](/screenshoots/recipiesInFolders.png)  

Here we have view with recipies in folders. We can do basic CRUD(create, read, update and delete) operations on folders and recipies. 
We can also move opened folder to another folder. All options that were available in all recipies view can be done here too, but search 
looks only for elements in opened folder.

### Recipie details

![Recipie details](/screenshoots/recipieDetails.png)

In this view we can see and edit chosen recipie. there is option o go back to previous page and to mave recipie to anoter folder.

## Other informations

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
