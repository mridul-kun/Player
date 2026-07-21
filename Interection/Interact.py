import cv2
import mediapipe as mp
import numpy as np
import pyautogui

# Initialize MediaPipe Hand Tracking
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

# Get screen size
screen_w, screen_h = pyautogui.size()

# Start webcam
cap = cv2.VideoCapture(0)

prev_x, prev_y = 0, 0
smooth_factor = 5  # Smoothens cursor movement

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)  # Mirror image
    h, w, _ = frame.shape

    # Convert frame to RGB for MediaPipe
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb_frame)

    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            # Get landmarks of index and middle fingers
            index_finger_tip = hand_landmarks.landmark[8]  # Index Finger Tip
            index_finger_base = hand_landmarks.landmark[6]  # Index Finger Base
            middle_finger_tip = hand_landmarks.landmark[12]  # Middle Finger Tip
            middle_finger_base = hand_landmarks.landmark[10]  # Middle Finger Base

            # Get x, y coordinates
            x, y = int(index_finger_tip.x * w), int(index_finger_tip.y * h)

            # Convert coordinates to screen size
            screen_x = np.interp(x, (100, w - 100), (0, screen_w))
            screen_y = np.interp(y, (100, h - 100), (0, screen_h))

            # Smooth movement
            cursor_x = prev_x + (screen_x - prev_x) / smooth_factor
            cursor_y = prev_y + (screen_y - prev_y) / smooth_factor

            # Move mouse using pyautogui
            pyautogui.moveTo(cursor_x, cursor_y)
            prev_x, prev_y = cursor_x, cursor_y

            # Check if index finger is down (Tip is lower than base)
            if index_finger_tip.y > index_finger_base.y:
                pyautogui.click()  # Left click
                print("Left Click")

            # Check if middle finger is down (Tip is lower than base)
            if middle_finger_tip.y > middle_finger_base.y:
                pyautogui.rightClick()  # Right click
                print("Right Click")

            # Draw landmarks
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    # Display frame
    cv2.imshow("Hand Mouse", frame)

    # Exit on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()