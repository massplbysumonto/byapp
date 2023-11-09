// module.exports = {
// "presets": ["module:metro-react-native-babel-preset"],
//   "plugins": [
//     "react-native-classname-to-style",
//     [
//       "react-native-platform-specific-extensions",
//       {
//         "extensions": ["css"]
//       }
//     ],
//     ['react-native-reanimated/plugin'],
//         ['module:react-native-dotenv', {
//           envName: 'APP_ENV',
//           moduleName: '@env',
//           path: '.env',
//         }
//       ]
//   ],
// };
module.exports=
{
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    "react-native-classname-to-style",
    [
      "react-native-platform-specific-extensions",
      {
        "extensions": ["css"]
      }
    ],
    ['react-native-reanimated/plugin'],
    ['module:react-native-dotenv', {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        }
    ]
  ]
}