import NavBar from './components/NavBar';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default DefaultLayout;
