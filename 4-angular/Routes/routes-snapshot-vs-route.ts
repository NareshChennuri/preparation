/*

ActivatedRoute - exposes properties as observables
ActivatedRouteSnapshot - exposes all the properties as plain values

Router State Snapshot - immutable data structure - state of the router at particular time
RouterState - same as RouterStateSnapshot - state of the router changing over time


*/

/** Acitvated Route && Activated Route Snapshot
 * 
 * ActivatedRouteSnapshot exposes all the same properties as ActivatedRoute as plain values, 
 * while ActivatedRoute exposes them as observables


*/

/** Route Snapshot Vs Router State Snapshot 
 * 
 * RouteStateSnapshot is an immutable data structure representing the state of the router at a particular moment in time. 
 * Any time a component is added or removed or parameter is updated, a new snapshot is created. 
 * 
 * RouterState is similar to RouteStateSnapshot, except that it represents the state of the router changing over time.
 * 
*/

