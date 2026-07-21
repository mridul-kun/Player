import cv2
import mediapipe as mp

# Initialize Mediapipe Pose solution
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Create a Pose object
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Start webcam capture
cap = cv2.VideoCapture(0)

# Video output setup (optional: uncomment to save the video)
# out = cv2.VideoWriter('output.avi', cv2.VideoWriter_fourcc(*'XVID'), 20.0, (640, 480))

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Flip the frame horizontally for a mirrored view
    frame = cv2.flip(frame, 1)

    # Convert the frame to RGB for Mediapipe processing
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process the frame with Mediapipe Pose
    results = pose.process(rgb_frame)

    # Draw landmarks and connections on the frame
    if results.pose_landmarks:
        # Draw the pose landmarks on the original frame
        mp_drawing.draw_landmarks(
            frame,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=3),
            mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2, circle_radius=2),
        )

        # Print coordinates of landmarks (optional)
        for idx, landmark in enumerate(results.pose_landmarks.landmark):
            height, width, _ = frame.shape
            x, y = int(landmark.x * width), int(landmark.y * height)
            print(f"Landmark {idx}: x={x}, y={y}, z={landmark.z:.2f}")

    # Display the frame
    cv2.imshow('Body Tracker', frame)

    # Write the frame to video output (optional: uncomment if saving video)
    # out.write(frame)

    # Break the loop when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
# out.release()  # Uncomment if saving video
cv2.destroyAllWindows()