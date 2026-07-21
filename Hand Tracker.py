import cv2
import mediapipe as mp

mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands

# Initialize VideoCapture and Mediapipe Hands
cap = cv2.VideoCapture(0)
hands = mp_hands.Hands()

while True:
    ret, image = cap.read()
    if not ret:
        print("Failed to capture image")
        break
    
    # Convert the image to RGB
    image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
    
    # Process the image and find hands
    result = hands.process(image)
    
    # Convert the image back to BGR for OpenCV
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    
    # Draw hand landmarks if detected
    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
    
    # Show the processed image
    cv2.imshow("Hand Tracker", image)
    
    # Exit the loop on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    
# Release resources
cap.release()
cv2.destroyAllWindows()