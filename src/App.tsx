import './App.css';
import { DeviceModel } from './Components/DeviceModel';
import { IDCard } from './Components/IDCard';
import { CardProps } from './Models/CardProps';
import { DeviceModelProps } from './Models/DeviceModelProps';

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
        ImageURL: "https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg",
        Pronouns: "He/His"
    }

    var Robot: DeviceModelProps = {
        ModelURL: "./gltfmodels/robot/scene.gltf",
        ImageURL: "",
        width: 400,
        height: 400
    }

    var Hand: DeviceModelProps = {
        ModelURL: "./gltfmodels/hand.gltf",
        ImageURL: "",
        width: 400,
        height: 400
    }

    return (
        <div style={{width: "100vw", height: "300vh", backgroundColor: "#1f1f1f",
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
            {/*<IDCard props={Erin}/>
            <p>s</p>
            <IDCard props={Noah}/>*/}
            <DeviceModel props={Robot}/>
        </div>
    );
}

export default App;
