import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, checkmark, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Home.css";
import firebase from "../components/database";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [change, setChange] = useState(0);

  useEffect(() => {
    onSnapshot(collection(firebase, "tasks"), (t) => {
      setTasks(t.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  });
  const addItem = async () => {
    let theNewTask: any = prompt("New Task");

    if (theNewTask !== "") {
      const collectionRef = collection(firebase, "tasks");
      const payload = { title: theNewTask, status: "open" };

      await addDoc(collectionRef, payload);
    }
  };
  const markAsDone = async (id: any, task: any) => {
    const docRef = doc(firebase, "tasks", id);
    const payload = { title: task.title, status: "done" };

    await setDoc(docRef, payload);

    setChange(change + 1);
  };
  const removeTask = async (id: any) => {
    const docRef = doc(firebase, "tasks", id);
    await deleteDoc(docRef);
    setChange(change + 1);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Tasks</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={addItem}>
              Add Item
              <IonIcon slot="end" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {tasks.map((task) => (
            <IonItemSliding
              key={task.id}
              class={task.status === "done" && change > 0 ? "taskDone" : ""}
            >
              <IonItemOptions side="start"></IonItemOptions>

              <IonItem>
                <IonLabel>{task.title}</IonLabel>
              </IonItem>

              <IonItemOptions
                side="end"
                onIonSwipe={() => {
                  removeTask(task);
                }}
              >
                <IonItemOption
                  onClick={() => {
                    markAsDone(task.id, task);
                  }}
                >
                  <IonIcon icon={checkmark} />
                </IonItemOption>
                <IonItemOption
                  color="danger"
                  onClick={() => {
                    removeTask(task.id);
                  }}
                  expandable
                >
                  <IonIcon icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TaskList;
