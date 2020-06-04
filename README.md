# PokedexReactNative

A simple React Native App using Redux for State Management to display existing Contacts in your device and with functionality to message them on whatsapp directly.

## App Screens
<p align="center">
    <img src="/media/Screen1.jpg" width="250" height="380">
    <img src="/media/Screen2.jpg" width="250" height="380">
</p>

<p align="center">
    <img src="/media/Screen3.jpg" width="250" height="380">
    <img src="/media/Screen4.jpg" width="250" height="380">
</p>

## Directions to use:-
* git clone https://github.com/txtasad/viewcontacts.git
*  in your folder root npm i or npm install
* cd ios then pod install
* **installing podfiles is necessary for ios app to work, not required if you want just android 


## App features
* App shows existing contacts.
* Sort Pokemons by their english names in ascending or descending order
* Navigation pannel in the bottom has 2 option to contacts dashboard and settings (a dummy 2nd screen).
* Each card has option to whatsapp the contact directly after opening the app.
* App uses Redux for state management.
 

## App structure
App follows below structure:
* <b>navigation</b>
    * <b> Navigation.js </b> Contains all app navigation routes to all app screens.
* <b>reducers</b>
    * <b>catReducer: </b> Redux reducer for add, delete, modilfy contacts/items actions.
* <b>actions</b>
    * <b>type: </b> Defines all action types ex- add pokemon, delete..
    * <b>act: </b> Specifies Redux actions for all action types defined.
* <b>api</b>
    * <b>ApiClient: </b> Here you can specifiy your repository and api call to fetch existing api data.
* <b>screens</b>
    * Has all ui screens of the app.


