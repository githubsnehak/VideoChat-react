import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomID } = useParams();
    const meetingContainerRef = useRef();

    useEffect(() => {
        const myMeeting = async () => {
            const appID = 177086430;
            const serverSecret = "ff88a0069aa7eaca31d731688b5c3117";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID.toString(), Date.now().toString(), "1");
            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: meetingContainerRef.current,
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: `http://localhost:3002/room/${roomID}`
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
            });
        };

        myMeeting();
    }, [roomID]);

    return <div ref={meetingContainerRef}></div>;
};

export default Room;
