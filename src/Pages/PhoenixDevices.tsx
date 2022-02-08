import { DeviceModel } from "../Components/DeviceModel";
import { palette } from "../Constants";
import { FlexyHand2, PhoenixReborn, Robot, Talon3 } from "../Data/Devices";

export function PhoenixDevicesPage(){
    return (
        <div style={{backgroundColor: palette.light, color: palette.rich, margin: 0, padding: 0}}>
            <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <p style={{fontSize: 50, padding: 0, margin: 0}}>
                    Phoenix Devices
                </p>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: "row", flexGrow: 1, paddingLeft: "10%", paddingRight: "10%"}}>
                <div style={{flex: 1, padding: 15}}>
                    <h2>Unlimbted Phoenix</h2>
                    <p>This E-Nable hand has a thermoformed gauntlet at the wrist. The Phoenix was designed by Team UnLimbited, and is available on Thingiverse. On Thingiverse, users are able to select a design for the left or right hand. All files necessary for the Phoenix hand will be generated and included in a single .zip file at the correct scale.</p>
                </div>
                <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <DeviceModel props={FlexyHand2}/>
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: "row", flexGrow: 1, padding: "10%", paddingRight: "10%"}}>
                <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <DeviceModel props={Talon3}/>
                </div>
                <div style={{flex: 1, padding: 15}}>
                    <h2>Phonenix V2</h2>
                    <p>The Phoenix V2 is a remix of the original E-Nable Phoenix hand by Jason Bryant, with replacement components by John Diamond, Scott Darrow, and Andreas Bastian.</p>
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexDirection: "row", flexGrow: 1, paddingLeft: "10%", paddingRight: "10%"}}>
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