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
        zone: 'hiddenStoneOutdoorBottom',
        code: 'SH9B1',
        number: 1
    },
    {
        zone: 'hiddenStoneOutdoorTop',
        code: 'P7DLX',
        number: 2
    },
    {
        zone: 'hiddenStoneReception',
        code: 'EG2E3',
        number: 3
    },
    {
        zone: 'hiddenStoneMeetings',
        code: 'W4YMJ',
        number: 4
    },
    {
        zone: 'hiddenStoneBar',
        code: 'A4L9Q',
        number: 5
    },
]

// Need Help / Follow Us
WA.room.onEnterLayer('hiddenStoneOutdoorTop').subscribe(() => openPopup('hiddenStoneOutdoorTop'));
WA.room.onLeaveLayer('hiddenStoneOutdoorTop').subscribe(closePopup);

WA.room.onEnterLayer('hiddenStoneOutdoorBottom').subscribe(() => openPopup('hiddenStoneOutdoorBottom'));
WA.room.onLeaveLayer('hiddenStoneOutdoorBottom').subscribe(closePopup);

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
            You found the Magic Stone ${popupConfig?.number}/5. Send the code below to the event organizer. Catch them all and you will get a special reward!\n
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