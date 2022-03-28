import React, { useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Creating a storage key which will allow for data to be saved on the device
const STORAGE_KEY = "diabetes_app_storage_key";

const ItemContext = React.createContext();

//Empty variable to store data that we will be working with
var storedData = [];

/**
 * A switch statement which performs different action based on the actionType
 * @param {*} state Refers to the stored collection of items
 * @param {*} action Identifies if user wants to create new entries, update, delete, save or load old ones
 * @returns 
 */
const reducer = (state, action) => {
    switch (action.type) {
        case "create":
            return [
                ...state,
                {
                    id: Date.now(), //Using date as the id since user won't be able to make two entries at the same time
                    date: new Date(), //Can later split into date or time if needed
                    ...action.payload //Unpacking whatever has been passed in the payload
                }
            ]
        case "update":
            return state.map((e) => {
                if(e.id === action.payload.id) {
                    return action.payload;
                } else {
                    return e;
                }
            });
        case "delete":
            return state.filter((e) => e.id !== action.payload.id);
        case "save":
            try {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (err) {
                console.log(err);
            } finally {
                return state;
            }
        case "load":
            return [
                ...state,
                {
                    ...action.payload //Note: Date might not work
                }
            ];
        default:
            return state;
    }
}

export const ItemProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, storedData);

    //Does an initial load of the saved data on the device when app is initially loaded
    useEffect (() => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            if (storage !== null && state.length === 0) {
                storedData = JSON.parse(storage);
                storedData.forEach((item) => {
                    dispatch({type: "load", payload: item})
                });
            }
        }
        loadStorage();
    }, [STORAGE_KEY]);

    //Adds an item to the collection and then saves to the device
    const addItem = (item) => {
        dispatch({type: "create", payload: item})
        dispatch({type: "save"});
        if(callback) {
            callback();
        }
    };

    //Deletes an item from the collection and then saves to the device
    const deleteItem = (id, callback) => {
        dispatch({type: "delete", payload: {id:id}})
        dispatch({type: "save"});
        if (callback) {
            callback();
        }
    };

    //Updates an item in the collection and then saves to the device
    const updateItem = (item, callback) => {
        dispatch({type: "update", payload: item});
        dispatch({type: "save"});
        if (callback) {
            callback();
        }
    };

    //Used to wrap the app so will allow for easier item creation, removal, and editing from deeper routed files
    return (
        <ItemContext.Provider value={{
            state: state,
            create: addItem,
            remove: deleteItem,
            update: updateItem,
        }}>
            {children}
        </ItemContext.Provider>
    )
};

export default ItemContext;