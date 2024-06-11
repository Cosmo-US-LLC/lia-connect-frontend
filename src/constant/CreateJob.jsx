 export const SEQUENCE_DATA=[
    {
        "sequenceId": 1,
        "actionId": 1,
        "actionName": "View Profile",
        "options": [
            {
                "id": 1,
                "name": "Default",
                "delayTillNextActionValue": 14,
                "delayTillNextActionType": "h"
            }
        ],
        "parentSequenceId": 0,
        "parentOptionId": 1
    },
    {
        "sequenceId": 3,
        "actionId": 2,
        "actionName": "Send Connection",
        "options": [
            {
                "id": 1,
                "name": "Still not Accepted",
                "delayTillNextActionValue": 14,
                "delayTillNextActionType": "h"
            },
            {
                "id": 2,
                "name": "Accepted",
                "delayTillNextActionValue": 14,
                "delayTillNextActionType": "h"
            }
        ],
        "parentSequenceId": 1,
        "parentOptionId": 1
    },
    {
        "sequenceId": 5,
        "actionId": 5,
        "actionName": "End Sequence",
        "options": [
            {
                "id": 1,
                "name": "Default",
                "delayTillNextActionValue": 14,
                "delayTillNextActionType": "h"
            }
        ],
        "parentSequenceId": 3,
        "parentOptionId": 1
    },
    {
        "sequenceId": 6,
        "actionId": 5,
        "actionName": "End Sequence",
        "options": [
            {
                "id": 1,
                "name": "Default",
                "delayTillNextActionValue": 14,
                "delayTillNextActionType": "h"
            }
        ],
        "parentSequenceId": 3,
        "parentOptionId": 2
    }
]