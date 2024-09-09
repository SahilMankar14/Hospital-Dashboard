// Configuration for WORK/SCHOOL MICROSOFT ACCOUNT

// import { LogLevel } from "@azure/msal-browser";

// export const msalConfig = {
//   auth: {
//     clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
//     authority: `https://login.microsoftonline.com/${
//       import.meta.env.VITE_MSAL_TENANT_ID
//     }`,
//   },
//   cache: {
//     cacheLocation: "localStorage",
//     storeAuthStateInCookie: false,
//   },
//   system: {
//     loggerOptions: {
//       loggerCallback: (level, message, containsPii) => {
//         if (containsPii) {
//           return;
//         }
//         switch (level) {
//           case LogLevel.Error:
//             console.error(message);
//             break;
//           case LogLevel.Info:
//             console.info(message);
//             break;
//           case LogLevel.Verbose:
//             console.debug(message);
//             break;
//           case LogLevel.Warning:
//             console.warn(message);
//             break;
//         }
//       },
//     },
//   },
// };

// export const loginRequest = {
//   scopes: [
//     "User.Read",
//     "Files.ReadWrite",
//     "Files.ReadWrite.AppFolder",
//     "Files.ReadWrite.All",
//   ],
// };

// Configuration for PERSONAL MICROSOFT ACCOUNT

import { LogLevel, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: "https://login.microsoftonline.com/consumers",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["Files.ReadWrite.All"],
};

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance
  .initialize()
  .then(() => {
    console.log("MSAL initialized");
  })
  .catch((error) => {
    console.error("MSAL initialization failed:", error);
  });

export { msalInstance };
