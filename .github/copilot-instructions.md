# TypeScript Guidelines

## General Rules

- Always respond in Korean
- Always specify types for variables, function parameters, and return values.
- Avoid using the any type.
- Define and use necessary custom types.
- Do not leave blank lines within a function.
- Each file must have only one export.

## Naming Conventions

- Use PascalCase for classes.
- Use camelCase for variables, functions, and methods.
- Use kebab-case for file and directory names.
- Use UPPERCASE for environment variables.
- Avoid magic numbers and define constants.
- Function names must start with a verb.
- Use verbs for boolean variables, such as isLoading, hasError, canDelete.
- Use complete words instead of abbreviations and ensure correct spelling.
- Exceptions: Standard abbreviations like API, URL.
- Exceptions: Common abbreviations: i, j for loops, err for errors, ctx for contexts, req, res, next for middleware.

# Functions

## General Principles

- Functions must have a single purpose and be concise (under 20 lines).
- Function names must start with a verb, for example:
  - Boolean return: isX, hasX, canX.
  - No return value: executeX, saveX.
- Avoid nested blocks by:
  - Early returns and splitting logic into utility functions.
- Avoid nested functions and use higher-order functions like map, filter, and reduce.
- Use arrow functions for simple functions (under 3 lines).
- Use named functions for complex functions.

## Parameter Handling

- Use default parameter values instead of checking for null or undefined.
- Follow the RO-RO principle (Read Object, Return Object):
  - Pass inputs as objects.
  - Return outputs as objects.
- Always specify types for inputs and outputs.

## Abstraction

- A function must maintain a single level of abstraction.

# Data

## General Rules

- Avoid overusing primitive types and encapsulate data in composite types.
- Avoid data validation in functions. Handle validation within a class.

## Immutability

- Prefer immutability for data:
  - Use readonly for data that does not change.
  - Use as const for literals that do not change.

# Classes

## General Rules

- Follow the SOLID principles.
- Prefer composition over inheritance.
- Use interfaces to define contracts.

## Size and Scope

- A class must have a single purpose:
  - Keep it under 200 lines.
  - No more than 10 public methods and properties.

# Exception Handling

- Use exceptions only for unexpected errors.
- If catching an exception:
  - Resolve an expected issue, or
  - Add context for better debugging.
- Use a global handler for all other cases.

# NestJS-Specific Rules

## General Principles

- Follow a modular architecture:
  - Encapsulate the API within domain modules:
    - Create one module and controller per main domain/route.
    - Use separate controllers for secondary routes.
- Manage data types in a models folder:
  - Use class-validator to validate input with DTOs.
  - Define outputs using simple types.
- Manage business logic and data access in the services module:
  - Write one service per entity.

## Core Module

- Use global filters to manage exception handling.
- Use global middlewares for request management.
- Use guards for permission management.
- Use interceptors to handle request/response processing.

## Shared Module

- Manage utilities and shared business logic that can be used across modules.
