import firebase from "firebase/app";
import "firebase/storage";
import initFirebase from "../auth/initFirebase";

initFirebase();

const storageRef = firebase.storage().ref();

export default storageRef;
