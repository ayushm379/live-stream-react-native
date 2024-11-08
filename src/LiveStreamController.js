import { VideoSDKMeeting } from 'videosdk';

class LiveStreamController {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.meetingInstance = null;
  }

  // Method to initialize and create a new meeting
  async createMeeting() {
    try {
      this.meetingInstance = VideoSDKMeeting.init(this.apiKey);
      const meetingId = await this.meetingInstance.createMeeting();
      console.log('Meeting created with ID:', meetingId);
      return meetingId;
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  }

  // Method to join the meeting as a host
  async joinMeetingAsHost(meetingId, userName) {
    try {
      if (!this.meetingInstance) throw new Error('Meeting instance not initialized');
      await this.meetingInstance.join({
        meetingId,
        userName,
        isHost: true, // Set as host
      });
      console.log(`${userName} joined the meeting as host`);
    } catch (error) {
      console.error('Error joining meeting as host:', error);
    }
  }

  // Method to join the meeting as a viewer
  async joinMeetingAsViewer(meetingId, userName) {
    try {
      if (!this.meetingInstance) throw new Error('Meeting instance not initialized');
      await this.meetingInstance.join({
        meetingId,
        userName,
        isHost: false, // Set as viewer
        audioEnabled: false,
        videoEnabled: false,
      });
      console.log(`${userName} joined the meeting as a viewer`);
    } catch (error) {
      console.error('Error joining meeting as viewer:', error);
    }
  }

  // Method to exit the meeting
  exitMeeting() {
    try {
      if (this.meetingInstance) {
        this.meetingInstance.leave();
        console.log('Exited the meeting');
      }
    } catch (error) {
      console.error('Error exiting meeting:', error);
    }
  }

  // Method to toggle audio on/off
  toggleAudio() {
    try {
      if (!this.meetingInstance) throw new Error('Meeting instance not initialized');
      if (this.meetingInstance.isAudioEnabled()) {
        this.meetingInstance.muteMic();
        console.log('Microphone muted');
      } else {
        this.meetingInstance.unmuteMic();
        console.log('Microphone unmuted');
      }
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  }

  // Method to toggle video on/off
  toggleVideo() {
    try {
      if (!this.meetingInstance) throw new Error('Meeting instance not initialized');
      if (this.meetingInstance.isVideoEnabled()) {
        this.meetingInstance.disableCam();
      } else {
        this.meetingInstance.enableCam();
      }
    } catch (error) {
      console.error('Error toggling video:', error);
    }
  }
}

export default LiveStreamController;
