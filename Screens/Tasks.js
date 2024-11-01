import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  TextInput,
  Modal,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";
import CancelButton from "../Components/CancelButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as Notification from "expo-notifications";
import Header from "../Components/Header";

// Handles fore-ground Notification
Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

export default function Tasks({ navigation }) {
  // Handles notification
  const handleNotify = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "Tasks",
        body: "You have a task that is due now",
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  // Handles opening and closing of modal
  const [Show, setShow] = useState(false);

  // Handles date and time selection
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === "andriod");
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    setTime(
      moment(tempDate).format("ddd MMM DD") +
        " " +
        moment(tempDate).format("hh:mm A")
    );
  };

  const showMode = (currentMode) => {
    setOpen(true);
    setMode(currentMode);
  };

  // Handles and update user task input
  const [enteredTasksText, setEnteredTasksText] = useState("");

  // Handles list of Tasks
  const [tasksList, setTasksList] = useState([]);

  // Fetchs user-input as user-types
  const tasksInputHandler = (enteredTasks) => {
    setEnteredTasksText(enteredTasks);
  };

  // Called when the add task button is clicked
  const addTasksHandler = () => {
    if (!enteredTasksText) {
      setShow(false);
    } else {
      setTasksList((currentTasksList) => [
        ...currentTasksList,
        { text: enteredTasksText, id: Math.random(), ttime: time },
      ]);
      setEnteredTasksText(null);
      setTime(null);
    }
  };

  // Deletes tasks
  const deleteTasks = (id) => {
    setTasksList((currentTasksList) => {
      return currentTasksList.filter((tasks) => tasks.id !== id);
    });
  };

  // Calls both the addGoalHandler and setShow functions when clicked
  const pressFunc = () => {
    addTasksHandler();
    setShow(false);
  };

  //   Handles Notification (cont'd)
  useEffect(() => {
    const interval = setInterval(() => {
      let nTime =
        moment().format("ddd MMM DD") + " " + moment().format("hh:mm A");

      if (nTime === time) {
        handleNotify();
      }

    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0245" }}>
      <Header />

      {/* Displays user tasks */}
      <View style={{ height: "87%" }}>
        <FlatList
          keyExtractor={(item, index) => {
            return item.id;
          }}
          data={tasksList}
          renderItem={(itemData) => {
            return (
              <View style={Style.tasksItems}>
                <View>
                  <Text
                    style={{ marginBottom: 5, fontSize: 16, color: "white" }}
                  >
                    {itemData.item.text}
                  </Text>
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Due On: {itemData.item.ttime}
                  </Text>
                </View>
                <Pressable onPress={deleteTasks.bind(this, itemData.item.id)}>
                  <CancelButton />
                </Pressable>
              </View>
            );
          }}
        />
      </View>

      {/* Add Task Menu */}
      <Modal transparent={true} visible={Show}>
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={Style.modalView}>
            {/* modal canel btn */}
            <View
              style={{
                marginLeft: "auto",
                marginBottom: 5,
              }}
            >
              <Pressable onPress={() => setShow(false)}>
                <CancelButton />
              </Pressable>
            </View>

            {/* add Task */}
            <TextInput
              style={Style.modalTextInput}
              placeholder="Enter Tasks"
              placeholderTextColor={"white"}
              onChangeText={tasksInputHandler}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* modal set due date/time btn */}
              <Pressable
                style={Style.modalbtns}
                onPress={() => showMode("date")}
              >
                <Text style={{ color: "white" }}>Set Due Date</Text>
              </Pressable>
              <Pressable
                style={Style.modalbtns}
                onPress={() => showMode("time")}
              >
                <Text style={{ color: "white" }}>Set Due Time</Text>
              </Pressable>
              {/* modal add tasks btn */}
              <Pressable style={Style.modalbtns} onPress={pressFunc}>
                <Text style={{ color: "white" }}>Add Tasks</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Task btn (opens modal) */}
      <View style={Style.addTaskView}>
        <TouchableOpacity
          style={Style.addTaskBtn}
          onPress={() => setShow(true)}
        >
          <Text style={{ color: "white" }}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {/* Date and time picker  */}
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  settingsStyle: {
    position: "absolute",
    zIndex: 2,
    bottom: 10,
    left: 10,
    margin: 10,
  },
  addTaskView: {
    position: "absolute",
    bottom: 10,
    left: 140,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  addTaskBtn: {
    backgroundColor: "#48657B",
    height: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  tasksItems: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalbtns: {
    backgroundColor: "#48657B",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 5,
  },
  modalView: {
    backgroundColor: "#0F0245",
    marginTop: "50%",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 5,
    height: 180,
  },
  modalTextInput: {
    fontSize: 20,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    margin: 15,
    color: "white",
  },
});
