import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";
import { SubjectObjI } from "./interface";

// Function to load subjects from the database
function loadSubjectsFromDatabase(
  db: SQLiteDatabase,
  setSubjectObjs?: (subjects: SubjectObjI[]) => void
) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM subjects", // Adjust the SQL query according to your schema
      [],
      (_, results) => {
        const len = results.rows.length;
        const loadedSubjects: SubjectObjI[] = [];

        for (let i = 0; i < len; i++) {
          const row = results.rows.item(i);
          // Convert the database row to your SubjectObjI format
          const subjectObj: SubjectObjI = {
            moduleQuantity: {
              value: row.moduleQuantity, // Example column name, adjust accordingly
              setValue: (value) => {}, // You can set a placeholder function here
            },
            moduleWeight: {
              value: JSON.parse(row.moduleWeight), // Example column name, adjust accordingly
              setValue: (value) => {}, // You can set a placeholder function here
            },
            subjectName: {
              value: row.subjectName, // Example column name, adjust accordingly
              setValue: (value) => {}, // You can set a placeholder function here
            },
            // Add more properties as needed
          };

          loadedSubjects.push(subjectObj);
        }

        if (setSubjectObjs) {
          setSubjectObjs(loadedSubjects);
        }
      },
      (error) => {
        console.error("Error loading subjects from the database: ", error);
      }
    );
  });
}

// Function to initialize the SQLite database
export function initDatabase() {
  const db = SQLite.openDatabase(
    {
      name: "cacheSubjects.db",
      location: "default",
    },
    () => {
      console.log("Database opened.");
      // Load subjects from the database when it's opened
      loadSubjectsFromDatabase(db);
    },
    (error) => {
      console.error("Error opening database: ", error);
    }
  );
}
