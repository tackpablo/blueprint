import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Center,
  LinkBox,
  LinkOverlay,
  Container,
} from "@chakra-ui/react";
import Tasks from "./DashboardTasks";
import Projects from "./DashboardProjects";
import ModalForm from "../Layout/ModalForm";
import { usersContext } from "../../Providers/UsersProvider";

export default function Dashboard({
  modalState,
  setModalState,
  isOpen,
  onOpen,
  onClose,
}) {
  const [editTask, setEditTask] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const { currentUser } = useContext(usersContext);

  // State for current time and date
  const [date, setDate] = useState(new Date());

  // When mounted, we get the date/time that updates every 15 minutes
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 900000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  // date options to display in WEEKDAY, MONTH DAY, YEAR format
  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // save into variable the current date using options
  const currentDate = date.toLocaleDateString("en-US", DATE_OPTIONS);

  // function to determine the hour and message depending on it
  function timeMessage() {
    const hours = new Date().getHours();
    let message = "";

    if (hours < 12) {
      message = "Good Morning";
    } else if (hours >= 12 && hours <= 17) {
      message = "Good Afternoon";
    } else if (hours >= 17 && hours <= 24) {
      message = "Good Evening";
    }

    return message;
  }

  function triggerEditTask(task) {
    setEditTask(task);
    setModalState("tasks");
    onOpen();
  }

  function triggerEditProject(project) {
    setEditProject(project);
    setModalState("projects");
    onOpen();
  }

  return (
    <div>
      <Center mt="3em">
        <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
          <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
            <p>{currentDate}</p>
          </Box>
          <Heading size="md" my="2">
            <LinkOverlay>
              {timeMessage()}, {currentUser && currentUser.first_name}
            </LinkOverlay>
          </Heading>
        </LinkBox>
      </Center>

      <Container width="50%" maxWidth="100%">
        {/* Import dashboard tasks */}
        <Tasks
          setModalState={setModalState}
          onOpen={onOpen}
          onEdit={triggerEditTask}
        />
        {/* Import dashboard projects */}
        <Projects
          setModalState={setModalState}
          onOpen={onOpen}
          setEditProject={setEditProject}
          onEdit={triggerEditProject}
        />
      </Container>

      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        modalState={modalState}
        setModalState={setModalState}
        editTask={editTask}
        setEditTask={setEditTask}
        editProject={editProject}
        setEditProject={setEditProject}
      />
    </div>
  );
}