import cv2
import mediapipe as mp

# Initialize Mediapipe solutions for Hands and Face Detection
mp_hands = mp.solutions.hands
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

# Set up video capture
cap = cv2.VideoCapture(0)

# Initialize Mediapipe Hands and Face Detection
hands = mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5)
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

while True:
    ret, image = cap.read()
    if not ret:
        print("Failed to capture image")
        break

    # Flip the image for a mirrored view and convert it to RGB
    image = cv2.flip(image, 1)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Process the image for hand and face detection
    hand_results = hands.process(image_rgb)
    face_results = face_detection.process(image_rgb)

    # Convert the image back to BGR for OpenCV
    image = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)

    # Draw hand landmarks if detected
    if hand_results.multi_hand_landmarks:
        for hand_landmarks in hand_results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                image, hand_landmarks, mp_hands.HAND_CONNECTIONS
            )

    # Draw face detections if detected
    if face_results.detections:
        for detection in face_results.detections:
            # Draw the bounding box and keypoints for the face
            mp_drawing.draw_detection(image, detection)
            
            # Optionally, display the confidence score
            score = detection.score[0]
            bboxC = detection.location_data.relative_bounding_box
            h, w, _ = image.shape
            x, y = int(bboxC.xmin * w), int(bboxC.ymin * h)
            cv2.putText(image, f'Score: {int(score * 100)}%', (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    # Display the image with annotations
    cv2.imshow("Hand and Face Tracker", image)

    # Exit the loop on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()