[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/__xb4cFP)

# MY RICE COOKER

This is the implementation of __My Rice Cooker__ using __Python__.

## Requirements :ai:

This project follows the PEP 8 coding standards. To lint the code, use flake8.
For more information, you ca refer to the [PEP8](https://peps.python.org/pep-0008/) and [Flake8](https://flake8.pycqa.org/)

## Installation :virtualreality:

Make sure you have Python installed.
Clone this repossitory in your local machine:
```shell
    https://github.com/hei-school/cc-d4-rice-cooker-ci-fanjasoa18
```

Checkout into the __feature/python__ branch:
```shell
    cd cc-d4-rice-cooker-ci-fanjasoa18/
    git checkout origin/feature/python
```

required dependency:
```shell
    pip install flake8
```
## Usage:

### Running the program:
```shell
    python main
```

### Linting the program:
execute: __flake8 file.py__

### Testing the programm: To execute the tests one by one, you can use the following command:
```shell
    python -m unittest tests.fileTest.ClassTest.feature_test_name
```
and you have to change:
	* fileTest by the file you want to test(in the directory tests)
	* ClassTest by the class name in the fileTest
	* feature_test_name by the name of the feature function
#### Example: 
```shell
    python -m unittest tests.test_ricecooker.TestRiceCooker.test_cook_rice_valid_input
```
