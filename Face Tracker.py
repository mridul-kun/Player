import cv2
import mediapipe as mp

# Initialize Mediapipe Face Detection
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

# Set up video capture
cap = cv2.VideoCapture(0)  # Use the default webcam
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

while True:
    ret, image = cap.read()
    if not ret:
        print("Failed to capture image")
        break

    # Flip the image for a mirrored view and convert it to RGB
    image = cv2.flip(image, 1)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Process the image to detect faces
    results = face_detection.process(image_rgb)

    # Draw face detections and confidence score
    if results.detections:
        for detection in results.detections:
            # Draw the bounding box and keypoints
            mp_drawing.draw_detection(image, detection)
            
            # Optionally, display the confidence score
            score = detection.score[0]
            bboxC = detection.location_data.relative_bounding_box
            h, w, _ = image.shape
            x, y = int(bboxC.xmin * w), int(bboxC.ymin * h)
            cv2.putText(image, f'Score: {int(score * 100)}%', (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    # Display the image with face detection
    cv2.imshow("Face Tracker", image)

    # Exit the loop on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()