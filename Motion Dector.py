import threading
import time

import cv2
import mediapipe as mp

try:
    import winsound
    HAS_WINSOUND = True
except ImportError:
    HAS_WINSOUND = False  # not on Windows -> fallback beep


def beep():
    if HAS_WINSOUND:
        winsound.Beep(2500, 700)
    else:
        print("\a")  # terminal bell fallback on non-Windows


def resize_width(frame, width=500):
    h, w = frame.shape[:2]
    ratio = width / float(w)
    return cv2.resize(frame, (width, int(h * ratio)))


mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
)

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

if not cap.isOpened():
    raise RuntimeError("Could not open webcam. Check the camera index / drivers.")

prev_landmarks = None
alarm_playing = False
last_beep_time = 0

MOVEMENT_THRESHOLD = 0.03    # per-landmark normalized movement to count as "moved"
MOVED_LANDMARKS_TRIGGER = 5  # how many landmarks must move to count the frame as motion
BEEP_COOLDOWN = 1.5          # seconds between beeps so it doesn't spam continuously


def play_beep_async():
    global alarm_playing
    alarm_playing = True
    beep()
    alarm_playing = False


while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame, retrying...")
        time.sleep(0.1)
        continue

    frame = resize_width(frame, 500)
    motion_detected = False

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb)

    moved_landmarks = 0

    if results.pose_landmarks:
        current_landmarks = [(lm.x, lm.y) for lm in results.pose_landmarks.landmark]

        if prev_landmarks is not None and len(prev_landmarks) == len(current_landmarks):
            for (px, py), (cx, cy) in zip(prev_landmarks, current_landmarks):
                dist = ((cx - px) ** 2 + (cy - py) ** 2) ** 0.5
                if dist > MOVEMENT_THRESHOLD:
                    moved_landmarks += 1

        prev_landmarks = current_landmarks
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
    else:
        prev_landmarks = None  # nobody in frame, reset baseline

    if moved_landmarks >= MOVED_LANDMARKS_TRIGGER:
        motion_detected = True

    label = "MOTION!" if motion_detected else "watching..."
    color = (0, 0, 255) if motion_detected else (0, 255, 0)
    cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.imshow("Cam", frame)

    if motion_detected:
        print("yes")  # prints every single frame movement is detected

    if motion_detected and not alarm_playing:
        now = time.time()
        if now - last_beep_time > BEEP_COOLDOWN:
            last_beep_time = now
            threading.Thread(target=play_beep_async, daemon=True).start()

    key_pressed = cv2.waitKey(30) & 0xFF
    if key_pressed == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()