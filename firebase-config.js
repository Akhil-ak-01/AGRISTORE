// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK9TtN4skMO-0cjZYZY39e1cffyo2eCkQ",
  authDomain: "agristore-beb6d.firebaseapp.com",
  projectId: "agristore-beb6d",
  storageBucket: "agristore-beb6d.firebasestorage.app",
  messagingSenderId: "372473357910",
  appId: "1:372473357910:web:b867ce21889aa86c243df7",
  measurementId: "G-K46XXEHSLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure Facebook Auth Provider
const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  'display': 'popup'
});

// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = 'dgjhfiuss';
const CLOUDINARY_API_KEY = '133489957951818';
const CLOUDINARY_API_SECRET = 'YsXxX9UC9pt1z8P8FcrCZ3T2RsU';

// Cloudinary upload function
async function uploadImageToCloudinary(file) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Create signature using SHA-256
    const str_to_sign = `timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str_to_sign))
        .then(buf => Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join(''));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Cloudinary Error Details:', errorData);
            throw new Error(errorData.error?.message || 'Upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image: ' + (error.message || 'Unknown error'));
    }
}

export { auth, db, googleProvider, facebookProvider, uploadImageToCloudinary };