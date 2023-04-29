import { DataStore } from 'notarealdb';
const store = new DataStore("./data");

export default {
  students: store.collection('student'),
  colleges: store.collection('colleges'),
};