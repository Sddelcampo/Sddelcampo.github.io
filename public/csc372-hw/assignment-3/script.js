"use strict";
    /**
   * Ensures the program code runs properly
   * @param {String} DOMContentLoaded - goes through all function within script.js
   * @param {function} () - Anonymous function to apply for ensuring all code runs
   */
document.addEventListener('DOMContentLoaded', () => {
    const mealButtons = document.querySelectorAll('.meal-button');
    const mealList = document.getElementById('meal-list');
    const totalCostDisplay = document.getElementById('total-cost');
    let totalCost = 0;

    
    const meals = [
        { 
            name: "Red Spicy Ramen", 
            price: 13.99
        },
        { 
            name: "Yaki-Gyoza",
            price: 5.00
        },
        { 
            name: "Lo Mein", 
            price: 11.99
        },
        { 
            name: "Chicken Stromboli", 
            price: 14.99
        },
        { 
            name: "Turkey and Cheese Sandwhich", 
            price: 6.99 
        },
        { 
            name: "Gyro on Pita", 
            price: 11.99 
        },
        { 
            name: "Italian Night Club", 
            price: 8.75
        },
        { 
            name: "Pesto Bowtie Pasta Salad", 
            price: 2.75
        },
        { 
            name: "Fudge Chocolate Brownie", 
            price: 2.25
        }
    ];

    /**
   * Assigns data to buttons so that when a button is clicked it displays the value of food and also
   * add for total of meal plan
   * @param {Element} button - goes through for all buttons that are used
   */
    mealButtons.forEach(function(button) 
    {
         /**
        * listens for when a button is clicked, if done then the results will be added to the right
        * side
        * @param {String} click - specific button that will get clicked
        * @param {function} function - will display and add information based on button clicked
        */
        button.addEventListener('click', function() 
        {
            const index = button.getAttribute('data-index') - 1; // Convert from 1-based to 0-based index
            const meal = meals[index];

            // Add meal to the list
            const listItem = document.createElement('li');
            listItem.textContent = meal.name + " - $" + meal.price.toFixed(2);

            // creates remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            

            /**
            * listens for when a remove button is clicked, if done then the added item will get
            * removed
            * @param {String} click - specific remove button that will be clicked
            * @param {function} function - the function will remove the item from the list and 
            * update the new cost 
            * clicked
            */
            removeButton.addEventListener('click', function() 
            {
                mealList.removeChild(listItem);
                totalCost -= meal.price;
                updateTotalCost();
            });
            listItem.appendChild(removeButton);
            mealList.appendChild(listItem);

            // Update total cost
            totalCost += meal.price;
            updateTotalCost();
        });
    });

    /** Function to update and display total cost */
    function updateTotalCost() {
        totalCostDisplay.textContent = "$" + totalCost.toFixed(2);
    }
});