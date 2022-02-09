import { DeviceModel } from "../Components/DeviceModel";
import { palette } from "../Constants";
import { FlexyHand2, PhoenixReborn, Talon3 } from "../Data/Devices";
import { HiPlus } from "react-icons/hi";
import { BsChevronCompactDown } from "react-icons/bs";
import { scrollIntoView } from "../Helpers";
import { useRef } from "react";

export function PhoenixDevicesPage(){
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div style={{backgroundColor: palette.offwhite, color: palette.rich, margin: 0, padding: 0}}>
            <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: 'center',
            alignItems: 'center', flexDirection: 'column', position: 'relative'}}>
                <p style={{fontSize: 50, padding: 0, margin: 0}}>
                    Phoenix Devices
                </p>
                <div style={{marginTop: 50, display: 'flex', flexDirection: "row", justifyContent: 'center',
                alignItems: 'center'}}>
                    <img style={{objectFit: "contain", height: 200, width: 200}}
                    src="./API Red leaf state outline PNG.png"/>
                    <p style={{fontSize: 50, marginLeft: 15, marginRight: 15}}><HiPlus/></p>
                    <img style={{objectFit: "contain", height: 200, width: 200}} 
                    src="https://images.squarespace-cdn.com/content/v1/5d1209b82e5cc90001b31732/1561997209958-JO57BD4PVTXFAURPCZMW/012.png?format=1500w"/>
                </div>
                <div style={{position: "absolute", bottom: 0, left: 0, right: 0, fontSize: 50, display: 'flex',
                justifyContent: 'center', alignItems: 'middle', marginBottom: '1vh'}}>
                    <BsChevronCompactDown className="hoverSpin"
                    onClick={() => {scrollIntoView(ref)}}/>
                </div>
            </div>

            <div ref={ref} style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: "row", flexGrow: 1, paddingLeft: "10%", paddingRight: "10%"}} className="circlesOnRight">
                <div style={{flex: 1, padding: 15}}>
                    <h2>Unlimbted Phoenix</h2>
                    <p>This E-Nable hand has a thermoformed gauntlet at the wrist. The Phoenix was designed by Team UnLimbited, and is available on Thingiverse. On Thingiverse, users are able to select a design for the left or right hand. All files necessary for the Phoenix hand will be generated and included in a single .zip file at the correct scale.</p>
                </div>
                <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <DeviceModel props={FlexyHand2}/>
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: "row", flexGrow: 1, padding: "10%", paddingRight: "10%"}} className="circlesOnLeft">
                <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <DeviceModel props={Talon3}/>
                </div>
                <div style={{flex: 1, padding: 15}}>
                    <h2>Phonenix V2</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum posuere lectus. Morbi ullamcorper in elit a pellentesque. Vivamus pulvinar dictum pharetra. Nulla dignissim pellentesque elit ac feugiat. Sed vitae mi porttitor, elementum felis sit amet, dapibus tellus.</p>
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: "row", flexGrow: 1, paddingLeft: "10%", paddingRight: "10%"}} className="circlesOnRight">
                <div style={{flex: 1, padding: 15}}>
                    <h2>Phoenix Reborn</h2>
                    <p>The Phoenix Reborn is a remix of the Phoenix Hand and the UnLimbited Arm, designed by Albert Fung. The new aspects of this hand allow an elastic cord to go through tunnels in the hand and in each finger tip. This design also lacks parts in previous Phoenix designs that would not survive heat found in the tropics, making it feasible for more parts of the world.</p>
                </div>
                <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <DeviceModel props={PhoenixReborn}/>
                </div>
            </div>
            <div style={{height: "25vh"}}></div>
        </div>
    );
}