const myModule = (function() {
    let privateVariable = "I'm private";

    function privateMethod() {
        console.log(privateVariable);
    }

    return {
        publicMethod: function() {
            privateMethod();
        }
    };
})();

myModule.publicMethod();  // Outputs: "I'm private"