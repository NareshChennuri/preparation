/*

There are 2 phases in Event propagation process.
1) Event Capturing (the root of the DOM to target el)
2) Event Bubbling (target el to root of the DOM)

The addEventListener method allows you to specify whether you want to capture the event during the capturing phase or not, by setting the third parameter (useCapture) to true or false


Event Capturing (or Trickling or Tunneling):
==============================================
During the capturing phase, the event starts from the root of the DOM tree and trickles down to the target element.

The capturing phase allows you to intercept the event before it reaches the target element.
Event listeners attached during the capturing phase will be executed in the order of the ancestor elements down to the target element.

document.getElementById('parent').addEventListener('click', function() {
  console.log('Capturing Phase: Parent Element');
}, true); #### 3rd parameter useCapture true/false;

document.getElementById('child').addEventListener('click', function() {
  console.log('Capturing Phase: Child Element');
}, true);

Event Bubbling:
===================================
After the capturing phase, the event enters the bubbling phase.

During the bubbling phase, the event bubbles up from the target element to the root of the DOM tree.
Event listeners attached during the bubbling phase will be executed in the order from the target element up to the root.

// Example of bubbling phase
document.getElementById('parent').addEventListener('click', function() {
  console.log('Bubbling Phase: Parent Element');
}, false);

document.getElementById('child').addEventListener('click', function() {
  console.log('Bubbling Phase: Child Element');
}, false);

In this example, if you click on the child element, the output will be:

Capturing Phase: Parent Element
Capturing Phase: Child Element

Bubbling Phase: Child Element
Bubbling Phase: Parent Element

Event Flow:
================
Modern browsers follow a standard event flow that starts with the capturing phase, then reaches the target element, and finally bubbles back up.

The addEventListener method allows you to specify whether you want to capture the event during the capturing phase by setting the third parameter (useCapture) to true. If false or omitted, the event will be handled during the bubbling phase.

// Event flow with capturing and bubbling phases
document.getElementById('parent').addEventListener('click', function() {
  console.log('Capturing Phase: Parent Element');
}, true);

document.getElementById('child').addEventListener('click', function() {
  console.log('Bubbling Phase: Child Element');
});
Understanding event propagation is crucial when working with complex DOM structures and handling events at various levels of the hierarchy.

*/