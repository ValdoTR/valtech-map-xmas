/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import {bootstrapExtra} from '@workadventure/scripting-api-extra'

console.log('Script started successfully');

async function extendedFeatures() {
    try {
        await bootstrapExtra()
        console.log('Scripting API Extra loaded successfully');
    } catch (error) {
        console.error('Scripting API Extra ERROR',error);
    }
}
extendedFeatures();

// Manage popups
let currentLayer: string;
let currentPopup: any;

const hiddenBallsCodes = [
    {
        zone: 'hiddenBallOutdoor',
        code: 'E2TV9H'
    },
    {
        zone: 'hiddenBallReception',
        code: 'CUNB97'
    },
    {
        zone: 'hiddenBallMeetings',
        code: '8J9VYC'
    },
    {
        zone: 'hiddenBallBar',
        code: 'VDDFD3'
    },
]

// Need Help / Follow Us
WA.room.onEnterLayer('hiddenBallOutdoor').subscribe(() => openPopup('hiddenBallOutdoor'));
WA.room.onLeaveLayer('hiddenBallOutdoor').subscribe(closePopup);

WA.room.onEnterLayer('hiddenBallReception').subscribe(() => openPopup('hiddenBallReception'));
WA.room.onLeaveLayer('hiddenBallReception').subscribe(closePopup);

WA.room.onEnterLayer('hiddenBallMeetings').subscribe(() => openPopup('hiddenBallMeetings'));
WA.room.onLeaveLayer('hiddenBallMeetings').subscribe(closePopup);

WA.room.onEnterLayer('hiddenBallBar').subscribe(() => openPopup('hiddenBallBar'));
WA.room.onLeaveLayer('hiddenBallBar').subscribe(closePopup);

// Popup management functions
function openPopup(layerName: string) {
    currentLayer = layerName
    const popupName = layerName + 'Popup'
    const popupConfig = hiddenBallsCodes.find((item) => {
        return item.zone == layerName
    });

    if (typeof popupConfig !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.ui.openPopup(popupName,
            `Congratulations!\n
            You found a ball of the EURO 2020. Send the code below to the event organizer. Find the 4 hidden balls and you will get a unique reward!\n
            CODE: ${popupConfig?.code}`, [
            {
                label: "Got it!",
                className: "normal",
                callback: (popup => {
                    popup.close()
                })
            }]
        )
    }
}
function closePopup(){
    if (typeof currentPopup !== 'undefined') {
        currentPopup.close();
        currentPopup = undefined;
    }
}