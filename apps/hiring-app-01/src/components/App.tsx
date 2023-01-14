import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Page/Layout';
import MainList from 'components/Todos/MainList';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainList page="main" />} />
        <Route path="/urgent" element={<MainList page="urgent" />} />
      </Routes>
    </Layout>
  );
};

export default App;
