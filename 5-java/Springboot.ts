/*

Spring Boot 
- opensource java based framework
- it simplyfies the development process
- we can build applications quickly and easily
- it has auto configuration you can setup the environmemnt rapidly.
- built in support for many popular databases, messaging systems, caching solutions

Spring Framwork
- enterprise level applications
- time consuming to setup 
- Spring Boot has many built-in features which are not available for Spring Framework

@SpringBootApplication annotation is a combination of three annotations: 
    It provides a convenient way to configure Spring Boot applications
    @Configuration, 
    @EnableAutoConfiguration, and 
    @ComponentScan. 

@SpringBootApplication:
-----------------
Main annotation to mark the main class of a Spring Boot application.
Enables auto-configuration and component scanning.

@Controller:
-----------------
Marks a class as a Spring MVC controller.
Handles HTTP requests and returns responses.

@RestController:
-----------------
Specialization of @Controller used for RESTful web services.
Automatically serializes return objects into JSON/XML responses.

@RequestMapping:
-----------------
Maps HTTP requests to handler methods.
Used at the class level to define a base URI and at the method level to define specific endpoints.

@Autowired: (similar to Injection in Angular)
-----------------
Automatically wires dependencies (beans) into Spring components.
Can be used on fields, constructors, or setter methods.

@Service:
-----------------
Marks a class as a service component in the business layer.
Typically used to encapsulate business logic.

@Repository: data access layer - db operations
-----------------
Marks a class as a repository component in the data access layer.
Usually used for database operations and exception translation.

@Component: spring managed component - Service/repository/controller
-----------------
Generic stereotype annotation to denote a Spring-managed component.
Used when neither @Controller, @Service, nor @Repository fits the purpose.

@Configuration: used to config the @Bean manually
-----------------
Indicates that a class provides bean configurations to the Spring application context.
Often used along with @Bean to define beans manually.

@Bean:
-----------------
Used in @Configuration classes to declare Spring-managed beans explicitly.
Allows customization of bean creation and configuration.

@Value:
-----------------
Injects values from external properties files or environment variables into Spring components.
Resolves properties by key.

@Qualifier: to resolve ambiguity in autowiring 
-----------------
Used to specify which bean to autowire when multiple beans of the same type are present.
Helps resolve ambiguity in autowiring.

@PathVariable:
-----------------
Extracts values from the URI path and maps them to method parameters.
Used to handle dynamic parts of the URI.

@RequestParam:
-----------------
Binds HTTP request parameters to method parameters.
Used to extract query parameters from the URL.

@ResponseBody:
-----------------
Indicates that the return value of a method should be serialized directly to the HTTP response body.
Useful in RESTful web services for returning data directly, bypassing view resolution.



*/