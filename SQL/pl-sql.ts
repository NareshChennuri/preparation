/*

CREATE [OR REPLACE] FUNCTION function_name
  [(parameter_name [IN | OUT | IN OUT] parameter_type [, ...])]
RETURN return_type
IS
  -- Declaration section (optional)
BEGIN
  -- Executable section
  -- Perform actions and calculations
  -- Return a value using RETURN statement
END [function_name];
/



CREATE OR REPLACE FUNCTION calculate_area(radius NUMBER)
RETURN NUMBER
IS
  pi CONSTANT NUMBER := 3.14159;
BEGIN
  RETURN pi * radius * radius;
END calculate_area;
/


SELECT calculate_area(5) AS area FROM DUAL;

*/