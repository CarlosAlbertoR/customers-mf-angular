import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "shell",
  remotes: {
    customersMF: "customersMF@http://localhost:3001/mf-manifest.json",
  },
  shared: {
    react: {
      singleton: true,
      eager: true,
      requiredVersion: "^18.3.1",
    },
    "react-dom": {
      singleton: true,
      eager: true,
      requiredVersion: "^18.3.1",
    },
    "@angular/core": {
      singleton: true,
      requiredVersion: false,
    },
    "@angular/common": {
      singleton: true,
      requiredVersion: false,
    },
    "@angular/router": {
      singleton: true,
      requiredVersion: false,
    },
    "@angular/compiler": {
      singleton: true,
      requiredVersion: false,
    },
    "@angular/platform-browser": {
      singleton: true,
      requiredVersion: false,
    },
    "@angular/platform-browser-dynamic": {
      singleton: true,
      requiredVersion: false,
    },
    rxjs: {
      singleton: true,
      requiredVersion: false,
    },
  },
});
