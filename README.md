# Task manager with a pomodoro timer

#### Video Demo: https://youtu.be/Vv1od-41NLE

#### Description:

My cs50X final project was developed using react-native with expo. **React Native** is a JavaScript framework for writing real, natively rendering mobile applications for iOS and Android. **Expo** is a framework to build React Native apps. It is a set with tools and services built for React Native.

My project has two main screens, a tasks page and a timer page, with 3 components , a cancel-button component, a header component, a nav-bar component.

##### Screens.

###### The Tasks Screen.

The Tasks Screen allows user to input a list of tasks to be completed, it also allows the users to set a due date and time for when the task is to be completed, and notifies the user when the current date and time is the same as the date and time the user provides.

The Tasks Screen file **Tasks.js** contains a few imported files at the top, a default function called Tasks that renders the tasks screen and makes the Task.js file useable in other files, and a constant variable called **Style** that contains the design styles used in the file.

The imported files include,

1. import {useState, useEffect } from "react".

- useState : is used to update the value of variable in the screen, it returns a variable and a function, the function is used the change the variable. In the Tasks.js file it was used to update the date and time variable when the user picked a due date and time.

- useEffect : It re-renders the Tasks.js function component very time the application is refreshed or the value of a variable passed into the useEffect functon is changed. It was used in the Tasks.js file to check if the current date and time is the same as the date and time the user provide and then call a function that notifies the user about the task the user provided.

2. import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput, Modal, FlatList,Platform, TouchableOpacity } from "react-native".

- StyleSheet: used to create a style variable that sets the styles of the Tasks screen.

- Text: used to render and display texts in react native.

- View: This is the most fundamental component for buliding UI in a react native application. It is a container that supports the layout of the screen.

- Pressable: used to create a customizable button.

- SafeAreaView: This allows you to position your content appropriately around notches, status bars, home indicators, and other such device and operating system interface elements.

- TextInput: A foundational component for inputting text into the app via a keyboard.

- Modal: The Modal component is a basic way to present content above an enclosing view. It was used to hide and display the add tasks menu on the tasks screen.

- FlatList: This component displays a scrolling list of changing, but similarly structured, data. FlatList works well for long lists of data, where the number of items might change over time.

- Platform: This provides a module that detects the platform in which the app is running.

- TouchableOpacity: This is a wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

3. import CancelButton from "../Components/CancelButton".
    - The CancelButton contains a default function called Cancel, the renders an icon from font-awesome (font-awesome is an online website that provides different types of icons). The cancel button is used to hide and display the add task modal component in the Tasks.js file.

