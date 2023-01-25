import { useState } from "react";
import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Grid,
} from "@mantine/core";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: JSX.Element }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Grid justify="center">
              <Grid.Col span={6}>
                <Link to="/make-todo">Create Todo</Link>
              </Grid.Col>
              <Grid.Col span={6}>
                <Link to="/todo-list">Todo List</Link>
              </Grid.Col>
            </Grid>
          </div>
        </Header>
      }
    >
      <Grid justify="center">
        {children}
      </Grid>
    </AppShell>
  );
};

export default Layout;
