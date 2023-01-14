import { ThemeIcon } from '@mantine/core';
import { IconClipboardList, IconUser, IconLogin } from '@tabler/icons';
import { createStyles, ActionIcon, AppShell, Header, Menu, Text, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: 0,
    color: 'white'
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center'
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const Layout = ({ children }: { children: JSX.Element }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0]
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={{ base: 50, md: 60 }} p="md" className={classes.header}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <div className={classes.headerContent}>
              <div className={classes.headerTitle}>
                <ThemeIcon size="xl">
                  <IconClipboardList />
                </ThemeIcon>
                <Text fz="xl">ToDo List</Text>
              </div>
              <Menu width={200}>
                <Menu.Target>
                  <ActionIcon variant="light" color="white" radius="xl" mr={10}>
                    <IconUser size={20} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>User</Menu.Label>
                  <Menu.Item icon={<IconLogin size={14} />}>Log In</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </Header>
      }>
      {children}
    </AppShell>
  );
};

export default Layout;
