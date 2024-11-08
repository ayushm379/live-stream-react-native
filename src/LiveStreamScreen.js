import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import LiveStreamController from './LiveStreamController';

const LiveStreamScreen = () => {
  const [controller, setController] = useState(null);
  const [meetingId, setMeetingId] = useState('');
  const [userName, setUserName] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  // Initialize a new controller instance with API key
  const initializeController = () => {
    const apiKey = 'YOUR_VIDEO_SDK_API_KEY';
    setController(new LiveStreamController(apiKey));
  };

  // Handle creating a new meeting
  const handleCreateMeeting = async () => {
    initializeController();
    const newMeetingId = await controller.createMeeting();
    setMeetingId(newMeetingId);
    console.log('Meeting created:', newMeetingId);
  };

  // Handle joining the meeting as a host
  const handleJoinAsHost = async () => {
    if (controller && meetingId && userName) {
      await controller.joinMeetingAsHost(meetingId, userName);
      console.log(`${userName} joined as Host`);
    }
  };

  // Handle joining the meeting as a viewer
  const handleJoinAsViewer = async () => {
    if (controller && meetingId && userName) {
      await controller.joinMeetingAsViewer(meetingId, userName);
      console.log(`${userName} joined as Viewer`);
    }
  };

  // Handle audio toggle
  const toggleAudio = () => {
    if (controller) {
      controller.toggleAudio();
      setIsMicOn(!isMicOn);
    }
  };

  // Handle video toggle
  const toggleVideo = () => {
    if (controller) {
      controller.toggleVideo();
      setIsCamOn(!isCamOn);
    }
  };

  // Handle exiting the meeting
  const exitMeeting = () => {
    if (controller) {
      controller.exitMeeting();
      setController(null);
      console.log('Exited the meeting');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Stream Controller</Text>

      {/* Text inputs for meeting ID and user name */}
      <TextInput
        style={styles.input}
        placeholder="Enter Meeting ID"
        value={meetingId}
        onChangeText={setMeetingId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={userName}
        onChangeText={setUserName}
      />

      {/* Buttons for meeting control */}
      <Button title="Create Meeting" onPress={handleCreateMeeting} />
      <Button title="Join as Host" onPress={handleJoinAsHost} />
      <Button title="Join as Viewer" onPress={handleJoinAsViewer} />

      {/* Toggle Audio and Video buttons */}
      <Button title={isMicOn ? 'Mute Mic' : 'Unmute Mic'} onPress={toggleAudio} />
      <Button title={isCamOn ? 'Disable Camera' : 'Enable Camera'} onPress={toggleVideo} />

      {/* Exit meeting button */}
      <Button title="Exit Meeting" onPress={exitMeeting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default LiveStreamScreen;
