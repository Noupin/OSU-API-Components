import { FC } from "react";
import { colors, palette } from "../Constants";
import { randomElement } from "../Helpers";
import { CardProps } from "../Models/CardProps";
import { Props } from "../Models/Props";

export const IDCard: FC<Props<CardProps>> = ({props}) => {
    return (
        <div className="borderRadius-2" style={{display: "flex", alignItems: 'center', margin: 10, marginTop: 25,
        width: 150, background: palette.light, justifyContent: 'center', flexDirection: 'column'}}>

            <div className="borderRadius-c" style={{background: randomElement(colors), marginTop: -25,
                height: 100, width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center',
                borderColor: "#ececec", borderWidth: 2, borderStyle: "solid", overflow: 'hidden',
                marginBottom: 25}}>
                {props.ImageURL ? 
                <img src={props.ImageURL} alt={`${props.FirstName} ${props.LastName.at(0)}.`} 
                className="borderRadius-c" style={{objectFit: "contain", height: "100%", width: "auto"}}/>
                : 
                <h2 style={{margin: 0, padding: 0, color: "#ececec"}}>
                    {`${props.FirstName.at(0)?.toUpperCase()}${props.LastName.at(0)?.toUpperCase()}`}
                </h2>}
            </div>

            <div>
                <h2 className="centerText noSpacing">{`${props.FirstName} ${props.LastName.at(0)?.toUpperCase()}.`}</h2>
                {props.Pronouns &&
                    <p className="centerText secondaryText noSpacing" style={{fontSize: 12}}>{`(${props.Pronouns})`}</p>}
                <p className="centerText">{props.Position}</p>
            </div>

            <p className="secondaryText centerText" style={{fontSize: 12}}>{props.Email}</p>

        </div>
    );
}