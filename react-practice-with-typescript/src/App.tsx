import styled from '@emotion/styled';
import { Title } from 'components/Title';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vh;
  height: 50vh;
  background-color: #FFDF8E;
`;

const App = () => {
  return (
    <Container>
      <Title title="To Do List" />
    </Container>
  );
}

export default App;