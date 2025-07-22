/*
inject() Function (Newer from Angular 14+)

import { inject } from '@angular/core';
const http = inject(HttpClient);


Used outside of constructors, often in:

- Standalone functions
- Injection in signals
- Lazy-loaded providers
- Factory functions

. Works in any function, not just class constructors
. Allows easier setup for signals or standalone APIs
. Great for fine-grained control or advanced patterns

| Use Case                         | Recommended     |
| -------------------------------- | --------------- |
| Component/Service/Guard          | `constructor()` |
| Signal or Computed Value         | `inject()`      |
| Factory Provider / Standalone Fn | `inject()`      |
| Testing-friendly setup           | `constructor()` |



*/