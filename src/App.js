import { Container } from "react-bootstrap";
import Header from "./components/page/Header";
import ListLocalBook from "./components/page/ListLocalBook";

function App() {
    return (
        <div>
            <p className="text-center">한동문고</p>
            <Header />
            <ListLocalBook />
        </div>
    );
}
export default App;
