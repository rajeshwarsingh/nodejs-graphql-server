import students from './data/students.json' assert { type: "json" };
import colleges from './data/colleges.json' assert { type: "json" };

const Query = {
  test: () => 'Test Success, GraphQL server is up & running !!',
  students: () => students,
  colleges: () => colleges,
}

export default { Query };