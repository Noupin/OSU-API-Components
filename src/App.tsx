import './App.css';
import { Card } from './Components/Card';
import { CardProps } from './Models/CardProps';

function App() {
    var Erin: CardProps = {
        FirstName: "Erin",
        LastName: "Egersheim",
        Position: "Secratary and Treasurer",
        Email: "egersheim.1@osu.edu"
    }

    var Noah: CardProps = {
        FirstName: "Noah",
        LastName: "Perkins",
        Position: "Web Dev",
        Email: "perkins.539@osu.edu",
        ImageURL: "https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg"
    }

    return (
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#1f1f1f", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card props={Erin}/>
            <p>s</p>
            <Card props={Noah}/>
        </div>
    );
}

export default App;
