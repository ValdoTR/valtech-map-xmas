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

const hiddenStonesCodes = [
    {
        zone: 'hiddenStoneOutdoor',
        code: 'P7DLX'
    },
    {
        zone: 'hiddenStoneReception',
        code: 'EG2E3'
    },
    {
        zone: 'hiddenStoneMeetings',
        code: 'W4YMJ'
    },
    {
        zone: 'hiddenStoneBar',
        code: 'A4L9Q'
    },
]

// Need Help / Follow Us
WA.room.onEnterLayer('hiddenStoneOutdoor').subscribe(() => openPopup('hiddenStoneOutdoor'));
WA.room.onLeaveLayer('hiddenStoneOutdoor').subscribe(closePopup);

WA.room.onEnterLayer('hiddenStoneReception').subscribe(() => openPopup('hiddenStoneReception'));
WA.room.onLeaveLayer('hiddenStoneReception').subscribe(closePopup);

WA.room.onEnterLayer('hiddenStoneMeetings').subscribe(() => openPopup('hiddenStoneMeetings'));
WA.room.onLeaveLayer('hiddenStoneMeetings').subscribe(closePopup);

WA.room.onEnterLayer('hiddenStoneBar').subscribe(() => openPopup('hiddenStoneBar'));
WA.room.onLeaveLayer('hiddenStoneBar').subscribe(closePopup);

// Popup management functions
function openPopup(layerName: string) {
    currentLayer = layerName
    const popupName = layerName + 'Popup'
    const popupConfig = hiddenStonesCodes.find((item) => {
        return item.zone == layerName
    });

    if (typeof popupConfig !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.ui.openPopup(popupName,
            `Congratulations!\n
            You found a Magic Stone. Send the code below to the event organizer. Find the 4 hidden Stones and you will get a unique reward!\n
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