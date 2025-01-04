# Development Documentation for Testboxes

## Project Overview

The Testboxes project consists of multiple components for managing testing environments:

1. **CLI Tool**: Handles user interaction and environment management.
2. **Server**: Manages backend logic and communication with hypervisors/APIs.
3. **Frontend**: Provides a user-friendly interface for managing and monitoring environments.
4. **Common**: Contains shared utilities, models, and other reusable code.

---

## Naming Schemes

### Packages and Directories

- Follow the reverse domain name convention for package names: `hacker30083.testboxes.*`
    - Example:
        - CLI: `hacker30083.testboxes.cli`
        - Server: `hacker30083.testboxes.server`
        - Common: `hacker30083.testboxes.common`

### Classes and Files

- Use **PascalCase** for class names.
    - Example: `EnvironmentManager`, `TestboxLauncher`
- Use descriptive names that reflect the purpose of the class or file.
    - Avoid: `Utils.java` (too generic)
    - Prefer: `JsonParser.java`

### Methods

- Use **camelCase** for method names.
    - Example: `createTestEnvironment`, `connectToHypervisor`
- Prefix boolean-returning methods with `is`, `has`, or `can`.
    - Example: `isEnvironmentActive`, `hasAccess`

### Variables

- Use **camelCase** for variables and descriptive names.
    - Example: `testEnvironmentConfig`, `apiResponse`
- Constants are written in **UPPER\_SNAKE\_CASE**.
    - Example: `MAX_CONNECTIONS`, `DEFAULT_TIMEOUT`

---

## Project Organization

### Directory Structure

```
Testboxes/
├── LICENSE.md
├── README.md
├── build.gradle
├── cli
│   ├── build.gradle
│   └── src
│       └── main
│           ├── java
│           │   └── TestboxCli.java
│           └── resources
├── common
│   ├── build.gradle
│   └── src
│       └── main
│           ├── java
│           │   └── argParser.java
│           └── resources
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── server
│   ├── build.gradle
│   └── src
│       └── main
│           ├── java
│           └── recources
└── settings.gradle
```

### Shared Code

- Place shared classes (e.g., models, utilities) in the `common` module.
- Example:
    - `common/src/main/java/hacker30083/testboxes/common/EnvironmentConfig.java`

### Dependencies

- Use Gradle to manage dependencies.
- Each module should declare its specific dependencies while referencing `common` for shared code.

---

## Recommendations

### Coding Standards

- Follow the instructions given in this document
- Use meaningful comments and avoid redundant ones also avoid under commenting.
- Document public methods and classes with Javadoc.
    - Example:
      ```java
      /**
       * Creates a new testing environment.
       * @param config The configuration for the environment.
       * @return The created environment object.
       */
      public Environment createEnvironment(EnvironmentConfig config) { ... }
      ```

### Build and Testing

- Use CI/CD pipelines to automate builds and tests. Currently Github is for hosting the code and managing almost everything including bugs, in the future I([@hacker30083](https://github.com/hacker30083) ) might add some more testing things (hopefully using the very same project we're making)
- Write unit tests for all new functionality (reccomended, but not neccesary if you include some way to prove that it works, embedded video or youtube one will work).
    - Place tests in a dedicated `test` directory for each module.
    - Example:
      ```
      cli/src/test/java/hacker30083/testboxes/cli/
      ```

### Documentation

- Maintain a comprehensive `README.md` at the root. It should include a overview of the project, necessary links, and links to the other `README.md` files.
- Include module-specific `README.md` files if needed.
- Update this `DevDoc.md` regularly.

---

## Additional Notes

- **Communication**: Regularly give overviews your about changes in shared components.
- **Onboarding**: Add a `CONTRIBUTING.md` to guide new contributors.
- **Environment Setup**: Document setup instructions for developers in `SETUP.md`.

---

