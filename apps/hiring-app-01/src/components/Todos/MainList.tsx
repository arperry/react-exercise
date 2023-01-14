import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { createStyles, Box, Table, Text, ScrollArea, Grid, Container } from '@mantine/core';
import ActionButton from 'components/Todos/ActionButton';
import AddModal from 'components/Todos/AddModal';
import Heading from 'components/Page/Heading';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { TodoType } from 'src/store/types';
import {
  fetchTodos,
  selectAllTodos,
  selectAllUrgentTodos,
  selectTodosStatus,
  selectTodosActionType
} from 'src/store/slices/todosSlice';

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.gray[0],
    position: 'relative'
  },
  addBtn: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '0.5rem'
  },
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colors.gray[1],
    transition: 'box-shadow 150ms ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colors.gray[2]}`
    }
  },
  cell: {
    textAlign: 'center'
  },
  nodata: {
    display: 'flex',
    justifyContent: 'center'
  },
  scrolled: {
    boxShadow: theme.shadows.sm
  },
  notice: {
    marginLeft: '1rem'
  }
}));

const columnHelper = createColumnHelper<TodoType>();
const columns = [
  columnHelper.accessor('uuid', {
    id: 'action',
    cell: (info) => {
      return (
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <ActionButton itemId={info.getValue()} urgent={info.row.original.urgent} type="urgent" />
        </span>
      );
    },
    header: () => <span style={{ display: 'block', textAlign: 'center' }}>Urgent</span>
  }),
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    header: () => <span style={{ display: 'block', textAlign: 'center' }}>Title</span>
  }),
  columnHelper.accessor('duration', {
    cell: (info) => info.getValue(),
    header: () => <span style={{ display: 'block', textAlign: 'center' }}>Duration (Minutes)</span>
  }),
  columnHelper.accessor('uuid', {
    id: 'delete',
    cell: (info) => {
      return (
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <ActionButton itemId={info?.getValue()} type="delete" />
        </span>
      );
    },
    header: () => <span style={{ display: 'block', textAlign: 'center' }}>Delete</span>
  })
];

const MainList = ({ page }: { page: string }) => {
  const data: TodoType[] = useAppSelector(page === 'main' ? selectAllTodos : selectAllUrgentTodos);
  const status: string = useAppSelector(selectTodosStatus);
  const actionType: string = useAppSelector(selectTodosActionType);
  const dispatch = useAppDispatch();

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchTodos());
    }
  }, []);

  useEffect(() => {
    if (status === 'error') {
      toast.error('Something went wrong.');
    } else if (status === 'success' && ['added', 'deleted'].includes(actionType)) {
      toast.success(`Item successfully ${actionType}.`);
    }
  }, [status]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <Heading page={page} />
      <Container my="md">
        <Grid justify="center">
          <Grid.Col xs={10} pt={0}>
            <div className={classes.addBtn}>
              <AddModal />
              <Toaster
                toastOptions={{
                  duration: 1500,
                  style: {
                    fontFamily: 'sans-serif'
                  }
                }}
              />
            </div>
            {data && (
              <ScrollArea sx={{ height: 600 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table withBorder verticalSpacing="md">
                  <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {data.length > 0 &&
                      table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className={classes.cell}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </Table>
                {data.length === 0 && (
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                      textAlign: 'center',
                      padding: theme.spacing.xl,
                      marginTop: 0,
                      border: '1px solid #dee2e6',
                      borderTop: '0px'
                    })}>
                    <Text className={classes.nodata}>There are no items.</Text>
                  </Box>
                )}
              </ScrollArea>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default MainList;
