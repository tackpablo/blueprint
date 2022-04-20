import { Container, Heading, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ProjectsCarousel from "./ProjectsCarousel";

export default function Projects({ setModalState, onOpen, userProjects }) {
  return (
    <Container
      border="2px"
      borderRadius="5px"
      mt="3em"
      mb="3em"
      width="100%"
      maxWidth="100%">
      <Container
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        maxWidth="100%">
        <Heading size="md" textAlign="left">
          Projects
        </Heading>
        <IconButton
          aria-label="Search database"
          borderRadius="50%"
          icon={<AddIcon />}
          onClick={() => {
            setModalState("projects");
            onOpen();
          }}
        />
      </Container>
      <ProjectsCarousel userProjects={userProjects} />
    </Container>
  );
}