4. import DateTimePicker from "@react-native-community/datetimepicker".
    - DateTimePicker is used to dislay a date and time selection menu when the set due date button or the set due time button is pressed. The library was installed from ![path](https://www.npmjs.com/package/@react-native-community/datetimepicker?activeTab=readme).
    
5. import moment from "moment".
    - Moment is used to customize how the date and time gotten from DateTimePicker is displayed. The library was installed from ![path](https://momentjs.com/).

6. import \* as Notification from "expo-notifications".
    - expo-notification is used to enable notification functionality, it makes it possible for the user to be nofified when the current date and the date the user provide are the same.

7. import Header from "../Components/Header".
    - Header.js contains a header function that handles the display and navigation between the tasks screen and the timer screen.

**The Default Tasks function** 

The Dafault Tasks function in the Tasks.js file contains a few other functions.

- The handleNotify function: controls how long it takes before the notification is display and sets a title and description of what the notification is about. It is called when the current date and time is the same as the date and time the user provided.

- The onChange function: handles the date and time selection and how it is displayed. It is called when the user selects a date and time in the date and time selection menu.

- The showMode functon: opens the date and time seletion menu and update the date and time variable to the date and time the user selected using useState hooks. It is called when the set due date and set due time buttons are pressed. 

- The tasksInputHandler functon: updates the enteredTasksText variable with the user input, using useState hooks.It is called when the user inputs a task in the TextInput component, using the TextInput onChangeText attribute.

- The addTasksHandler functon: updates the taskslist variable which is a list of dictionaries every time the user inputs a task. The tasklist dictionary contexts a text, id and ttime key.

- The deleteTasks function: removes a task from the tasklist. The UI is updated with the remaining list of tasks. It is called when cancel-button is pressed.

- The pressFunc function: calls the addTasksHandler function and set the Show variable is false to hide the add task menu using the setShow useState hook.

A useEffect hook was also used in the Tasks.js file to keep track of the current date and time and call the handleNotify function when the conditon is met.

###### The Timer Screen.

The Timer screen allows user to set a focus time ( time for work) and a break time using the pomodoro technique. It is rendered by the Timer.js file. It contains a few imports a default function called Timer and a style variable that handles the styling of the timer screen. 

The imports include.

1. import { useState, useRef, useEffect } from "react".
2. import { StyleSheet,Text, View, SafeAreaView, Modal, TextInput, TouchableOpacity } from "react-native".
3. import CancelButton from "../Components/CancelButton".
    - The CancelButton.js file contains a functon that renders a cancel icon. It is used to hide the set-timer menu.

4. import * as Notification from "expo-notifications".
    - expo-notification handles the notification functionality. It helps notify the user when the focus timer or the break timer is completed.

5. import Header from "../Components/Header".
    - Header.js contains a header function that handles the display and navigation between the tasks screen and the timer screen.

**The default Timer Function**

The Timer function in the Timer.js file contains a few other functions.

- The handleNotify function: handles the notification functionality. Its determines how long it takes before the notification is displayed and set the title and the description that is displayed in the notification. It is called when the focus timer or the break timer is equal to zero, using a useEffect hook.

-  switchMode function: handles the changing of the timer from focus to break or from break to focus. It is called when the focus timer or break timer is equal to zero.

- initTimer function: sets the initial timer to the focus timer when the set timer button in the set timer menu is clicked. It called in a useEffect hook.

- tick function: initiates the countdown by subtracting one from the timer every seconds. It is called in a useEffect hook.

- startStop function: starts and stop the focus and break timer. It is called when the start/stop button is pressed.

- setUntilTimer function: closes the set timer menu and refreshes the useEffect hook. It is called when the set timer button in the set timer menu is pressed.

- resetTimer function: resets and stops the focus timer and break timer. It is called when the reset button is pressed. 

A useEffect hook was also used to keep track of the timer and switch mode when neccesary.

##### Components.

The components used in my project include.

1. CancelButton.js: it contains a few imports, a default function and a style variable that styles the cancel icon.

The imports include.

- import { View, StyleSheet } from "react-native".
- import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome".
    - FontAwesomeIcon are icons provided by font-awesome(an internt icon library and toolkit). ![path](https://fontawesome.com/)

- import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark".
    - faXmark is the icon i used to represent the cancel-button used in the Timer.js and Tasks.js files.

The default Cancel function renders the cancel icon and makes available for use in other files.

2. Header.js:  it contains a few imports, a default function and a style variable that styles the header component.

The imports include.
- import { View, Text, TouchableOpacity, StyleSheet } from "react-native".

- import NavBar from "./NavBar";
    - NavBar is a function in the NavBar.js file that handles the customization of the status-bar bar of each screen.

- import { useNavigation } from "@react-navigation/native".
    - This handles the naviagtion from one Screen to the other.

The default function renders the tasks screen and timer screen headers and handles the navigation between the two screens.

3. NavBar.js: It contains a few imports and a default function.

The imports include.

- import { StatusBar } from "react-native".
    - StatusBar handles the status-bar functionality.

- import { useIsFocused } from "@react-navigation/core".

##### App.js

This is the main file of the project. It renders the entire application and allows for navigation between the task screen and the timer screen.
