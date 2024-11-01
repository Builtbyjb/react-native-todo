import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Cancel from "../Components/CancelButton";
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

export default function Timer({ navigation }) {
  // Handles modal
  const [Show, setShow] = useState(false);

  // Handles Notification
  const handleNotify = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "Timer",
        body: "Time is up",
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  // Handles count-down
  const [run, setRun] = useState(true);
  const [start, setStart] = useState("Start");
  const [time, setTime] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [mode, setMode] = useState("Focus");

  const modeRef = useRef(mode);
  const timeRef = useRef(time);
  const runRef = useRef(run);

  // Handles mode changes
  const switchMode = () => {
    const nextMode = modeRef.current === "Focus" ? "Break" : "Focus";
    const nextTime = nextMode === "Focus" ? workMinutes : breakMinutes;

    setMode(nextMode);
    modeRef.current = nextMode;

    setTime(nextTime);
    timeRef.current = nextTime;
  };

  // set initial value of the focus Timer
  const initTimer = () => {
    if (workMinutes === null) {
      return;
    } else {
      setMode("Focus");
      setTime(workMinutes);
      timeRef.current = workMinutes;
    }
  };

  // Handles seconds CountDown
  const tick = () => {
    timeRef.current--;
    setTime(timeRef.current);
  };

  // Handles useEffect refresh
  const [toggle, setToggle] = useState(true);

  // Handles countdown
  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (runRef.current) {
        return;
      }

      if (timeRef.current === 0) {
        // handleNotify();
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [toggle]);

  // Starts and Stops the timer
  const startStop = () => {
    if (start === "Start") {
      setStart("Stop");
      setRun(false);
      runRef.current = false;
    } else {
      setRun(true);
      runRef.current = true;
      setStart("Start");
    }
  };

  // Handles setting of the timer
  const setUntilTimer = () => {
    setShow(false);
    setToggle(!toggle);
  };

  // Handles Reset
  const resetTimer = () => {
    if (mode === "Focus") {
      setTime(workMinutes);
      timeRef.current = workMinutes;
    } else if (mode === "Break") {
      setTime(breakMinutes);
      timeRef.current = breakMinutes;
    }
    setRun(true);
    runRef.current = true;
    setStart("Start");
  };

  // Set hours, minutes and seconds display type
  let hours = Math.floor(time / 60 / 60);
  if (hours < 10) hours = "0" + hours;

  let minutes = Math.floor((time / 60) % 60);
  if (minutes < 10) minutes = "0" + minutes;

  let seconds = time % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0245" }}>
      <Header />
      <View style={{ marginLeft: "auto" }}>
        <TouchableOpacity
          style={Style.setTimerBtn}
          onPress={() => setShow(true)}
        >
          <Text style={{ color: "white" }}>Set Timer</Text>
        </TouchableOpacity>
      </View>

      {/* Set Timer Menu */}
      <Modal transparent={true} visible={Show}>
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={Style.modalView}>
            <View style={{ marginBottom: 15, marginLeft: "auto" }}>
              <TouchableOpacity onPress={() => setShow(false)}>
                <Cancel />
              </TouchableOpacity>
            </View>
            <View style={Style.modalInputView}>
              <View>
                <Text style={Style.modalSetBtn}> Focus</Text>
                <TextInput
                  value={workMinutes}
                  placeholder="Minutes"
                  placeholderTextColor={"white"}
                  onChangeText={(newValue) => setWorkMinutes(newValue * 60)}
                  style={Style.modalTextInput}
                />
              </View>
              <View>
                <Text style={Style.modalSetBtn}>Break</Text>
                <TextInput
                  placeholder="Minutes"
                  placeholderTextColor={"white"}
                  value={breakMinutes}
                  onChangeText={(newValue) => setBreakMinutes(newValue * 60)}
                  style={Style.modalTextInput}
                />
              </View>
            </View>

            {/* Modal Set Timer Btn  */}
            <View style={{ marginTop: 10, marginHorizontal: 50 }}>
              <TouchableOpacity
                style={Style.modalSetTimerBtn}
                onPress={setUntilTimer}
              >
                <Text style={{ color: "white" }}>Set Timer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal Ending */}

      {/* set timer button */}

      {/* Focus btn */}
      <View style={Style.focusView}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          {mode}
        </Text>
      </View>

      {/* CountDown Timer component */}
      <View style={Style.countDownDisplay}>
        <Text style={{ fontSize: 45, fontWeight: "bold", color: "white" }}>
          {hours} : {minutes} : {seconds}
        </Text>
      </View>

      {/* Start / Stop timer btn || Reset btn */}
      <View style={Style.startStopBtn}>
        <TouchableOpacity style={Style.startBtn} onPress={startStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>{start}</Text>
        </TouchableOpacity>
        {/* Reset btn */}
        <TouchableOpacity style={Style.startBtn} onPress={resetTimer}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Reset</Text>
        </TouchableOpacity>
      </View>
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
  setTimerBtn: {
    backgroundColor: "#48657B",
    borderRadius: 5,
    width: 100,
    height: 30,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  startBtn: {
    backgroundColor: "#48657B",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    borderRadius: 5,
  },
  focusView: {
    backgroundColor: "#48657B",
    width: 150,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginTop: 50,
  },
  modalSetTimerBtn: {
    backgroundColor: "#48657B",
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 20,
  },
  modalSetBtn: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  modalTextInput: {
    borderBottomWidth: 1,
    height: 35,
    borderBottomColor: "white",
    color: "white",
    marginHorizontal: 5,
  },
  modalView: {
    backgroundColor: "#0F0245",
    margin: 50,
    marginTop: 100,
    padding: 35,
    borderRadius: 5,
  },
  modalInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  countDownDisplay: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 250,
    marginHorizontal: 80,
  },
  startStopBtn: {
    marginHorizontal: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
