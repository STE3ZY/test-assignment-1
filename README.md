# Description

The following design: 
![des1](https://github.com/ktsangop/test-assignment-1/assets/25545730/78ec1df4-3fd1-43ee-869b-c9dc8631f7a0)
depicts a part of an online ordering menu.

* Imagine a Pizza category that has a few items, and each item has sizes and prices for each size.
* Each item card on the design works like a bootstrap accordion (see https://getbootstrap.com/docs/5.0/components/accordion/)
* When you click on the item name the size/price section expands. At the same time the other item cards collapse.
* When you uncheck a size, the related price is set to 0.00, and the input above is disabled
* User can edit the price (only numbers are allowed)

Given the data and their models:
[https://github.com/ktsangop/test-assignment-1/data.ts](https://github.com/ktsangop/test-assignment-1/blob/main/data.ts)

1. Clone this repository on your account
2. Build a web app with 1 or more components that render the above design using the available data
3. Any changes made by the user should be saved. For example if I change a price, and refresh the page, the application should keep the updated price.
4. Create a pull request with your changes to this repository when you are ready

## Notes
1. You can use bootstrap or any other CSS framework for your implementation. Try to match the design styles as much as possible
2. You can use React but you get bonus points if you do this in Angular :)
3. You can use either Javascript or Typescript. You can import or copy the data from `data.ts` file any way you need to.
4. You can use any of the available browser APIs to save data
5. The relations between the data use a classic relational approach (id based)

