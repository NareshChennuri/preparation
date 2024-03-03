/***** 

A closure is a function defined inside another function and it can access the variables that are defined in the outer function scope.

The closure has access to variables in three scopes; 
(1) variable in its own scope, 
(2) variables in the enclosing function’s scope, and 
(3) global variables.

Encapsulation:
---------------------
Closures allow functions to encapsulate their own scope.
Inner functions have access to variables defined in their outer function's scope, even after the outer function has finished executing.

Access to Outer Scope:
---------------------------
This enables data to be preserved and accessed within the inner function.

Private Variables:
--------------------
Variables declared within an outer function are not accessible from outside, creating a form of data privacy.

Inner functions can access and modify these "private" variables, but they are not directly accessible from outside the closure.

Function Factories:
-----------------------
Closures enable the creation of function factories, where a function returns another function with predefined behavior based on the outer function's parameters.

Memory Management:
--------------------------
Closures can lead to memory leaks if they are not managed properly.
Since inner functions retain references to variables in their outer scope, those variables cannot be garbage collected until the closures are no longer needed.

Flexible and Powerful:
------------------------------
Closures are a powerful feature of JavaScript, enabling advanced programming techniques such as currying, partial application, and maintaining state in event handlers.



also closure has access to its outer function scope even after the outer function has returned. 

so, closure can remember and access variables and arguments of its outer function even after the function has finished.

- Closures are commonly used to give objects data privacy. 
When you use closures for data privacy, 
the enclosed variables are only in scope within the containing (outer) function.

const manageBankAccount = function(initialBalance) {
    let accountBalance = initialBalance;
    
    return {
        getBalance: function() { return accountBalance; },
        deposit: function(amount) { accountBalance += amount; },
        withdraw: function(amount) {
            if (amount > accountBalance) {
                return 'You cannot draw that much!';
            }

            accountBalance -= amount;
        }
    };
}

const accountManager = manageBankAccount(0);

accountManager.deposit(1000);
accountManager.withdraw(500);
accountManager.getBalance(); // 500


*/