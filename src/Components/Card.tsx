import { FC } from "react";
import { colors } from "../Constants";
import { randomElement } from "../Helpers";
import { CardProps } from "../Models/CardProps";
import { Props } from "../Models/Props";

export const Card: FC<Props<CardProps>> = ({props}) => {
    return (
        <div className="borderRadius-2" style={{display: "flex", alignItems: 'center',
        width: 150, background: "#ececec", justifyContent: 'center', flexDirection: 'column'}}>

            <div className="borderRadius-c" style={{background: randomElement(colors), marginTop: -25,
                height: 100, width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center',
                borderColor: "#ececec", borderWidth: 2, borderStyle: "solid", overflow: 'hidden'}}>
                {props.ImageURL ? 
                <img src={props.ImageURL} alt={`${props.FirstName} ${props.LastName.at(0)}.`} 
                className="borderRadius-c" style={{objectFit: "contain", height: "100%", width: "auto"}}/>
                : 
                <h2 style={{margin: 0, padding: 0, color: "#ececec"}}>
                    {`${props.FirstName.at(0)?.toUpperCase()}${props.LastName.at(0)?.toUpperCase()}`}
                </h2>}
            </div>

            <div>
                <h2 style={{textAlign: 'center'}}>{`${props.FirstName} ${props.LastName.at(0)?.toUpperCase()}.`}</h2>
                <p style={{textAlign: 'center'}}>{props.Position}</p>
            </div>

            <p style={{fontSize: 12, textAlign: 'center', color: "gray"}}>{props.Email}</p>

        </div>
    );
}