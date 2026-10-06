# Optional React Native client

This folder is included because the challenge asks for a mobile/emulator demo. The browser client is the primary frontend.

## Run

Install Node.js first, then:

```bash
cd mobile
npm install
npx expo start
```

For an Android emulator, the API URL in `App.js` uses `10.0.2.2`, which maps back to your development computer. Start the backend first.

For a physical phone, change `API` in `App.js` to your computer's local network IP and ensure the phone and computer are on the same network.

You can also use Expo Go if you do not want to configure a full Android emulator. If the assessment specifically requires an emulator, install Android Studio and create an Android Virtual Device.
