/*

FormControl:
=====================
Represents an individual form control, such as an input field or select dropdown.
it Manages the state and validation of a single form control.
it Can be used as standalone or as part of a FormGroup or FormArray.

FormGroup: (collection of formControls)
=====================
Represents a group of form controls collectively, typically used to manage a form.
Combines multiple FormControl instances into a single cohesive unit.
Manages the overall state and validation of the group of form controls.

FormArray: (Dynamic form elements)
=====================
Represents an array of form controls or form groups, useful for managing dynamic lists of form elements.
Provides methods to add or remove form controls dynamically.
Each item in the array can be either a FormControl or a FormGroup.

FormBuilder: (Create FormControl, FormGroup, FormArray with less boilerplate code)
=====================
A service provided by Angular for convenient creation of form control instances.
Provides methods for creating FormControl, FormGroup, and FormArray instances with less boilerplate code.
Encourages a more declarative approach to building forms compared to manual instantiation.

*/