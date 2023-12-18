[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/__xb4cFP)

# MY RICE COOKER

This is the implementation of __My Rice Cooker__ using __Java__.

## Requirements :memoryoptimization:

This project follows the [Code Conventions](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf). To lint the code, use CheckStyle :ui.

## Installation :offlineMode:

Clone this repossitory in your local machine:
```shell
    https://github.com/hei-school/cc-d4-rice-cooker-ci-fanjasoa18
```

Checkout into the __feature/javascript__ branch:
```shell
    cd cc-d4-rice-cooker-ci-fanjasoa18/
    git checkout origin/feature/java
```

### Running the program:
compilation:
```shell
   javac Constant.java Timer.java RiceCooker.java Main.java
```
run:
```shell
   java Main
```

### Linting the program:
You have to execute checkstyle

### Testing the programm:
I didn't use JUnit for the tests, so we need to compile and run it manually:
compile test:
```shell
   javac -cp src/main/java:src/test/java src/test/java/com/example/*.java
```
run test:
```shell
   java -cp .:src/main/java:src/test/java com.example.MyClassTest com.example.AnotherTestClass
```
