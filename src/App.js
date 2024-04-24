import React from "react";
import { MantineProvider, Container, Title } from "@mantine/core";
import CropAnalytics from "./pages/CropAnalytics/CropAnalytics";

const App = () => {
  return (
    <MantineProvider>
      <Container size={"lg"}>
        <Title order={1}>Indian Agriculture Analytics</Title>
        <CropAnalytics />
      </Container>
    </MantineProvider>
  );
};

export default App;
